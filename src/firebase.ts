// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD37WbVHIwiMCdkNATErZBL3PAa79a3yPo",
  authDomain: "bandmate-a597b.firebaseapp.com",
  projectId: "bandmate-a597b",
  storageBucket: "bandmate-a597b.appspot.com",
  messagingSenderId: "451050015757",
  appId: "1:451050015757:web:f1c5c04d9ab02a80ec1944",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

//exports
export const firestore = getFirestore(firebase);
export const auth = getAuth(firebase);
export const storage = getStorage(firebase);
export default firebase;
