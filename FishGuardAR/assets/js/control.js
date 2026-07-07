import {
    database,
    ref,
    onValue
} from "./firebase.js";

import {
    set
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const valveSwitch =
document.getElementById(
    "valveSwitch"
);

const valveStatus =
document.getElementById(
    "valveStatus"
);

const valveAuto =
document.getElementById(
    "valveAuto"
);

const valveManual =
document.getElementById(
    "valveManual"
);

const roofSwitch =
document.getElementById(
    "roofSwitch"
);

const roofStatus =
document.getElementById(
    "roofStatus"
);

const roofAuto =
document.getElementById(
    "roofAuto"
);

const roofManual =
document.getElementById(
    "roofManual"
);

// ==============================
// DEFAULT MODE
// ==============================

valveAuto.checked = true;
roofAuto.checked = true;

valveSwitch.disabled = true;
roofSwitch.disabled = true;

// LOAD SENSOR DATA
function loadControl(){

const dbRef = ref(database);

onValue(dbRef, (snapshot)=>{

const data = snapshot.val();

if(!data) return;

        const temp =
        data.sensor.suhu;

        const ph =
        data.sensor.ph;

        const valve =
        data.status.flush;

        const roof =
        data.status.roof;
        
// ==============================
// STATUS ROOF DARI FIREBASE
// ==============================

if(roof == "OPEN"){

    roofSwitch.checked = true;

    roofStatus.textContent =
    "Roof OPEN";

}
else{

    roofSwitch.checked = false;

    roofStatus.textContent =
    "Roof CLOSED";

}

// ==============================
// STATUS VALVE DARI FIREBASE
// ==============================

if(valve){

    valveSwitch.checked = true;

    valveStatus.textContent =
    "Katup ON";

}
else{

    valveSwitch.checked = false;

    valveStatus.textContent =
    "Katup OFF";

}

    });
    }

// ==============================
// MODE KATUP OTOMATIS
// ==============================

valveAuto.addEventListener(
"change",
function(){

    valveSwitch.disabled = true;

    valveStatus.textContent =
    "Monitoring pH";

    sendCommand(
        "/command/valve_mode",
        "AUTO"
    );

}
);

valveManual.addEventListener(
"change",
function(){

    valveSwitch.disabled = false;

    valveStatus.textContent =
    "Mode Manual";

    sendCommand(
        "/command/valve_mode",
        "MANUAL"
    );

}
);

// ==============================
// SWITCH VALVE
// ==============================

valveSwitch.addEventListener(
    "change",
    function(){

        if(valveSwitch.checked){

            sendCommand(
                "/command/flush",
                true
            );

        }
        else{

            sendCommand(
                "/command/flush",
                false
            );

        }

    }
);

// ==============================
// MODE AUTO ROOF
// ==============================

roofAuto.addEventListener(
"change",
function(){

    roofSwitch.disabled = true;

    roofStatus.textContent =
    "Monitoring Suhu";

    sendCommand(
        "/command/roof_mode",
        "AUTO"
    );

}
);

// ==============================
// MODE ROOF
// ==============================

roofManual.addEventListener(
"change",
function(){

    roofSwitch.disabled = false;

    roofStatus.textContent =
    "Mode Manual";

    sendCommand(
        "/command/roof_mode",
        "MANUAL"
    );

}
);

// ==============================
// SWITCH ROOF MANUAL
// ==============================

roofSwitch.addEventListener(
    "change",
    function(){

        if(roofSwitch.checked){

            sendCommand(
                "/command/roof",
                "OPEN"
            );

        }
        else{

            sendCommand(
                "/command/roof",
                "CLOSED"
            );

        }

    }
);

// ==============================
// KIRIM COMMAND KE FIREBASE
// ==============================

function sendCommand(path, value){

    set(
        ref(database, path),
        value
    );

}
loadControl();