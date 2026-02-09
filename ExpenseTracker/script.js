let description = document.getElementById("description");
let transitionForm = document.getElementById("transaction-form");
let form = document.getElementById("transaction-form");
let amount = document.getElementById("amount");
let balance = document.getElementById("balance");
let transactionListEl = document.getElementById("transaction-list")

let totalamount = 10;

let data = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let des = description.value;
  let money = amount.value;
  data.push({
    on: des,
    amount: money,
  });
  totalamount += Number(money);
  balance.textContent = Number(totalamount);
  render();
});

function render() {
    transactionListEl.innerHTML = "";
  data.forEach((item, index) => {
    let li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(data.amount > 0 ? "income" : "expense");
    li.innerHTML = `
            <span>${item.amount}</span>
            <span>${item.on}
                <button class="delete-btn">x</button>
            </span>
        `;
    transactionListEl.appendChild(li)
    li.querySelector(".delete-btn").addEventListener("click",(e)=>{
        removeEL(index);
    })
  });
}

function removeEL(index){
    totalamount -= Number(data[index].amount); 
    data.splice(index, 1);
    balance.textContent = totalamount;
    render();
}
