const rsa = require("../public/js/rsa"); 
const caesar = require("../public/js/caesar_cipher"); 

const mytext = "Hello world"; 
const key = Math.floor(Math.random() * 26) + 1;
const [public_key, private_key] = rsa.generateKeyPair(); 

const encrypted = caesar.cipher(mytext, key);
const _key = rsa.encrypt(public_key, JSON.stringify(key)); 

const key_ = rsa.decrypt(private_key, _key); 
const decrypted = caesar.decipher(encrypted, key_); 

console.log(decrypted);