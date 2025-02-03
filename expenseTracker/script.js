document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseList = document.getElementById("expense-list");
  const expenseAmount = document.getElementById("expense-amount");
  const submit = document.getElementById("submit");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expense")) || [];

  let totalAmount = calculateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());

    if(amount<=0){
      alert("Please Enter a Amount Greater Than Zero.")
      return;
    }

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpenses();
      renderExpenses();
      updateTotal();

      //clear input after each submission
      expenseName.value = "";
      expenseAmount.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - &#8377 ${expense.amount.toFixed(2)}
        <button data-id="${expense.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
  }

  function saveExpenses() {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseID = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseID);
      saveExpenses();
      renderExpenses();
      updateTotal();
    }
  });
  renderExpenses();
  updateTotal();
});

