<!-- script.js -->
const approvedUsers = [
    "seankerr@novawerke.ai", "dkerr14@jh.edu", "qiuhaoalex@gmail.com",
    "csnelli1@jh.edu", "ctighe4@jh.edu", "ltesta1@jh.edu",
    "lmirele2@jh.edu", "michelevanzaldua@gmail.com", "snellingstephen91@gmail.com",
    "nburton8@jh.edu", "rchin7@jh.edu", "sstein28@jh.edu",
    "mtorre44@jh.edu", "mattwalter35@gmail.com"
];

let users = JSON.parse(localStorage.getItem("users")) || {};

function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!approvedUsers.includes(email)) {
        document.getElementById("message").innerText = "❌ Access Denied: You are not an approved user.";
        return;
    }

    if (!users[email]) {
        users[email] = password; // First-time login sets the password
        localStorage.setItem("users", JSON.stringify(users));
        alert("✅ Password set successfully! You can now log in.");
    }

    if (users[email] === password) {
        localStorage.setItem("loggedInUser", email);
        window.location.href = "developer.html";
    } else {
        document.getElementById("message").innerText = "❌ Incorrect password.";
    }
}

function resetPassword() {
    const email = prompt("Enter your registered email:");
    if (!approvedUsers.includes(email)) {
        alert("❌ Email not found in system. You are not an approved user.");
        return;
    }

    const newPassword = prompt("Enter new password:");
    if (newPassword) {
        users[email] = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("✅ Password successfully updated! You can now log in with your new password.");
    }
}

function launchColab() {
    const colabURL = "https://colab.research.google.com/#create=true&language=python";
    
    // Attempt to open in a new tab
    let newTab = window.open("", "_blank");
    
    if (newTab) {
        newTab.location = colabURL;
    } else {
        alert("🔒 Pop-up blocked! Please allow pop-ups for this site.");
    }
}


window.onload = function () {
    const userEmail = localStorage.getItem("loggedInUser");
    if (userEmail && document.getElementById("userEmail")) {
        document.getElementById("userEmail").innerText = userEmail;
    }

    if (!userEmail && window.location.pathname.includes("developer.html")) {
        window.location.href = "login.html";
    }
};

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
