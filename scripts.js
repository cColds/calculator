const numberButtons = document.querySelectorAll(".numButtons");
const operatorButtons = document.querySelectorAll(".operator");
const assignmentButton = document.querySelector("#assignment");
const numbersDisplayed = document.querySelector(".numbers");
const allClear = document.querySelector("#ac");
const deleteNumber = document.querySelector("#del");
const operators = ["+", "-", "×", "÷"];

let numOne = 0;
let numTwo = 0;
// display numbers
function displayNumbers(num) {
	let storeValue = [];
	if (num) {
		const displaySplit = num.toString().split("");

		if (
			numbersDisplayed.textContent == 0 &&
			!isNaN(displaySplit[0]) &&
			displaySplit.length == 1
		) {
			numbersDisplayed.textContent = num;
			storeValue.push(numbersDisplayed.textContent);
		} else if (numbersDisplayed.textContent != num) {
			numbersDisplayed.textContent += num;
			storeValue.push(numbersDisplayed.textContent);
		}
	}

	if (
		storeValue.toString().split("").includes("+") ||
		storeValue.toString().split("").includes("-") ||
		storeValue.toString().split("").includes("×") ||
		storeValue.toString().split("").includes("÷")
	) {
		const splitOperators = storeValue.toString().split("");
		const onlyOperators = splitOperators.toString().replace(/[0-9,]/g, "");

		let removeOperator = storeValue.join().split(/[+×÷-]/);

		numOne = removeOperator[0];
		numTwo = removeOperator[1];
		if (numTwo) {
			operate(+numOne, +numTwo, onlyOperators);
		}
	}
}

// listen for clicks on numbers and decimal
for (const num of numberButtons) {
	num.addEventListener("click", () => {
		displayNumbers(num.textContent);
	});
}

//listen for clicks on 4 operators (+,-,×,÷)
for (const op of operatorButtons) {
	op.addEventListener("click", (e) => {
		displayNumbers(e.target.textContent);
	});
}

// displays result when clicked
function assignment(result) {
	assignmentButton.addEventListener("click", () => {
		return displayNumbers((numbersDisplayed.textContent = result));
	});
}
// clears all numbers
allClear.addEventListener("click", () =>
	displayNumbers((numbersDisplayed.textContent = 0))
);

// deletes one number every click
deleteNumber.addEventListener("click", () => {
	const splitDelNum = numbersDisplayed.textContent.toString().split("");
	if (splitDelNum.length == 1) return (numbersDisplayed.textContent = 0);
	splitDelNum.pop();
	const delNumJoin = splitDelNum.join("");
	numbersDisplayed.textContent = delNumJoin;
});

// takes operator and numbers
function operate(a, b, operator) {
	switch (operator) {
		case "+":
			assignment(add(a, b));
			break;
		case "-":
			assignment(subtract(a, b));
			break;
		case "×":
			assignment(multiply(a, b));
			break;
		case "÷":
			assignment(divide(a, b));
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
