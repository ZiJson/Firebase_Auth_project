import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCNreVksf-3kA9-Ew02zqLjLLD0_6HkLm4",

  authDomain: "interntest-dd4f1.firebaseapp.com",

  projectId: "interntest-dd4f1",

  storageBucket: "interntest-dd4f1.appspot.com",

  messagingSenderId: "779177665630",

  appId: "1:779177665630:web:a3eb1755d7f51dff8f00cf",

  measurementId: "G-8PT5NN93GZ"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);