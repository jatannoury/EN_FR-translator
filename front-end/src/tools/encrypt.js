const cryptoJS = require("crypto-js");
const base64 = require("crypto-js/enc-base64");
const AES = require("crypto-js/aes");

function encryptString(string, key) {
  // Convert the key to bytes
  const keyBytes = cryptoJS.enc.Utf8.parse(key);

  // Encrypt the string using AES in ECB mode
  const ciphertext = cryptoJS.AES.encrypt(string, keyBytes, {
    mode: cryptoJS.mode.ECB,
  });

  // Encode the ciphertext to base64
  const encryptedString = base64.stringify(ciphertext.ciphertext);

  return encryptedString;
}
console.log(encryptString("Hello", "abcdefghijklmnop"))
module.exports={
  encryptString
}