// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8k4BhQ7Z0LSql8AhHF03VkDFmz26i28M",
  authDomain: "chattingapplication-aa97e.firebaseapp.com",
  databaseURL: "https://chattingapplication-aa97e-default-rtdb.firebaseio.com",
  projectId: "chattingapplication-aa97e",
  storageBucket: "chattingapplication-aa97e.firebasestorage.app",
  messagingSenderId: "115628415627",
  appId: "1:115628415627:web:0e34bec48e6d2a47a7528e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;