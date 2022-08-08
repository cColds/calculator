const numberButtons = document.querySelectorAll(".numButtons");
const operatorButtons = document.querySelectorAll(".operator");
const assignmentButton = document.querySelector("#assignment");
const numbersDisplayed = document.querySelector(".numbers");
const allClear = document.querySelector("#ac");
const deleteNumber = document.querySelector("#del");

let numOne = 0;
let numTwo = 0;

// display numbers
function displayNumbers(num) {
	const storeValue = [];
	if (numbersDisplayed.textContent == "undefined")
		numbersDisplayed.textContent = 0;
	if (num) {
		const arr = [0];
		arr.push(num);
		const splitStr = numbersDisplayed.textContent.split("");
		// prevent 0 at the start e.g 01
		if (
			numbersDisplayed.textContent == arr[0] &&
			!isNaN(num) &&
			!splitStr.includes(".")
		) {
			arr.shift();
			numbersDisplayed.textContent = arr[0];
			storeValue.push(numbersDisplayed.textContent);
		} else {
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
		const onlyOperators = splitOperators.toString().replace(/[0-9,.]/g, "");
		const removeOperator = storeValue.join().split(/[+×÷-]/);
		onlyOperators.split("");

		numOne = removeOperator[0];
		numTwo = removeOperator[1];
		let valStored = 0;
		let numOperator;
		if (onlyOperators.length > 1) {
			if (onlyOperators[0].includes("+")) numOperator = add;
			else if (onlyOperators[0].includes("-")) numOperator = subtract;
			else if (onlyOperators[0].includes("×")) numOperator = multiply;
			else if (onlyOperators[0].includes("÷")) numOperator = divide;
			if (isNaN(+numOne / +numTwo) && numOperator == divide) {
				return (numbersDisplayed.textContent = "undefined");
			}
			valStored = numOperator(+numOne, +numTwo);
			Array.from(onlyOperators).shift();
			numbersDisplayed.textContent =
				valStored + onlyOperators[onlyOperators.length - 1];

			return;
		} else if (numTwo) {
			operate(
				+numOne,
				+numTwo,
				onlyOperators[onlyOperators.length - 1],
				0
			);
		}
	}
}

// listen for clicks on numbers and decimal
for (const num of numberButtons) {
	num.addEventListener("click", () => displayNumbers(num.textContent));
}

//listen for clicks on 4 operators (+,-,×,÷)
for (const op of operatorButtons) {
	op.addEventListener("click", (e) => displayNumbers(e.target.textContent));
}

// displays result when clicked
function assignment(result) {
	assignmentButton.addEventListener("click", () =>
		isNaN(result)
			? (numbersDisplayed.textContent = "undefined")
			: (numbersDisplayed.textContent = result)
	);
}

// clears all numbers
allClear.addEventListener("click", () => {
	numbersDisplayed.textContent = 0;
	assignment((result = numbersDisplayed.textContent));
});

// deletes one number every click
deleteNumber.addEventListener("click", () => {
	const splitDelNum = numbersDisplayed.textContent.toString().split("");
	if (splitDelNum.length == 1) return (numbersDisplayed.textContent = 0);
	splitDelNum.pop();
	const delNumJoin = splitDelNum.join("");
	numbersDisplayed.textContent = delNumJoin;
});
// math functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => Math.round((a / b) * 100) / 100;
// takes operator and numbers
function operate(a, b, operator, storeResult) {
	switch (operator) {
		case "+":
			storeResult = add(a, b);
			break;
		case "-":
			storeResult = subtract(a, b);
			break;
		case "×":
			storeResult = multiply(a, b);
			break;
		case "÷":
			storeResult = divide(a, b);
			break;
	}
	assignment(storeResult);
}
