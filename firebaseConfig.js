import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDlq5kZAv7VGAib1joSORz1Ubo9aPOVk3o",
    authDomain: "streamvista-7322c.firebaseapp.com",
    projectId: "streamvista-7322c",
    storageBucket: "streamvista-7322c.appspot.com",
    messagingSenderId: "272762322069",
    appId: "1:272762322069:web:059c5b03d677e3170a6f9c",
    measurementId: "G-RHJ16PYDY3"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);