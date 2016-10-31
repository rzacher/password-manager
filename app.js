console.log('starting password manager');

var storage = require('node-persist');
var crypto = require('crypto-js');

storage.initSync(); 

// create 
//    --name
 //   --username
//    --password

// get
//   --name

var argv = require('yargs')
	.command('create', 'create account', function (yargs) {
 		yargs.options({
 			name: {
 				demand: true,
 				alias: 'n',
 				description: 'your account name goes here',
 				type: 'string'
 			}, 
 			username: {
 				demand: true,
 				alias: 'u',
 				description: 'your username goes here',
 				type: 'string'
 			},
 			password: {
 				demand: true,
 				alias: 'p',
 				description: 'your password goes here',
 				type: 'string'
 			}, 
 			masterPassword: {
 				demand: true,
 				alias: 'm',
 				description: 'your master password goes here',
 				type: 'string'
 			}
 		}).help('help');
	})
	.command('get', 'get account', function (yargs) {
 		yargs.options({
 			name: {
 				demand: true,
 				alias: 'n',
 				description: 'your account name goes here',
 				type: 'string'
 			}, 
 			masterPassword: {
 				demand: true,
 				alias: 'm',
 				description: 'your master password goes here',
 				type: 'string'
 			}
 		})
 	})
	.help('help')
	.argv;
var command = argv._[0];

console.log(argv);

function getAccounts( masterPassword) {
	//use getItemSynce to get accounts
	 var encryptedAccounts = storage.getItemSync('accounts');
     var accounts = undefined
     if (encryptedAccounts === undefined) {
   	   accounts = [];
     } else {
		//decrypt
		var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
	    var decryptedMessageStr = bytes.toString(crypto.enc.Utf8);
	    accounts = JSON.parse(decryptedMessageStr);
    }
	return accounts 
}

function saveAccounts(accounts, masterPassword) {
	// encrypt accounts
	var accountsStr = JSON.stringify(accounts);
    var encryptedAccounts = crypto.AES.encrypt(accountsStr, masterPassword);
    console.log(encryptedAccounts);
	// use setItemsnyc to save
	storage.setItemSync('accounts', encryptedAccounts.toString());
    console.log('1');
	// return accounts array
	return accounts; 

}

function createAccount ( account, masterPassword) {
	var accounts = getAccounts(masterPassword);
   	accounts.push(account);
   	saveAccounts(accounts, masterPassword);
   return account; 
}

function getAccount(accountName, masterPassword) {
     var accounts = getAccounts(masterPassword);
	
	//iter over array and return matching account or undefined. 
	for (var i=0; i<accounts.length; i++) {
		var account = accounts[i];
		if (account.name === accountName) {
			return account;
		}
	}

	return undefined; 
}




if (command === 'create' ) {
	try {
		var account= {
			name: argv.name,
			username: argv.username,
			password: argv.password
		};
		console.log(' account in = ');
		console.log(account);
	  	createAccount(account, argv.masterPassword);
  } catch (e) {
  	console.log('unable to create account');
  }
} else if (command === 'get') {
	try {
	var account = getAccount(argv.name, argv.masterPassword);
	if (typeof account === 'undefined') {
		console.log('account not found');
	} else {
	    console.log('account = ' + account.name + ' ' + account.username + ' ' + account.password);
    }
} catch (e) {
	console.log('unable to get account');
}
} else {
	console.log('no command');
}
//console.log(getAccount('facebook'));
