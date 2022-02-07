import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3x9DZ6afobJoD6Qg4IjgZR1VIHbgn5YA",
  authDomain: "where-is-subaru.firebaseapp.com",
  projectId: "where-is-subaru",
  storageBucket: "where-is-subaru.appspot.com",
  messagingSenderId: "90621139138",
  appId: "1:90621139138:web:b3319f98038826d5a8c35b",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
