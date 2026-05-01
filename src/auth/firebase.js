<<<<<<< HEAD
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
=======
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS3gfhWN8Vm6f9Qcg1F8R9YBhFYSxcZXo",
  authDomain: "matric-pathway-b38d0.firebaseapp.com",
  projectId: "matric-pathway-b38d0",
  storageBucket: "matric-pathway-b38d0.firebasestorage.app",
  messagingSenderId: "732356288177",
  appId: "1:732356288177:web:3869121d480a8fce5a0c90",
  measurementId: "G-LD43LK46GR",
};

// Initialize Firebase
<<<<<<< HEAD

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
=======
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
