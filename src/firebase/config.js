import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBizB3D63UV_BTVbHA4z80rr9Y-fLtA13k",
  authDomain: "mymoney-f4c53.firebaseapp.com",
  projectId: "mymoney-f4c53",
  storageBucket: "mymoney-f4c53.appspot.com",
  messagingSenderId: "12852635316",
  appId: "1:12852635316:web:cf6d6353c3bac0872559e1",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
