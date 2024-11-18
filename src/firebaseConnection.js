import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlRWZ4f9g73MNyXWrdYi7xzXlwEKqxgog",
    authDomain: "allpote.firebaseapp.com",
    projectId: "allpote",
    storageBucket: "allpote.firebasestorage.app",
    messagingSenderId: "765940796997",
    appId: "1:765940796997:web:e79b4fec4edffaab3add2c",
    measurementId: "G-J39RZLVVV8"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth };