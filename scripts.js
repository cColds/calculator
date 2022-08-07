const numberButtons = document.querySelectorAll(".numButtons");
const operatorButtons = document.querySelectorAll(".operator");
const assignmentButton = document.querySelector("#assignment");
const numbersDisplayed = document.querySelector(".numbers");
const allClear = document.querySelector("#ac");
const deleteNumber = document.querySelector("#del");
// listen for clicks on numbers and decimal

for (const num of numberButtons) {
	num.addEventListener("click", (e) => {
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

assignmentButton.addEventListener("click", (e) => {
	displayNumbers(e.target.textContent);
});

// display numbers
function displayNumbers(num) {
	const displaySplit = num.toString().split("");
	if (
		numbersDisplayed.textContent == 0 &&
		!isNaN(displaySplit[0]) &&
		displaySplit.length == 1
	) {
		numbersDisplayed.textContent = num;
	} else {
		numbersDisplayed.textContent += num;
	}
	console.log(numbersDisplayed.textContent);
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
			add(a, b);
			// let store = a + b;

			// console.log(store);
			break;
		case "-":
			subtract(a, b);
			break;
		case "×":
			multiply(a, b);
			break;
		case "÷":
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
