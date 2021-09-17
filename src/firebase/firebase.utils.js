import { initializeApp } from 'firebase/app';
import { getFirestore,collection, doc, setDoc,getDoc,getDocs } from "firebase/firestore"; 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { writeBatch } from '@firebase/firestore';
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
export const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`); //Reference
  const collectionRef = collection(db, 'users'); //Reference

  const snapShot = await getDoc(userRef); //get Document by using the reference
  const collectionSnapshot = await getDocs(collectionRef);
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data)});

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


//one of functions that help to automatically create collection and documents to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);   //let firestore set the collection ref for us 
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

//one of functions that help to automatically create collection and documents to firestore
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()), //convert a string to the string that URL can handle it. It makes sure to convert them into a version that the user can actually read.
        id: doc.id,
        title,
        items
      };
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    } , {})
};

const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;