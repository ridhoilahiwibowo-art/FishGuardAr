import {
    database,
    ref,
    onValue
}
from "./firebase.js";

const historyContainer =
document.getElementById(
"historyContainer"
);

const totalRecord =
document.getElementById(
"totalRecord"
);

const historyRef =
ref(database,"history");

onValue(historyRef,(snapshot)=>{

historyContainer.innerHTML="";

const data=snapshot.val();

if(!data){

historyContainer.innerHTML=`

<div class="history-card">

<h3>Belum ada riwayat monitoring</h3>

</div>

`;

return;

}

const history=
Object.values(data);

history.reverse();

totalRecord.textContent=
"Total Record : "+history.length;

history.forEach(item=>{

const date = new Date(item.timestamp);

const waktu =
date.toLocaleString("id-ID");

const waktu=
date.toLocaleString();

historyContainer.innerHTML+=`

<div class="history-card">

<div class="history-top">

<div class="history-time">

${waktu}

</div>

<div class="history-status safe">

Monitoring

</div>

</div>

<div class="sensor-history">

<div class="sensor-box">

<h4>pH</h4>

<p>${item.ph}</p>

</div>

<div class="sensor-box">

<h4>Suhu</h4>

<p>${item.temperature}°C</p>

</div>

<div class="sensor-box">

<h4>Katup</h4>

<p>${item.valve}</p>

</div>

<div class="sensor-box">

<h4>Roof</h4>

<p>${item.roof}</p>

</div>

</div>

</div>

`;

});

});