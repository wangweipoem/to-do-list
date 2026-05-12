// Select elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load todos from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => createTodoElement(todo));
}

// Save todos to localStorage
function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(item => {
        todos.push({
            text: item.querySelector(".label").innerText,
            completed: item.classList.contains("completed"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a new todo item
function createTodoElement(todoData) {
    const todoItem = document.createElement("li");
    todoItem.classList.toggle("completed", todoData.completed);

    const label = document.createElement("span");
    label.classList.add("label");
    label.innerText = todoData.text;
    label.addEventListener("click", () => {
        todoItem.classList.toggle("completed");
        saveTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
        todoItem.remove();
        saveTodos();
    });

    todoItem.appendChild(label);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
}

// Add new todo
addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text) {
        createTodoElement({ text, completed: false });
        saveTodos();
        todoInput.value = "";
    }
});

// Load todos when the app starts
loadTodos();