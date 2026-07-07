// ===============================
// CHECK SESSION
// ===============================

if(

localStorage.getItem(
"isLoggedIn"
)==="true"

){

    window.location.href =
    "index.html";

}

// ================================
// ELEMENT
// ================================

const email =
document.getElementById("email");

const password =
document.getElementById("password");

const loginButton =
document.getElementById("loginButton");

const loginMessage =
document.getElementById("loginMessage");

const togglePassword =
document.getElementById("togglePassword");

const remember =
document.getElementById("remember");

// ================================
// REMEMBER ME
// ================================

window.onload = () => {

    const savedEmail =
    localStorage.getItem("savedEmail");

    if(savedEmail){

        email.value = savedEmail;

        remember.checked = true;

    }

};

// ================================
// SHOW PASSWORD
// ================================

togglePassword.onclick = () => {

    if(password.type === "password"){

        password.type = "text";

        togglePassword.textContent =
        "🙈";

    }

    else{

        password.type = "password";

        togglePassword.textContent =
        "👁";

    }

};

// ================================
// LOGIN
// ================================

loginButton.onclick = () => {

    loginMessage.style.color =
    "#0B2D5C";

    loginMessage.textContent =
    "Authenticating...";

    setTimeout(() => {

        if(

            email.value ===
            "admin@fishguard.com"

            &&

            password.value ===
            "12345678"

        ){

            if(remember.checked){

                localStorage.setItem(

                    "savedEmail",

                    email.value

                );

            }

            else{

                localStorage.removeItem(

                    "savedEmail"

                );

            }

            // Simpan status login

localStorage.setItem(

    "isLoggedIn",

    "true"

);

// Masuk Dashboard

window.location.href =
"index.html";

        }

        else{

            loginMessage.style.color =
            "red";

            loginMessage.textContent =
            "Email atau Password salah.";

        }

    },1000);

};