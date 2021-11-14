import { initializeApp } from 'firebase/app'
import {
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCCFNKfpLHtkkwBmCi61g8fNtqVKkM1YXk",
  authDomain: "mad9135-h2-firestore-51083.firebaseapp.com",
  projectId: "mad9135-h2-firestore-51083",
  storageBucket: "mad9135-h2-firestore-51083.appspot.com",
  messagingSenderId: "320120328915",
  appId: "1:320120328915:web:ab77c45109657218867a26",
  measurementId: "G-S6R8VX85NT"
};

//init firebase app

initializeApp(firebaseConfig)
