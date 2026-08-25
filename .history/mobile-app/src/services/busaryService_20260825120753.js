import { db } from "../../backend/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/firebase";
import { bursaryData } from "../data/bursaryData";

const CACHE_KEY = "cached_bursaries";

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

    // Cache bursaries
    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify(bursaries)
    );

    return bursaries;
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
    return bursaryData;
  }
}