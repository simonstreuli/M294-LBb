const title = document.getElementById("task");
const caption = document.getElementById("caption");
async function getTask(id) {
  if (id === null) {
    return;
  }
  const response = await fetch("http://localhost:3000/task/" + id, {
    method: "GET",
    credentials: "include",
  });
  const task = await response.json();
  caption.innerText = "Selected Task: ";
  title.innerText = task.title ? task.title : "ID not found";
}
const queryParams = new URLSearchParams(window.location.search);

getTask(queryParams.get("id"));
