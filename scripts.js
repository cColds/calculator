// operators buttons
const division = document.querySelector("#divide");
const multiplication = document.querySelector("#multiply");
const subtraction = document.querySelector("#subtract");
const addition = document.querySelector("#add");
const assignment = document.querySelector("#assignment");
// numbers, decimal, and assignment buttons
const buttons = document.querySelectorAll(".buttons");
const operatorButtons = document.querySelectorAll(".operator");

// displays number to screen
let numbersDisplayed = document.querySelector(".numbers");

// clears things
const allClear = document.querySelector("#ac");
allClear.addEventListener("click", () => (numbersDisplayed.textContent = 0));

const deletion = document.querySelector("#del");
deletion.addEventListener("click", () => {
	const numbersToDelete = numbersDisplayed.textContent;
	const split = numbersToDelete.split("");
	split.pop();
	const joined = split.join("");
	numbersDisplayed.textContent = joined;

	if (joined.length == 0) numbersDisplayed.textContent = 0;
});

// listens for clicks on buttons and updates things
function buttonsClicked() {
	for (const button of buttons) {
		button.addEventListener("click", () => {
			// fix 0 at the start being gone when entering an operator or decimal

			if (
				numbersDisplayed.textContent == 0 &&
				isNaN(Number(button.textContent))
			) {
				return (numbersDisplayed.textContent += button.textContent);
			}

			let splitNum = numbersDisplayed.textContent.split("");
			// fix adding more than one 0 at the start
			if (splitNum.length == 1 && splitNum[0] == 0) splitNum.shift();
			// console.log(+button.textContent + +button.textContent);

			numbersDisplayed.textContent =
				splitNum.join("") + button.textContent;
			const numbersStored = [];
			let numberValue = numbersDisplayed.textContent;
			numbersStored.push(numberValue);

			switch (button.textContent) {
				case "=":
					let numbersSplit = numbersStored.toString().split("+");
					let numOne = +numbersSplit[0];

					let numTwo = +numbersSplit[1].slice(0, -1);
					console.log(
						`I am num one (${numOne}), and I am num two (${numTwo})`
					);
					operate(numOne, numTwo, button.textContent);
			}
		});
	}
}

buttonsClicked();

function divide(a, b) {
	return a / b;
}

function multiply(a, b) {
	return a * b;
}

function subtract(a, b) {
	return a - b;
}

function add(a, b) {
	return a + b;
}

function operate(a, b, operator) {
	switch (operator) {
		case "=":
			add(a, b);

			numbersDisplayed.textContent = `${a + b}`;
			console.log(a + b);
			break;
		case "-":
			subtract(a, b);
			console.log(a - b);
			break;
		case "×":
			multiply(a, b);
			console.log(a * b);
			break;
		case "÷":
			divide(a, b);
			console.log(a / b);
			break;
	}
}
