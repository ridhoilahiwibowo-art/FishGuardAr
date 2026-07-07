const themeSelect =
document.getElementById(
    "themeSelect"
);

const notificationSelect =
document.getElementById(
    "notificationSelect"
);

const saveButton =
document.getElementById(
    "saveSettings"
);

const pondName =
document.getElementById(
    "pondName"
);

const feedingSchedule =
document.getElementById(
    "feedingSchedule"
);

const deviceStatus =
document.getElementById(
    "deviceStatus"
);

const monitorStatus =
document.getElementById(
    "monitorStatus"
);

// LOAD SYSTEM DATA

fetch("data/dummy.json")

.then(response => response.json())

.then(data => {

    pondName.textContent =
    data.pond_name;

    feedingSchedule.innerHTML = "";

    data.feeding_schedule.forEach(time => {

        feedingSchedule.innerHTML +=
        `<span>${time} WIB</span>`;

    });

    if(data.device_status === "online"){

        deviceStatus.textContent =
        "ESP32 Connected";

    }else{

        deviceStatus.textContent =
        "ESP32 Offline";

    }

    monitorStatus.textContent =
    "Monitoring Aktif";

});

// LOAD SETTINGS
const savedTheme =
localStorage.getItem(
    "theme"
);

if(savedTheme ===
"light"){

    document.body.classList.add(
        "light-mode"
    );
}

const savedNotification =
localStorage.getItem(
    "notification"
);


if(savedTheme){

    themeSelect.value =
    savedTheme;

    if(savedTheme ===
    "light"){

        document.body.classList.add(
            "light-mode"
        );
    }
}

if(savedNotification){

    notificationSelect.value =
    savedNotification;
}


// SAVE SETTINGS
saveButton.addEventListener(
"click", () => {

    localStorage.setItem(
        "theme",
        themeSelect.value
    );

    localStorage.setItem(
        "notification",
        notificationSelect.value
    );

    if(themeSelect.value ===
"light"){

    document.body.classList.add(
        "light-mode"
    );

}else{

    document.body.classList.remove(
        "light-mode"
    );
}

    alert(
        "Settings berhasil disimpan"
    );

});

// LOGOUT

const logoutButton =
document.getElementById(
    "logoutButton"
);

logoutButton.addEventListener(
"click", () => {

    logout();

});