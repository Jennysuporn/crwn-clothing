import { initializeApp } from 'firebase/app';
import { getFirestore,collection, doc, setDoc,getDoc } from "firebase/firestore"; 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA00dJEaJHIpBGR4fTx2iUuSn7RRmZVrW8",
  authDomain: "crwn-db-37846.firebaseapp.com",
  projectId: "crwn-db-37846",
  storageBucket: "crwn-db-37846.appspot.com",
  messagingSenderId: "671742510419",
  appId: "1:671742510419:web:b98a2f13372e7d437acda6",
  measurementId: "G-4NL82LKLK3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`); //Reference

  const snapShot = await getDoc(userRef); //get Document by using the reference

  if(!snapShot.exists()) {
    const { displayName, email } = userAuth;
    
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  
  return userRef;
};

const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;