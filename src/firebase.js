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

window.firebase = firebase;

export default firebase;
