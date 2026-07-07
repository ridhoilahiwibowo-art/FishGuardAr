// Firebase SDK
import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue
} from
"https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// Config Firebase
const firebaseConfig = {

  apiKey: "AIzaSyA7GAdzlSG6kbKH43FTZY6AL47vMU4ibbo",

  authDomain:
  "fish-guard-ar.firebaseapp.com",

  databaseURL:
  "https://fish-guard-ar-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId:
  "fish-guard-ar",

  storageBucket:
  "fish-guard-ar.firebasestorage.app",

  messagingSenderId:
  "882621580426",

  appId:
  "1:882621580426:web:9501ddae59bd718c075973"
};

// Inisialisasi
const app =
initializeApp(firebaseConfig);

export const database =
getDatabase(app);

export {
  ref,
  onValue
};