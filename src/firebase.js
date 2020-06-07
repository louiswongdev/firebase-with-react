import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBhrG8xeBA7chJVqfuQzckO8eD3HzupafM',
  authDomain: 'think-piece-live2.firebaseapp.com',
  databaseURL: 'https://think-piece-live2.firebaseio.com',
  projectId: 'think-piece-live2',
  storageBucket: 'think-piece-live2.appspot.com',
  messagingSenderId: '871030870059',
  appId: '1:871030870059:web:129002d5f3fb559b7fda6e',
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// signout
export const signOut = () => auth.signOut();

//  Create documents for user profiles in Cloud Firestore.
export const createUserProfileDocument = async (user, additionalData) => {
  // If there is no user, let's not do this.
  if (!user) return;

  // Get a reference to the location in the Firestore where the user
  // document may or may not exist.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch a document from that location.
  const snapshot = await userRef.get();

  // If there isn't a document for that user. Let's use information
  // that we got from either Google or our sign up form.
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.error('Error creating user', err);
    }
  }

  // Get the document and return it, since that's what we're
  // likely to want to do next.
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('users').doc(uid).get();

    return { uid, ...userDocument.data() };
    // obj returned something like this:
    // {uid: "B9JT9gOnsDa9oZ48prpTw3VnZSI2", createdAt: t, email: "billyg@gmail.com", photoURL: null, displayName: "billyG"}
  } catch (err) {
    console.error('Error fetching user', err.message);
  }
};

window.firebase = firebase;

export default firebase;
