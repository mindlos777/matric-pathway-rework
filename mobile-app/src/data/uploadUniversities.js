import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { universities } from "../data/universityData";

const uploadUniversities = async () => {
  try {
    for (const uni of universities) {
      await addDoc(
        collection(db, "universities_db"),
        {
          ...uni,

          opensAt: "2026-04-01",
          closesAt: "2026-09-30",
        }
      );
    }

    console.log("Universities uploaded");
  } catch (err) {
    console.log(err);
  }
};

uploadUniversities();