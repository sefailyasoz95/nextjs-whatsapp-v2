import firebaseClient from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCdqrMPXmnN4CWXN2E2M5C7REDAhzZzp_g",
	authDomain: "messageme-app-7819f.firebaseapp.com",
	projectId: "messageme-app-7819f",
	storageBucket: "messageme-app-7819f.appspot.com",
	messagingSenderId: "311182327976",
	appId: "1:311182327976:web:822099a3b691218411829d",
};

const app = !firebaseClient.apps.length ? firebaseClient.initializeApp(firebaseConfig) : firebaseClient.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { firebaseClient, db, auth, provider };
