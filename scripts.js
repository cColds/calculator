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

// clears everything
const allClear = document.querySelector("#ac");
allClear.addEventListener("click", () => (numbersDisplayed.textContent = 0));

// deletes one (pops the last index) number, decimal, or operator
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
		let storeArr = [];
		storeArr.push(numbersDisplayed.textContent);
		console.log(storeArr);
		let splitStoreArr = storeArr.toString().split("");
		let joinArr = splitStoreArr.join("");
		console.log(joinArr);

		let checkHowManyAssignments = splitStoreArr.filter(
			(item) => item == "="
		).length;
		let replaceStuff = joinArr.replace("=", "");
		console.log(replaceStuff);
		if (
			storeArr.join("").match(/[+-×÷]/) !== true &&
			checkHowManyAssignments == 1
		) {
			numbersDisplayed.textContent = replaceStuff;
		} else if (
			splitStoreArr[0] == 0 &&
			isNaN(Number(button.textContent)) &&
			splitStoreArr.length == 1 &&
			button.textContent !== "="
		) {
			return (numbersDisplayed.textContent += button.textContent);
		}

		// fix adding more than one 0 at the start
		let splitNum = numbersDisplayed.textContent.split("");
		if (splitNum.length == 1 && splitNum[0] == 0) {
			splitNum.shift();
		}
		numbersDisplayed.textContent = splitNum.join("") + button.textContent;
		// operators
		let arr = [];
		arr.push(numbersDisplayed.textContent);

		const operator = arr.toString().replace(/[0-9]/g, "");
		let splitOperators = operator.toString().split("");
		let assignmentOperator = splitOperators[splitOperators.length - 1];

		console.log(arr);
		// prevent adding more than one operator at a time
		let replaceOperator = arr.toString().replace(/[0-9,]/g, "");
		let splitArr = arr.toString().split("");

		if (splitArr.join("").match(/[+×÷-]/) && !splitArr.includes(".")) {
			let onlyNumbers = numbersDisplayed.textContent
				.toString()
				.replace(/[^\d.]/g, "");

			if (replaceOperator.length > 1) {
				let replaceToArray = Array.from(replaceOperator);
				replaceToArray.shift();
				if (replaceToArray) {
					numbersDisplayed.textContent =
						onlyNumbers + replaceToArray[0];
				}
			}
		}

		// calculate stuff

		switch (assignmentOperator) {
			case "=":
				let checkAdd = arr.toString().split("");

				if (checkAdd.includes("+")) {
					let numbersSplitAdd = arr.toString().split("+");
					let numOneAdd = +numbersSplitAdd[0];
					let numTwoAdd = +numbersSplitAdd[1].slice(0, -1);
					let numbersStored = numOneAdd + numTwoAdd;
					numbersDisplayed.textContent = numbersStored;
				} else if (checkAdd.includes("-")) {
					let numbersSplitSubtract = arr.toString().split("-");
					let numOneSubtract = +numbersSplitSubtract[0];
					let numTwoSubtract = +numbersSplitSubtract[1].slice(0, -1);

					numbersDisplayed.textContent =
						numOneSubtract - numTwoSubtract;
				} else if (checkAdd.includes("×")) {
					let numbersSplitMultiply = arr.toString().split("×");
					let numOneMultiply = +numbersSplitMultiply[0];
					let numTwoMultiply = +numbersSplitMultiply[1].slice(0, -1);

					numbersDisplayed.textContent =
						numOneMultiply * numTwoMultiply;
				} else if (checkAdd.includes("÷")) {
					let numbersSplitDivide = arr.toString().split("÷");
					let numOneDivide = +numbersSplitDivide[0];
					let numTwoDivide = +numbersSplitDivide[1].slice(0, -1);
					if (numOneDivide == 0 && numTwoDivide == 0) {
						alert("can't divide by 0");
					} else {
						numbersDisplayed.textContent =
							numOneDivide / numTwoDivide;
					}
				}

				break;
		}
	});
}
