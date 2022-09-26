// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore, collection, onSnapshot, setDoc,doc} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"
const btn = document.getElementById("btnEnviar")
const name = document.getElementById("name")


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC88lb-m7gAy4-8TZ6nFN0YkzORAineYFA",
  authDomain: "sistema-inventario-283.firebaseapp.com",
  projectId: "sistema-inventario-283",
  storageBucket: "sistema-inventario-283.appspot.com",
  messagingSenderId: "250423163243",
  appId: "1:250423163243:web:d9a08f028987044ee8342e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


  const db = getFirestore(app);
  

  export const getProducts = (callback) => onSnapshot(collection(db,"entrada"), callback);

  
export const sendProduct = async (product) => await setDoc(doc(db,'entrada',`${name.value}`),product);

  // export const prueba = () => console.log('Prueba');


// sirve
  // await setDoc(doc(db, "products","nuevoDato"), {
  //   name: "prueba2",
  //   state: "CA",
  //   country: "USA"
  // });
  