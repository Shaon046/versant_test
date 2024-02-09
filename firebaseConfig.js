
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbfezkqsf9KZv05sBWxXzfuy4wzgYDTbQ",
  authDomain: "versant-23b0f.firebaseapp.com",
  projectId: "versant-23b0f",
  storageBucket: "versant-23b0f.appspot.com",
  messagingSenderId: "379837158271",
  appId: "1:379837158271:web:3fed21fe3754e0a196404a",
  measurementId: "G-HVK1ZBNJS3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)

export {db}