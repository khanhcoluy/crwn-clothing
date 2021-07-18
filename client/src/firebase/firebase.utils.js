import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyCzZFLM2RC21fEzt52G6ayVMjMKKjScso4',
	authDomain: 'crwn-clothing-db-a1822.firebaseapp.com',
	projectId: 'crwn-clothing-db-a1822',
	storageBucket: 'crwn-clothing-db-a1822.appspot.com',
	messagingSenderId: '403298708837',
	appId: '1:403298708837:web:96abbb1254998436a8458c',
	measurementId: 'G-1Z0T10QBZV'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth; //get displayName object, email object from userAuth
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
	const transformedCollections = collectionsSnapshot.docs.map((doc) => {
		const { items, title } = doc.data();

		return {
			id: doc.id,
			routeName: encodeURI(title.toLowerCase()),
			items,
			title
		};
	});

	return transformedCollections.reduce((accumulate, collection) => {
		accumulate[collection.title.toLowerCase()] = collection;
		return accumulate;
	}, {});
};

firebase.initializeApp(config);

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
