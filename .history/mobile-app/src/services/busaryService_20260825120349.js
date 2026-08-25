import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

export async function getBursaries() {
  try {
    const snapshot = await getDocs(
      collection(db, "bursaries_db")
    );

    const bursaries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("FIRESTORE BURSARIES:", bursaries);

    return bursaries;
  } catch (error) {
    console.log(
      "Failed to load bursaries from Firestore:",
      error
    );

    return [];
  }
}