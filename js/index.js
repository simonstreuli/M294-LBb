const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

let todos = [];

function renderTodos() {
  list.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement("li");
    li.textContent = todo.text;
    const completedBox = document.createElement("input");
    completedBox.type = "checkbox";
    completedBox.checked = todo.completed;
    completedBox.addEventListener("change", () => {
      todo.completed = completedBox.checked;
      li.classList.toggle("completed", todo.completed);
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      todos.splice(i, 1);
      renderTodos();
    });
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => {
      const newText = prompt("New text", todo.text);
      if (newText) {
        todo.text = newText;
        renderTodos();
      }
    });
    li.appendChild(completedBox);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    list.appendChild(li);
    li.classList.toggle("completed", todo.completed);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    todos.push({ text, completed: false });
    input.value = "";
    renderTodos();
  }
});

renderTodos();
