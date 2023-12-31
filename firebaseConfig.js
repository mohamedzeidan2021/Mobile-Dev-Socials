import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDWwseOPbiwGNtwSsKF3sTooSfrNOSK3wg",
    authDomain: "mdb-socials-react-native-cc6bb.firebaseapp.com",
    projectId: "mdb-socials-react-native-cc6bb",
    storageBucket: "mdb-socials-react-native-cc6bb.appspot.com",
    messagingSenderId: "581793119238",
    appId: "1:581793119238:web:8571ff6ba65309d3a65787",
    measurementId: "G-KKQ1VG729S"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const db = getFirestore(app);