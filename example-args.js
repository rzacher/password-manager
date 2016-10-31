var argv = require('yargs')
	.command('hello', 'Greets the user', function (yargs) {
 		yargs.options({
 			name: {
 				demand: true,
 				alias: 'n',
 				description: 'your first name goes here',
 				type: 'string'
 			}, 
 			lastname: {
 				demand: true,
 				alias: 'l',
 				description: 'your last name goes here',
 				type: 'string'
 			}
 		}).help('help');
	})
	.help('help')
	.argv;
var command = argv._[0];

console.log(argv);

if (command === 'hello' && typeof argv.name !== 'undefined') {
	if (typeof argv.lastname !== 'undefined') {
        console.log('Hello ' + argv.name + ' ' + argv.lastname + '!');
	} else {
	   console.log('Hello ' + argv.name + '!');
    }
} else if (command === 'hello') {
	console.log('hello world');
}