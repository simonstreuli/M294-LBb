const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const sumbmitbtn = document.querySelector("#submit-btn");

function renderTodos(data) {
  list.replaceChildren();
  for (let i = 0; i < data.length; i++) {
    const todo = data[i];
    const li = document.createElement("li");

    li.textContent = todo.title;

    const completedBox = document.createElement("input");
    completedBox.type = "checkbox";
    completedBox.checked = todo.completed;

    completedBox.addEventListener("change", () => {
      todo.completed = completedBox.checked;
      li.classList.toggle("completed", todo.completed);
    });
    li.prepend(completedBox);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      deleteTask(todo.id);
    });
    li.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => {
      const newTitle = prompt("New text");
      if (newTitle) {
        editTask(todo.id, todo.completed, newTitle);
      } else {
        alert("Can not be empty");
      }
    });
    li.appendChild(editButton);

    li.classList.toggle("completed", todo.completed);
    list.appendChild(li);
  }
}

async function getTasks() {
  const response = await fetch("http://localhost:3000/tasks");
  const data = await response.json();
  renderTodos(data);
}
async function addTask(event) {
  event.preventDefault();
  try {
    const title = input.value;
    if (!title) {
      alert("Can not be empty");
    }
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to add task: ${response.statusText}`);
    } else {
      alert("Task added successfully");
    }
    renderTodos([data]);
    getTasks();
  } catch (error) {
    console.error("There was a problem with adding the task:", error);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch("http://localhost:3000/task/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete task with id ${id}`);
    } else {
      alert("Task deleted successfully");
    }

    getTasks();
  } catch (error) {
    console.error("There was a problem with deleting the task:", error);
  }
}

async function editTask(id, completed, newTitle) {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, completed: completed, title: newTitle }),
    });

    if (!response.ok) {
      throw new Error(`Failed to edit task ${id}`);
    } else {
      alert("Task edited successfully");
    }
    getTasks();
  } catch (error) {
    console.error("There was a problem with editing the task:", error);
  }
}
async function checkLoggedIn() {
  const response = await fetch("http://localhost:3000/auth/cookie/status", {
    credentials: "include",
  });
  if (response.status === 401) {
    window.location.href = "login.html";
  }
}
function authCookieLogoutPost() {
  fetch("http://localhost:3000/auth/cookie/logout", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        alert("Logout successful");
        window.location.href = "login.html";
      } else {
        alert("Error logging out");
      }
    })
    .catch((error) => {
      alert("Error logging out:", error);
    });
}
checkLoggedIn();
getTasks();
sumbmitbtn.addEventListener("click", addTask);
