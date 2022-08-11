import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

class Firebase { 
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
    }
    
    getCreateUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(this.auth, email, password);
    getSignInWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(this.auth, email, password);
    getOnAuthStateChanged = (cb) => onAuthStateChanged(this.auth, cb);
    doSignOut = () => signOut(this.auth);
}

export default Firebase;