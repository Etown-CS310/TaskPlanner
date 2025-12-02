import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

const firebaseConfig = Constants.expoConfig.extra.firebase;

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };