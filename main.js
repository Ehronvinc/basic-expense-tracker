const form = document.getElementById("expense-tracker-form");
const expenseInput = document.getElementById("expense-input");
const expenseDesc = document.getElementById("expense-desc-input");
const amountInput = document.getElementById("amount-input");
const listContainer = document.querySelector(".list-container");
const textGuide = document.querySelector(".text-guide");
const warningText = document.getElementById("warnin");
const clearBtn = document.querySelector(".clear-all-btn");
const totalExpenses = document.querySelector(".total-expenses");
let expenses = [];
let index = 0;
let deleteId = 1;

function checkInputs(e) {
  e.preventDefault();

  if (
    expenseInput.value === "" &&
    expenseDesc.value === "" &&
    amountInput.value === ""
  ) {
    expenseInput.style.outline = "2px solid red";
    expenseDesc.style.outline = "2px solid red";
    amountInput.style.outline = "2px solid red";
  } else if (expenseInput.value === "" && expenseDesc.value === "") {
    expenseInput.style.outline = "2px solid red";
    expenseDesc.style.outline = "2px solid red";
  } else if (expenseDesc.value === "" && amountInput.value === "") {
    expenseDesc.style.outline = "2px solid red";
    amountInput.style.outline = "2px solid red";
  } else if (expenseInput.value === "" && amountInput.value === "") {
    expenseInput.style.outline = "2px solid red";
    amountInput.style.outline = "2px solid red";
  } else if (expenseInput.value === "") {
    expenseInput.style.outline = "2px solid red";
  } else if (expenseDesc.value === "") {
    expenseDesc.style.outline = "2px solid red";
  } else if (amountInput.value === "") {
    amountInput.style.outline = "2px solid red";
  } else if (isNaN(amountInput.value)) {
    warningText.classList.replace("hidden", "warning-text");
    setTimeout(() => {
      warningText.classList.replace("warning-text", "hidden");
    }, 5000);
  } else {
    warningText.classList.replace("warning-text", "hidden");
    getInputs();
  }
}

// Focus input functions
function focusInputTitle() {
  expenseInput.style.outline = "2px solid #46f8ec";
}
function focusInputDesc() {
  expenseDesc.style.outline = "2px solid #46f8ec";
}
function focusInputAmount() {
  amountInput.style.outline = "2px solid #46f8ec";
}

// Blur input functions
function blurInputTitle() {
  expenseInput.style.outline = "none";
}
function blurInputDesc() {
  expenseDesc.style.outline = "none";
}
function blurInputAmount() {
  amountInput.style.outline = "none";
}

// Get input values and create expense info container feature
function getInputs() {
  expenses.push({
    id: deleteId,
    expense: expenseInput.value,
    description: expenseDesc.value,
    amount: amountInput.value,
  });

  form.reset();
  textGuide.classList.replace("text-guide", "hidden");
  createInfoContainer();
  calculateTotalExpenses();
  scrollToBottom();
  index++;
  deleteId++;
}

// Create expense info container feature
function createInfoContainer() {
  const expenseInfo = document.createElement("div");
  const leftCont = createLeftCont();
  const rightCont = createRightCont();

  expenseInfo.classList.add("list-expense-info");

  expenseInfo.append(leftCont, rightCont);
  listContainer.appendChild(expenseInfo);
  clearAllBtn(expenseInfo);
}

// Create left container feature
function createLeftCont() {
  const leftContainer = document.createElement("div");
  const expenseTitle = createExpenseTitle();
  const expenseDesc = createExDesc();

  leftContainer.classList.add("left-container");

  leftContainer.append(expenseTitle, expenseDesc);
  return leftContainer;
}

// Create right container feature
function createRightCont() {
  const rightContainer = document.createElement("div");
  const expensePrice = createPrice();
  const removeBtns = createRemoveBtn(expenses[index].id);

  rightContainer.classList.add("right-container");

  rightContainer.append(expensePrice, removeBtns);

  return rightContainer;
}

// Create expense title feature
function createExpenseTitle() {
  const expenseTitle = document.createElement("p");

  expenseTitle.classList.add("expense-title-info");

  expenseTitle.textContent = expenses[index].expense;

  return expenseTitle;
}

// Create expense description feature
function createExDesc() {
  const expenseDesc = document.createElement("p");

  expenseDesc.classList.add("expense-desc-info");

  expenseDesc.textContent = expenses[index].description;
  return expenseDesc;
}

// Create expense amount feature
function createPrice() {
  const expensePrice = document.createElement("p");

  expensePrice.classList.add("expense-price-info");

  expensePrice.textContent = `-₱${expenses[index].amount}`;
  return expensePrice;
}

// Create remove button feature
function createRemoveBtn(expenseId) {
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";

  removeBtn.addEventListener("click", (e) => {
    removeItemArray(expenseId);
    e.target.parentElement.parentElement.remove();
    calculateTotalExpenses();
    if (expenses.length === 0) {
      textGuide.classList.replace("hidden", "text-guide");
    }
  });

  return removeBtn;
}

// Remove item from array feature
function removeItemArray(deleteId) {
  expenses = expenses.filter((expense) => expense.id !== deleteId);
}

// Clear all buttons feature
function clearAllBtn(cardsContainer) {
  clearBtn.addEventListener("click", () => {
    cardsContainer.remove();
    totalExpenses.textContent = "Total expenses:";
    expenses = [];
    index = 0;
    deleteId = 1;
    textGuide.classList.replace("hidden", "text-guide");
  });
}

// Calculate total expenses feature
function calculateTotalExpenses() {
  const total = expenses.reduce((ini, curr) => {
    return ini + parseInt(curr.amount);
  }, 0);
  totalExpenses.textContent = `Total expenses: ₱${total}`;
}

// Scroll to bottom of list container feature
function scrollToBottom() {
  listContainer.scrollTop = listContainer.scrollHeight;
}

expenseInput.addEventListener("focus", focusInputTitle);
expenseDesc.addEventListener("focus", focusInputDesc);
amountInput.addEventListener("focus", focusInputAmount);

expenseInput.addEventListener("blur", blurInputTitle);
expenseDesc.addEventListener("blur", blurInputDesc);
amountInput.addEventListener("blur", blurInputAmount);

form.addEventListener("submit", checkInputs);
