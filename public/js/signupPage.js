const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  console.log("its working");
  if (username && email && password) {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      document.location.replace("/dashboard");
    } else {
      const error = await response.json();
      alert(error.message || response.statusText);
    }
  }

  document
    .querySelector("#signup")
    .addEventListener("click", signupFormHandler);
};
