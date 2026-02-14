let description = document.getElementById("description");
let form = document.getElementById("transaction-form");
let amount = document.getElementById("amount");
let balance = document.getElementById("balance");
let transactionListEl = document.getElementById("transaction-list");
let incomeAmount = document.getElementById("income-amount");
let expenseAmount = document.getElementById("expense-amount");

let totalamount = 0;
let income = 0;
let expense = 0;
let data = [];

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(data));
  localStorage.setItem("totalamount", totalamount);
  localStorage.setItem("income", income);
  localStorage.setItem("expense", expense);
}

function loadFromLocalStorage() {
  let storedData = localStorage.getItem("transactions");

  if (storedData) {
    data = JSON.parse(storedData);
  }

  totalamount = Number(localStorage.getItem("totalamount")) || 0;
  income = Number(localStorage.getItem("income")) || 0;
  expense = Number(localStorage.getItem("expense")) || 0;

  balance.textContent = totalamount;
  incomeAmount.textContent = income;
  expenseAmount.textContent = expense;

  render();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let des = description.value;
  let money = Number(amount.value);

  data.push({
    on: des,
    amount: money,
  });

  if (money > 0) {
    income += money;
  } else {
    expense += money;
  }

  totalamount += money;

  balance.textContent = totalamount;
  incomeAmount.textContent = income;
  expenseAmount.textContent = expense;

  saveToLocalStorage();   
  render();

  description.value = "";
  amount.value = "";
});

function render() {
  transactionListEl.innerHTML = "";

  data.forEach((item, index) => {
    let li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(item.amount > 0 ? "income" : "expense");

    li.innerHTML = `
      <span>${item.amount}</span>
      <span>${item.on}
        <button class="delete-btn">x</button>
      </span>
    `;

    transactionListEl.appendChild(li);

    li.querySelector(".delete-btn").addEventListener("click", () => {
      removeEL(index);
    });
  });
}

function removeEL(index) {
  let removedAmount = Number(data[index].amount);

  totalamount -= removedAmount;

  if (removedAmount > 0) {
    income -= removedAmount;
  } else {
    expense -= removedAmount;
  }

  data.splice(index, 1);

  balance.textContent = totalamount;
  incomeAmount.textContent = income;
  expenseAmount.textContent = expense;

  saveToLocalStorage();   
  render();
}

loadFromLocalStorage();
