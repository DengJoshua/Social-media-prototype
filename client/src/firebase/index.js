import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRc5oukTt1T_fpThrk7L-5s4eFZLlh9II",
  authDomain: "tweetflash-d5629.firebaseapp.com",
  databaseURL: "https://tweetflash-d5629.firebaseio.com",
  projectId: "tweetflash-d5629",
  storageBucket: "tweetflash-d5629.appspot.com",
  messagingSenderId: "860946151994",
  appId: "1:860946151994:web:0a0d04e5acb332ff7bd303",
  measurementId: "G-7HPKNQGNZF",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
