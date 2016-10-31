var person = {
	name: 'andrew',
	age: 24
};

var personJSON = JSON.stringify(person);
console.log(personJSON);
console.log(typeof personJSON);

var personObject = JSON.parse(personJSON);
console.log(personObject.name);
console.log(typeof personObject);

console.log('challenge area');

var animal = '{"name": "darwin"}';
// make an object
animalObj = JSON.parse(animal);

//add age
animalObj.age = 24;

// convert back to JSON and print. 
var animalStr = JSON.stringify(animalObj);
console.log(animalStr);