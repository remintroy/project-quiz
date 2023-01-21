// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);