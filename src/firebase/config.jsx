
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore' //professor que incluiu esse!

const firebaseConfig = {
  apiKey: "AIzaSyBceJhXRfyBLxoij_OTy2ikVSSAteNIIBk",
  authDomain: "miniblog-8382f.firebaseapp.com",
  projectId: "miniblog-8382f",
  storageBucket: "miniblog-8382f.firebasestorage.app",
  messagingSenderId: "476379116825",
  appId: "1:476379116825:web:f7b7736f5397c7ce070188"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app) //professor que incluiu esse!

export {db}//professor que incluiu esse!