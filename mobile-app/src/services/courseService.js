import { db } from "../../backend/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { courseData } from "../../backend/data/courseData";

const CACHE_KEY = "cached_courses";

export async function getCourses() {
  try {
    // Try Firebase
    const snapshot = await getDocs(
      collection(db, "courses_db")
    );

    const courses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Cache them
    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify(courses)
    );

    return courses;
  } catch (error) {
    console.log(
      "Firebase unavailable, using cache...",
      error
    );

    // Try cache
    const cached =
      await AsyncStorage.getItem(CACHE_KEY);

    if (cached) {
      return JSON.parse(cached);
    }

    // Last fallback
    return courseData;
  }
}