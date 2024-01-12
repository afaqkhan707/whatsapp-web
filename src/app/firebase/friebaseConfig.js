import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseInit';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// auth.languageCode = 'eng';
// auth.languageCode = 'it';
const db = getFirestore(app);
const storage = getStorage(app);
const googleAuthSignin = new GoogleAuthProvider();

export {
  auth,
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  onAuthStateChanged,
  doc,
  setDoc,
  onSnapshot,
  signOut,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  signInWithPopup,
  googleAuthSignin,
};
