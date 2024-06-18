const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll("#tips button");
const customTipInput = document.querySelector(".tip-button6"); // Changed to querySelector
const noOfPeopleInput = document.getElementById("noOfPeople");
const tipAmountDisplay = document.querySelector(".tip-amount");
const totalAmountDisplay = document.querySelector(".total");
const resetButton = document.querySelector(".reset");

function calculateTipAndTotal(bill, tipPercentage, noOfPeople) {
  const tipAmount = bill * (tipPercentage / 100);
  const tipAmountPerOne = (bill * (tipPercentage / 100)) / noOfPeople;
  const total = (bill + tipAmount) / noOfPeople;

  tipAmountDisplay.textContent = `$${tipAmountPerOne.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${total.toFixed(2)}`;
}

function handleInput() {
  const billAmount = parseFloat(billInput.value);
  const noOfPeople = parseInt(noOfPeopleInput.value);

  let tipPercentage = 0;
  tipButtons.forEach((button) => {
    if (button.classList.contains("active")) {
      tipPercentage = parseFloat(button.dataset.value);
    }
  });

  if (customTipInput.value.trim() !== "") {
    // Corrected to use customTipInput directly
    const customTipPercentage = parseFloat(customTipInput.value);
    if (!isNaN(customTipPercentage) && customTipPercentage >= 0) {
      tipPercentage = customTipPercentage;
    }
  }

  if (
    !isNaN(billAmount) &&
    billAmount > 0 &&
    !isNaN(noOfPeople) &&
    noOfPeople > 0
  ) {
    calculateTipAndTotal(billAmount, tipPercentage, noOfPeople);
  } else {
    tipAmountDisplay.textContent = `$0.00`;
    totalAmountDisplay.textContent = `$0.00`;
  }
}

billInput.addEventListener("input", handleInput);

tipButtons.forEach((button) => {
  button.addEventListener("click", function () {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    handleInput();
  });
});

customTipInput.addEventListener("input", function () {
  tipButtons.forEach((button) => button.classList.remove("active"));
  handleInput();
});

noOfPeopleInput.addEventListener("input", handleInput);

resetButton.addEventListener("click", function () {
  billInput.value = "";
  noOfPeopleInput.value = "";

  tipButtons.forEach((btn) => btn.classList.remove("active"));
  customTipInput.value = "";
  tipAmountDisplay.textContent = `$0.00`;
  totalAmountDisplay.textContent = `$0.00`;
});
