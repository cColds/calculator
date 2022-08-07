// takes operator and numbers

function operate(a, b, operator) {
	switch (operator) {
		case "+":
			add(a, b);
			// let store = a + b;

			// console.log(store);
			break;
		case "-":
			subtract(a, b);
			break;
		case "*":
			multiply(a, b);
			break;
		case "/":
			divide(a, b);
			break;
	}
}

// math functions
function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}
