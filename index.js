// script.js

// Get elements from the DOM
const expenseInput = document.getElementById('expense');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const addBtn = document.getElementById('add-btn');
const expenseList = document.getElementById('expense-list');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let editingIndex = null;  // To track which expense is being edited

// Function to render the expenses
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.amount} - ${expense.description} (${expense.category})
            <span>
                <button class="edit" onclick="editExpense(${index})">Edit-Expense</button>
                <button onclick="deleteExpense(${index})">Delete-Expense</button>
            </span>
        `;
        expenseList.appendChild(li);
    });
}

// Function to add or edit an expense
function addOrEditExpense() {
    const amount = expenseInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;

    if (amount === '' || description === '') {
        alert('Please fill in all fields');
        return;
    }

    const expense = {
        amount,
        description,
        category
    };

    if (editingIndex !== null) {
        // Editing existing expense
        expenses[editingIndex] = expense;
        editingIndex = null;
        addBtn.textContent = 'Add Expense';
    } else {
        // Adding new expense
        expenses.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    clearForm();
}

// Function to clear the form
function clearForm() {
    expenseInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = 'English';
}

// Function to edit an expense
function editExpense(index) {
    const expense = expenses[index];
    expenseInput.value = expense.amount;
    descriptionInput.value = expense.description;
    categoryInput.value = expense.category;
    editingIndex = index;
    addBtn.textContent = 'Update Expense';
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Add event listener to the add button
addBtn.addEventListener('click', addOrEditExpense);

// Initial rendering of expenses from local storage
renderExpenses();
