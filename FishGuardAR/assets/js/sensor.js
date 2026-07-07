import {
    database,
    ref,
    onValue
}
from "./firebase.js";

let lastWarning =
"none";

// SENSOR VALUE
const phValue =
document.getElementById("phValue");

const tempValue =
document.getElementById("tempValue");

// SENSOR STATUS
const phStatus =
document.getElementById("phStatus");

const tempStatus =
document.getElementById("tempStatus");

// ACTUATOR
const valveIndicator =
document.getElementById("valveIndicator");

const roofIndicator =
document.getElementById("roofIndicator");

const feederStatus =
document.getElementById(
    "feederStatus"
);

const feederTime =
document.getElementById(
    "feederTime"
);

const deviceStatus =
document.getElementById(
    "deviceStatus"
);

const pondName =
document.getElementById(
    "pondName"
);

const lastUpdate =
document.getElementById(
    "lastUpdate"
);

const warningBox =
document.getElementById(
    "warningBox"
);

const warningTitle =
document.getElementById(
    "warningTitle"
);

const warningText =
document.getElementById(
    "warningText"
);

// LOAD DATA
function loadSensor(){

const dbRef = ref(database);

onValue(dbRef, (snapshot) => {

const data = snapshot.val();

if(!data) return;

    const ph = data.sensor.ph;
    const temp = data.sensor.suhu;
    // const feedingSchedule = data.feeding_schedule;
    // const feedingStatus = data.feeding_status;
    const device =
    data.device_status;
    // const pond = data.pond_name;

    // POND NAME
    pondName.textContent =
    "Fish Guard AR";

    // LAST UPDATE
    const now =
    new Date();

    lastUpdate.textContent =
    "Last Update: " +
    now.toLocaleTimeString(
    "id-ID"
    );

// PH
phValue.textContent = ph;

if(ph > 6.5 && ph < 8.5){

    phStatus.textContent =
    "Normal";

    valveIndicator.textContent =
    "OFF";

    valveIndicator.classList.remove(
        "on"
    );

    valveIndicator.classList.add(
        "off"
    );

}

else if(ph <= 6.5){

    phStatus.textContent =
    "Terlalu Rendah";

    valveIndicator.textContent =
    "ON";

    valveIndicator.classList.remove(
        "off"
    );

    valveIndicator.classList.add(
        "on"
    );

}

else{

    phStatus.textContent =
    "Terlalu Tinggi";

    valveIndicator.textContent =
    "ON";

    valveIndicator.classList.remove(
        "off"
    );

    valveIndicator.classList.add(
        "on"
    );

}

    // TEMPERATURE
    tempValue.textContent =
    temp + "°C";

    if(temp >= 32){

        tempStatus.textContent =
        "Panas Tinggi";

        roofIndicator.textContent =
        "ON";

        roofIndicator.classList.remove(
            "off"
        );

        roofIndicator.classList.add(
            "on"
        );

    }

    else if(temp >= 29){

        tempStatus.textContent =
        "Warning";
    }

    else if(temp <= 28){

        tempStatus.textContent =
        "Optimal";

        roofIndicator.textContent =
        "OFF";

        roofIndicator.classList.remove(
            "on"
        );

        roofIndicator.classList.add(
            "off"
        );
    }

// FEEDER
feederStatus.textContent =
"Standby";

feederTime.textContent =
"Next: --:--";

// DEVICE STATUS
if(device ===
"online"){

    deviceStatus.textContent =
    "🟢 Connected";

}else{

    deviceStatus.textContent =
    "🔴 Offline";
}

// WARNING SYSTEM

warningBox.classList.remove(
    "hidden"
);

warningTitle.textContent =
"Monitoring Aman";

warningText.textContent =
"Tidak ada warning";


// SUHU KRITIS
if(temp >= 32){

    warningTitle.textContent =
    "⚠ Suhu Terlalu Tinggi";

    warningText.textContent =
    "Auto Roof dibuka otomatis";

    const notification =
    localStorage.getItem(
        "notification"
    );

    if(notification !==
    "off" &&
    lastWarning !==
    "temperature"){

        lastWarning =
        "temperature";

        alert(
            "⚠ WARNING\n\nSuhu Terlalu Tinggi!\nAuto Roof dibuka otomatis"
        );
    }
}

// PH TERLALU RENDAH
else if(ph <= 6.5){

    warningTitle.textContent =
    "⚠ pH Terlalu Rendah";

    warningText.textContent =
    "Katup Otomatis aktif untuk melakukan pergantian sebagian air.";

    const notification =
    localStorage.getItem(
        "notification"
    );

    if(notification !==
    "off" &&
    lastWarning !==
    "phLow"){

        lastWarning =
        "phLow";

        alert(
        "⚠ WARNING\n\npH Terlalu Rendah!\nKatup Otomatis aktif untuk melakukan pergantian sebagian air."
        );
    }
}


// PH TERLALU TINGGI
else if(ph >= 8.5){

    warningTitle.textContent =
    "⚠ pH Terlalu Tinggi";

    warningText.textContent =
    "Katup Otomatis aktif untuk melakukan pergantian sebagian air.";

    const notification =
    localStorage.getItem(
        "notification"
    );

    if(notification !==
    "off" &&
    lastWarning !==
    "phHigh"){

        lastWarning =
        "phHigh";

        alert(
        "⚠ WARNING\n\npH Terlalu Tinggi!\nKatup Otomatis aktif untuk melakukan pergantian sebagian air."
        );
    }
}


// NORMAL
else{

    lastWarning =
    "none";
}

});

}

loadSensor();