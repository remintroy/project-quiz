// Firebase sdk's and app
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

// configurations
const firebaseConfig = {
    apiKey: "AIzaSyA9QCNPHnJxs1mIQ8iWec6atvrLZCOBmjU",
    authDomain: "team-quiz-bro.firebaseapp.com",
    projectId: "team-quiz-bro",
    storageBucket: "team-quiz-bro.appspot.com",
    messagingSenderId: "554034949242",
    appId: "1:554034949242:web:e36f96a4429b7b53c45fc3",
    measurementId: "G-CZCM7P9N99"
};

// Initialize Firebase
export const appConfig = initializeApp(firebaseConfig);
export const authConfig = getAuth(appConfig);

// eslint-disable-next-line
const analytics = getAnalytics(appConfig);