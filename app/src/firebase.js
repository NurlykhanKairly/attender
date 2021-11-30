// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBiauEzbSB0TdwO_1VWkapQ5Mj9iCZoQE",
  authDomain: "attender-c6e24.firebaseapp.com",
  projectId: "attender-c6e24",
  storageBucket: "attender-c6e24.appspot.com",
  messagingSenderId: "237919210485",
  appId: "1:237919210485:web:21872c818ed62283ea6ebc",
  databaseURL: "https://attender-c6e24-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const auth = new firebase.auth();
const db = firebase.firestore();

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert('Successful Login!')
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout
};