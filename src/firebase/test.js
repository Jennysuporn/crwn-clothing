import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
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
const firestore = getFirestore(app);

//First way
firestore.collection('users').getDocs('cPQCgA1nc3S9I8lAOgLA').collection('cartItems').getDocs('0sed7e4cdcbdon2TfP54')
// Second way
firestore.doc('/users/cPQCgA1nc3S9I8lAOgLA/cartItems/0sed7e4cdcbdon2TfP54');
// Third way
firestore.collection('/users/cPQCgA1nc3S9I8lAOgLA/cartItems');