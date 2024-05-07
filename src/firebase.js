import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBk5t5EVOpqIFMrqqft_G2ML8xRh8xsEHw",
  authDomain: "fir-form-8026e.firebaseapp.com",
  databaseURL: "https://fir-form-8026e-default-rtdb.firebaseio.com",
  projectId: "fir-form-8026e",
  storageBucket: "fir-form-8026e.appspot.com",
  messagingSenderId: "315865173774",
  appId: "1:315865173774:web:09b429920bb1b22757115f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

export { auth, database };
