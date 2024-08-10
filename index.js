const basic_instructions = {
	"mov": {
		"operands": 2
	}
}

var errors = [];

const fs = require("fs");

const inputfile = JSON.parse(fs.readFileSync("first_test.json", "utf-8"));

for(let i = 0; i < inputfile.length; i++) {
	if (basic_instructions.hasOwnProperty(inputfile[i].name)) {
		const operandsLength = inputfile[i].operands.length;
		const expectedOperandsLength = basic_instructions[inputfile[i].name].operands;
		
		if (operandsLength != expectedOperandsLength) {
			errors.push(`Instruction ${inputfile[i].name} expects ${expectedOperandsLength} operands, but ${operandsLength} were given`);
		}
	} else {
		errors.push(`Instruction ${inputfile[i].name} not found in the instructions set`);
	}
}

console.log(errors);