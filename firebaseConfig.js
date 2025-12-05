import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

const firebaseConfig = Constants.expoConfig.extra.firebase;

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let auth;
try {
    auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch (err) {
    auth = getAuth(app);
    console.log("Auth already initialized");
}

const db = getFirestore(app);

export { app, auth, db };