

try {
	throw new Error('unable to do the thing you wanted');
} catch (e) {
	console.log(e.message);
} finally {
	console.log('finally block executed');
}

console.log('try catch ended. ')