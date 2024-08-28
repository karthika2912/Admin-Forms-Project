// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "user-feedback-338be.firebaseapp.com",
  projectId: "user-feedback-338be",
  storageBucket: "user-feedback-338be.appspot.com",
  messagingSenderId: "1038200858899",
  appId: "1:1038200858899:web:e869c3d9a8b72aca0852e6",
  measurementId: "G-CC1CQXBSFB"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
