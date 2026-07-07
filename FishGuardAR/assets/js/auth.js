// ===========================
// AUTH GUARD
// ===========================

function checkLogin() {

    const isLoggedIn =
    localStorage.getItem(
        "isLoggedIn"
    );

    if (isLoggedIn !== "true") {

        window.location.href =
        "login.html";

    }

}

// ===========================
// LOGOUT
// ===========================

function logout() {

    const confirmLogout =
    confirm(
        "Apakah Anda yakin ingin logout?"
    );

    if (confirmLogout) {

        localStorage.removeItem(
            "isLoggedIn"
        );

        window.location.href =
        "login.html";

    }

}