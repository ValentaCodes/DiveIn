const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/renter/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector("#firstName-signup").value.trim();
  const last_name = document.querySelector("#lastName-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (first_name && last_name && email && username && password) {
    const response = await fetch("/api/renter", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
