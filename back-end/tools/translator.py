import pickle

import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Embedding, GRU, TimeDistributed, Bidirectional, Dropout
from keras.preprocessing.sequence import pad_sequences

from config.paths import MODEL_PATH, ENGLISH_TOKENIZER_PATH, FRENCH_TOKENIZER_PATH


class Translator:
    def __init__(self):
        self.model_path = "back-end/data/model_data/draft5_model_BiD_46_epochs.h5"
        self.english_tokenizer_path = "back-end/data/model_data/english_tokenizer.pickle"
        self.french_tokenizer_path = "back-end/data/model_data/french_tokenizer.pickle"
        self.max_length = 25
        self.ENG_vocab_size = 201
        self.FR_vocab_size = 331
        self.load_model()
    def create_model(self,in_seq_length, out_seq_length, in_vocab_size, out_vocab_size):
        model = Sequential()

        embedding_dim = 256
        convec_dim = 256  # convec short for context vector
        # embedding layer
        model.add(Embedding(input_dim=in_vocab_size, output_dim=embedding_dim, input_length=in_seq_length))
        # bidirectional GRU
        model.add(Bidirectional(GRU(convec_dim, return_sequences=True), merge_mode='sum', weights=[1, 0]))
        # dense layer
        model.add(TimeDistributed(Dense(1024, activation='relu')))
        # dropout layer
        model.add(Dropout(0.5))
        # dense layer
        model.add(TimeDistributed(Dense(out_vocab_size, activation='softmax')))
        # compile
        model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

        return model
    def load_model(self):
        self.model = self.create_model(self.max_length,self.max_length,self.ENG_vocab_size,self.FR_vocab_size)
        self.model.load_weights(MODEL_PATH)
        with open(ENGLISH_TOKENIZER_PATH, 'rb') as handle:
            self.english_tokenizer = pickle.load(handle)
        with open(FRENCH_TOKENIZER_PATH, 'rb') as handle:
            self.french_tokenizer = pickle.load(handle)

    def encoder(self,tokenizer, length, sentences):
        # integer encode sequences
        seq = tokenizer.texts_to_sequences(sentences)
        # pad sequences with 0 values
        seq = pad_sequences(seq, maxlen=length, padding='post')
        return seq

    def logits_to_text(self,logits, tokenizer):
        """
        Turn logits from a neural network into text using the tokenizer
        :param logits: Logits from a neural network
        :param tokenizer: Keras Tokenizer fit on the labels
        :return: String that represents the text of the logits
        """
        index_to_words = {id: word for word, id in tokenizer.word_index.items()}
        index_to_words[0] = '<pad>'

        return ' '.join([index_to_words[prediction] for prediction in logits])
    def translate(self,in_sentence):
        in_sentence = np.array([in_sentence])
        X = self.encoder(self.english_tokenizer, self.max_length, in_sentence)
        Y = np.ravel(np.argmax(self.model.predict(X, verbose=0), axis=2))
        out_sentence = self.logits_to_text(Y, self.french_tokenizer)
        out_sentence = out_sentence.replace('<pad>', '')
        return out_sentence.strip()

if __name__ == "__main__":
    model = Translator()
    print( model.translate("she is driving the truck"))