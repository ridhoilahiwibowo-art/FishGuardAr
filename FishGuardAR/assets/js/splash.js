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

// ===============================
// SPLASH
// ===============================

setTimeout(()=>{

    window.location.href =
    "login.html";

},2500);