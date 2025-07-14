// src/firebase.js (vagy ahol a Firebase-t inicializálod)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Ezt se feledd importálni!

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,           // <-- ÍGY KELL LENNIE!
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,   // <-- ÍGY KELL LENNIE!
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,     // <-- ÍGY KELL LENNIE!
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Inicializálás
const app = initializeApp(firebaseConfig);

// Firestore inicializálása és exportálása
const db = getFirestore(app);
export { db };