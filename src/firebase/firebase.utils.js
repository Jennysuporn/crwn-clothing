import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
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

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
// provider.addScope('profile');
// provider.addScope('email');


//1st custom version
// const provider = new GoogleAuthProvider();
// const auth = getAuth();
// export const signInWithGoogle = () => signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });



//Udemy.
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// const config = {
    // apiKey: "AIzaSyA00dJEaJHIpBGR4fTx2iUuSn7RRmZVrW8",
    // authDomain: "crwn-db-37846.firebaseapp.com",
    // projectId: "crwn-db-37846",
    // storageBucket: "crwn-db-37846.appspot.com",
    // messagingSenderId: "671742510419",
    // appId: "1:671742510419:web:b98a2f13372e7d437acda6",
    // measurementId: "G-4NL82LKLK3"
// };

// firebase.initializeApp(config);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider(); //this gives us access to this new google auth provider class from the authentication library
// provider.setCustomParameters({ prompt: 'select_amount' }); //we want to always trigger the Google popup whenever we use this Google auth provider for authentication and sign in
// export const signInWithGoogle = () => auth.signInWithPopup(provider); //signInWithPopup() = This is equal to sign in with popup because sign in with pop up takes this provider class that we made, but it takes it for many different types of pop up

export default app;