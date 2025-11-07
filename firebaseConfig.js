import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


import Constants from "expo-constants";

const firebaseConfig = Constants.expoConfig.extra.firebase;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };