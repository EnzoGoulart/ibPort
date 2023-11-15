import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA-g-uHDvaIhjRN0nc9m_CEu2iOW7X4wAY",
  authDomain: "ingressosbaratos-5107c.firebaseapp.com",
  projectId: "ingressosbaratos-5107c",
  storageBucket: "ingressosbaratos-5107c.appspot.com",
  messagingSenderId: "609866954576",
  appId: "1:609866954576:web:f8c88cadac98aa7d5b5e55",
  measurementId: "G-6KRNJLX5V1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)
export { db, auth, storage };