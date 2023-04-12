async function checkLoggedIn() {
  const response = await fetch("http://localhost:3000/auth/cookie/status", {
    credentials: "include",
  });

  if (response.ok) {
    window.location.href = "index.html";
  } else if (response.status === 401) {
    alert("You are not logged in!");
  }
}

async function tryLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const response = await fetch("http://localhost:3000/auth/cookie/login", {
    credentials: "include",
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  checkLoggedIn();
}
checkLoggedIn();

document.body.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    tryLogin();
  }
});
