const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const passwordField = document.getElementById("password");
const strengthText = document.getElementById("strength");

lengthSlider.addEventListener("input", () => {
    lengthValue.innerText = lengthSlider.value;
});

function generatePassword() {

    let length = lengthSlider.value;

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+";

    let chars = "";

    if (document.getElementById("uppercase").checked) chars += upper;
    if (document.getElementById("lowercase").checked) chars += lower;
    if (document.getElementById("numbers").checked) chars += numbers;
    if (document.getElementById("symbols").checked) chars += symbols;

    if (chars === "") {
        alert("Select at least one option!");
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    passwordField.value = password;

    checkStrength(password);
}

function copyPassword() {
    navigator.clipboard.writeText(passwordField.value);
    alert("Copied!");
}

function checkStrength(password) {

    let strength = "Weak";

    if (password.length >= 10) {
        strength = "Medium";
    }

    if (password.length >= 14 && /[!@#$%^&*]/.test(password)) {
        strength = "Strong";
    }

    strengthText.innerText = "Generated Password Strength: " + strength;
}

function checkUserPassword() {

    let userPass = document.getElementById("userPassword").value;

    if (userPass === "") {
        alert("Enter a password first!");
        return;
    }

    let strength = "Weak";

    if (userPass.length >= 10) {
        strength = "Medium";
    }

    if (userPass.length >= 14 && /[!@#$%^&*]/.test(userPass)) {
        strength = "Strong";
    }

    strengthText.innerText = "Password Strength: " + strength;

    if (strength === "Weak") strengthText.style.color = "red";
    else if (strength === "Medium") strengthText.style.color = "orange";
    else strengthText.style.color = "#00ff88";
}

function improvePassword() {

    let userPass = document.getElementById("userPassword").value;

    if (userPass === "") {
        alert("Enter a password first!");
        return;
    }

    let improved = userPass;

    let message = "";

    if (!/[A-Z]/.test(improved)) {
        improved += "A";
        message += "Added uppercase. ";
    }

    if (!/[0-9]/.test(improved)) {
        improved += "1";
        message += "Added number. ";
    }

    if (!/[!@#$%^&*]/.test(improved)) {
        improved += "@";
        message += "Added symbol. ";
    }

    if (improved.length < 12) {
        message += "Password is short. Increasing length. ";
        while (improved.length < 12) {
            improved += Math.random().toString(36).charAt(2);
        }
    }

    let extraChars = "!@#$ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    improved += extraChars[Math.floor(Math.random() * extraChars.length)];

    improved = improved.split('').sort(() => Math.random() - 0.5).join('');

    passwordField.value = improved;

    checkStrength(improved);

    if (message === "") {
        message = "Password was already strong. Added extra randomness.";
    }

    strengthText.innerText = message + "\nNew Password Strength: " + getStrength(improved);
}

function getStrength(password) {

    let strength = "Weak";

    if (password.length >= 10) strength = "Medium";
    if (password.length >= 14 && /[!@#$%^&*]/.test(password)) strength = "Strong";

    return strength;
}