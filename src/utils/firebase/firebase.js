import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup ,GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

const Firebase = (function() {
    let app = initializeApp(firebaseConfig),
        auth = getAuth(app)

    const getCreateUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const getSignInWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const getOnAuthStateChanged = (cb) => onAuthStateChanged(auth, cb)
    const doSignOut = () => signOut(auth)
    const getSignInWithPopup = () => signInWithPopup(auth, new GoogleAuthProvider())
        .then((res) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(res)
            // const token = credential.accessToken

            // return signed-in user info.
            return res.user

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code, // error code.
                errorMessage = error.message, // error message.
                email = error.customData.email, // The email of the user's account used.
                credential = GoogleAuthProvider.credentialFromError(error)// The AuthCredential type that was used.
                console.error({ errorCode, errorMessage, email, credential})
        })
    
    return {
        getCreateUserWithEmailAndPassword: getCreateUserWithEmailAndPassword,
        getSignInWithEmailAndPassword: getSignInWithEmailAndPassword,
        getSignInWithPopup: getSignInWithPopup,
        getOnAuthStateChanged: getOnAuthStateChanged,
        doSignOut: doSignOut
    }
}())

export default Firebase