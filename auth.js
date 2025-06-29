document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");

  
  const existingUser = JSON.parse(localStorage.getItem("userData"));
  if (existingUser?.name && existingUser?.dob) {
    window.location.href = "index.html";
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;

    if (!name || !dob) {
      showError("Please fill in all fields.");
      return;
    }

    const age = calculateAge(new Date(dob));
    if (age < 10) {
      showError("You must be at least 10 years old.");
      return;
    }


    const pic = prompt("Paste an image URL for your profile picture (optional):");

    
    localStorage.setItem("userData", JSON.stringify({ name, dob, pic }));
    window.location.href = "index.html";
  });

  function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    errorMsg.style.color = "#ff4c4c";
  }
});
