import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCzZFLM2RC21fEzt52G6ayVMjMKKjScso4",
    authDomain: "crwn-clothing-db-a1822.firebaseapp.com",
    projectId: "crwn-clothing-db-a1822",
    storageBucket: "crwn-clothing-db-a1822.appspot.com",
    messagingSenderId: "403298708837",
    appId: "1:403298708837:web:96abbb1254998436a8458c",
    measurementId: "G-1Z0T10QBZV"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth; //get displayName object, email object from userAuth
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 