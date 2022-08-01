// operators buttons
const division = document.querySelector("#divide");
const multiplication = document.querySelector("#multiply");
const subtraction = document.querySelector("#subtract");
const addition = document.querySelector("#add");

// numbers, decimal, and assignment buttons
const buttons = document.querySelectorAll(".buttons");

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
			if (numbersDisplayed.textContent == 0 && button.textContent == 0) {
				return numbersDisplayed.textContent;
			}
			if (
				numbersDisplayed.textContent == 0 &&
				isNaN(Number(button.textContent))
			) {
				return (numbersDisplayed.textContent += button.textContent);
			}

			let splitNum = numbersDisplayed.textContent.split("");
			if (splitNum.length == 1 && splitNum[0] == 0) splitNum.shift();
			console.log(splitNum);
			numbersDisplayed.textContent =
				splitNum.join("") + button.textContent;
		});
	}
}
buttonsClicked();
function operate() {}
