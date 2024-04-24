import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCdNEr30D9kunZ1w94OlE7-IrIaCCnsPXA",
  authDomain: "students-b8f5c.firebaseapp.com",
  projectId: "students-b8f5c",
  storageBucket: "students-b8f5c.appspot.com",
  messagingSenderId: "638945594812",
  appId: "1:638945594812:web:f84745919d2b52658a6fb9",
  databaseURL: "https://students-b8f5c-default-rtdb.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default database;
