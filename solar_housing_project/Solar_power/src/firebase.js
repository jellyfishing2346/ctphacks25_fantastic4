import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAqW1A_Ks4ux7xLTy_OGOobcEvK3m1mC6Y",
    authDomain: "solar-housing.firebaseapp.com",
    projectId: "solar-housing",
    storageBucket: "solar-housing.firebasestorage.app",
    messagingSenderId: "1006558240339",
    appId: "1:1006558240339:web:5279770370e407cebff0a6",
    measurementId: "G-TSV7DXRQQ9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);