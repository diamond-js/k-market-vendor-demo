// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_AvAVmetcrILboVw5F3m373SupO666Gg",
  authDomain: "k-market-vendor-demo.firebaseapp.com",
  projectId: "k-market-vendor-demo",
  storageBucket: "k-market-vendor-demo.appspot.com",
  messagingSenderId: "605845535346",
  appId: "1:605845535346:web:afa3fb340457d94158e0eb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
