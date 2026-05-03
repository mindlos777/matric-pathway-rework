import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS3gfhWN8Vm6f9Qcg1F8R9YBhFYSxcZXo",
  authDomain: "matric-pathway-b38d0.firebaseapp.com",
  projectId: "matric-pathway-b38d0",
  storageBucket: "matric-pathway-b38d0.firebasestorage.app",
  messagingSenderId: "732356288177",
  appId: "1:732356288177:web:3869121d480a8fce5a0c90",
  measurementId: "G-LD43LK46GR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);