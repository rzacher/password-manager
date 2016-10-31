var crypto = require('crypto-js');

var secretMessage = {
	name: 'andrew',
	secretName: '007'
}

var secretKey = '123abc';
//encypt
var secretMessageStr = JSON.stringify(secretMessage);
var encryptedMessage = crypto.AES.encrypt(secretMessageStr, secretKey);

console.log("encypted message " + encryptedMessage);

//decrypt
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
var decryptedMessageStr = bytes.toString(crypto.enc.Utf8);
var decryptedMessageObj = JSON.parse(decryptedMessageStr);
console.log(decryptedMessageObj)