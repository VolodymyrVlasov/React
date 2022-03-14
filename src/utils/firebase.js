import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signInWithPopup,
    signOut
} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDyNZaBaKrHMOeSJk1zrxxjkIanVkkt_Og",
    authDomain: "paperfoxorders-c3e9e.firebaseapp.com",
    projectId: "paperfoxorders-c3e9e",
    storageBucket: "paperfoxorders-c3e9e.appspot.com",
    messagingSenderId: "765927901688",
    appId: "1:765927901688:web:9603024e49879bbcbfee0d",
    measurementId: "G-V9NFFPLGDD"
}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth()

export const createUserWithEmailPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password)

export const signInWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password)

export const sendPasswordResetEmail = (email) => sendPasswordResetEmail(auth, email)

export const logOut = () => signOut(auth)

export const signInWithGoogle = () => {
    return signInWithRedirect(auth, new GoogleAuthProvider())
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
        }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}



