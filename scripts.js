const numberButtons = document.querySelectorAll(".numButtons");
const operatorButtons = document.querySelectorAll(".operator");
const assignmentButton = document.querySelector("#assignment");
const numbersDisplayed = document.querySelector(".numbers");
const allClear = document.querySelector("#ac");
const deleteNumber = document.querySelector("#del");
const decimals = document.querySelector(".decimalButton");
let numOne = 0;
let numTwo = 0;

// display numbers
function displayNumbers(num) {
	const storeValue = [];
	const splitStr = numbersDisplayed.textContent.split("");
	const decimalArr = [];
	let text = numbersDisplayed.textContent;

	text += num;

	disableAssignmentButton(text);
	const lastIndex = splitStr[splitStr.length - 1];
	const splitText = text.split("");
	const removeOperatorInDecimal = Array.from(text)
		.join("")
		.split(/[+×÷-]/);

	splitText.filter((item) => {
		if (item == ".") {
			decimalArr.push(item);
		}
	});
	if (numbersDisplayed.textContent == "undefined")
		numbersDisplayed.textContent = 0;
	if (num) {
		const arr = [0];
		arr.push(num);

		// prevent 0 at the start e.g 01
		if (
			numbersDisplayed.textContent == arr[0] &&
			!isNaN(num) &&
			!splitStr.includes(".")
		) {
			arr.shift();
			numbersDisplayed.textContent = arr[0];
			storeValue.push(numbersDisplayed.textContent);
		} else if (
			isNaN(num) &&
			num !== "." &&
			num !== "=" &&
			isNaN(lastIndex) &&
			lastIndex !== "." &&
			lastIndex !== "="
		) {
			replaceOperator(text, num);
			storeValue.push(numbersDisplayed.textContent);
		} else if (decimalArr.length >= 1) {
			const filtered = filterEmptyItem(removeOperatorInDecimal);

			checkDecimals(filtered);
			if (removeOperatorInDecimal[1] == ".") {
				numbersDisplayed.textContent += "0" + num;
				storeValue.push(numbersDisplayed.textContent);
			} else if (removeOperatorInDecimal[1] !== ".") {
				numbersDisplayed.textContent += num;
				storeValue.push(numbersDisplayed.textContent);
			}
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
		const removeOperator = storeValue.join().split(/[+×÷-]/);
		let onlyOperators = splitOperators.toString().replace(/[0-9,.]/g, "");
		onlyOperators.split("");
		if (!removeOperator[0] && removeOperator[0] !== 0) {
			removeOperator[0] = "-";
			removeOperator[1] = removeOperator[0] + removeOperator[1];
			removeOperator.shift();
			onlyOperators = Array.from(onlyOperators);
			onlyOperators.shift();
		}

		numOne = removeOperator[0];
		numTwo = removeOperator[1];

		let valStored = 0;
		let numOperator;
		if (onlyOperators.length > 1 && numTwo) {
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
			decimals.disabled = false;
			return;
		} else if (!isNaN(numTwo) && numTwo) {
			operate(
				+numOne,
				+numTwo,
				onlyOperators[onlyOperators.length - 1],
				0
			);
		}
	}
}

function checkDecimals(num) {
	if (num[0].includes(".")) decimals.disabled = true;
	if (!num[0].includes(".")) decimals.disabled = false;
	if (num[1]) {
		if (num[1].includes(".")) decimals.disabled = true;
		if (!num[1].includes(".")) decimals.disabled = false;
	}
}

function replaceOperator([...text], operatorClicked) {
	text.pop();
	let lastTextValue = text[text.length - 1];
	text = text.join("").replace(lastTextValue, operatorClicked);
	numbersDisplayed.textContent = text;
}

function disableAssignmentButton([...text], testCase) {
	const splitOperator = text.join("").split(/[+×÷-]/);

	if (testCase == 5) splitOperator.pop();
	if (!splitOperator[1]) assignmentButton.disabled = true;
	else assignmentButton.disabled = false;
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
function assignment(result, decimal) {
	assignmentButton.addEventListener("click", () => {
		const splitResult = result.toString().split("");
		if (splitResult.includes(".")) decimals.disabled = true;
		else decimals.disabled = false;
		return isNaN(result)
			? (numbersDisplayed.textContent = "undefined")
			: (numbersDisplayed.textContent = Math.round(result * 100) / 100);
	});
}
function filterEmptyItem(item) {
	const filteredItem = Array.from(item).filter((el) => {
		return el !== "";
	});
	return filteredItem;
}
// clears all numbers
allClear.addEventListener("click", () => {
	numbersDisplayed.textContent = 0;
	assignment((result = numbersDisplayed.textContent));
	decimals.disabled = false;
});

// deletes one number every click
deleteNumber.addEventListener("click", () => {
	const splitDelNum = numbersDisplayed.textContent.toString().split("");
	const splitDelNumCopy = splitDelNum;
	if (splitDelNum.length == 1) return (numbersDisplayed.textContent = 0);
	const splitOperatorDelNum = splitDelNum.join("").split(/[×+÷-]/);
	if (
		(splitOperatorDelNum[1] == undefined ||
			!splitOperatorDelNum[1].includes(".")) &&
		splitOperatorDelNum[0].includes(".")
	) {
		console.log("hello");
		decimals.disabled = true;
	}
	if (splitDelNum.includes(".")) {
		if (splitDelNumCopy.pop() == ".") decimals.disabled = false;

		numbersDisplayed.textContent = splitDelNumCopy.join("");
	} else {
		splitDelNum.pop();

		let delNumJoin = splitDelNum.join("");
		numbersDisplayed.textContent = delNumJoin;
	}
	if (disableAssignmentButton(splitDelNum, 5)) {
		const onlyOp = splitDelNum.join("").replace(/[0-9.]/g, "");
		let delNumJoin = splitDelNum.join("");
		numbersDisplayed.textContent = delNumJoin + onlyOp[0];
	}
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
