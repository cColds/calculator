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

		numbersDisplayed.textContent = splitNum.join("") + button.textContent;
		const numbersStored = [];
		let numberValue = numbersDisplayed.textContent;
		numbersStored.push(numberValue);
		const operator = numbersStored.toString().replace(/[0-9]/g, "");
		let splitOperators = operator.toString().split("");

		let assignmentOperator = splitOperators[1];

		if (assignmentOperator || operator) {
			switch (assignmentOperator || operator) {
				case "=":
					let checkAdd = numbersStored.toString().split("");

					if (checkAdd.includes("+")) {
						let numbersSplitAdd = numbersStored
							.toString()
							.split("+");
						let numOneAdd = +numbersSplitAdd[0];
						let numTwoAdd = +numbersSplitAdd[1].slice(0, -1);
						console.log(numOneAdd, numTwoAdd);
						numbersDisplayed.textContent = numOneAdd + numTwoAdd;
					} else if (checkAdd.includes("-")) {
						let numbersSplitSubtract = numbersStored
							.toString()
							.split("-");
						let numOneSubtract = +numbersSplitSubtract[0];
						let numTwoSubtract = +numbersSplitSubtract[1].slice(
							0,
							-1
						);
						console.log(numOneSubtract, numTwoSubtract);
						numbersDisplayed.textContent =
							numOneSubtract - numTwoSubtract;
					}

					break;
			}
		}
	});
}
