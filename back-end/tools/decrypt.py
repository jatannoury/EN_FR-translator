import os

from Crypto.Cipher import AES
import base64
from dotenv import load_dotenv

load_dotenv()

def aes_decrypt_string(ciphertext):
    # Convert the key to bytes
    key = os.environ.get("SECRET_KEY").encode('utf-8')

    # Decode the ciphertext from base64
    ciphertext = base64.b64decode(ciphertext)

    # Create an AES cipher object with the key
    cipher = AES.new(key, AES.MODE_ECB)

    # Decrypt the ciphertext
    decrypted = cipher.decrypt(ciphertext).decode('utf-8').rstrip('\0')

    return decrypted





