import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCXBzq7EnkP_l0DgHWfAz-HskeiMu6YY20",
  authDomain: "promoterscore-14480.firebaseapp.com",
  projectId: "promoterscore-14480",
  storageBucket: "promoterscore-14480.appspot.com",
  messagingSenderId: "418295746574",
  appId: "1:418295746574:web:d9f6a7c1d9c2ae4c9dac5f",
  measurementId: "G-4CCRTNYXDN",
};

export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
