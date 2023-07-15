import os
model_name = "draft5_model_BiD_46_epochs.h5"
english_tokenizer_name = "english_tokenizer.pickle"
french_tokenizer_name = "french_tokenizer.pickle"
MAIN_PATH = os.path.join(os.path.dirname(__file__), '../')
DATA_PATH = os.path.join(MAIN_PATH,"data")
MODEL_DATA_PATH = os.path.join(DATA_PATH,"model_data")
MODEL_PATH=os.path.join(MODEL_DATA_PATH,model_name)
ENGLISH_TOKENIZER_PATH = os.path.join(MODEL_DATA_PATH,english_tokenizer_name)
FRENCH_TOKENIZER_PATH = os.path.join(MODEL_DATA_PATH,french_tokenizer_name)