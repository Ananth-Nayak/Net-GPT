// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdbADMQEkZbuCGM19W_-sAYUq5iH8nNOA",
  authDomain: "netgpt-fb39f.firebaseapp.com",
  projectId: "netgpt-fb39f",
  storageBucket: "netgpt-fb39f.appspot.com",
  messagingSenderId: "743273590440",
  appId: "1:743273590440:web:8f9a3b4376bcbf9e461c9d",
  measurementId: "G-ZKK5RYC2TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//getAuth needed in every authentication process so we write it here and export it
export const auth=getAuth();