// Import the functions you need from the SDKs you need
import { getDatabase, set, ref } from '@firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { generateRandomAttendance } from './components/GenerateRandomAttendanceData';

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
let app = null;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.apps[0];
}

const auth = new firebase.auth();
const db = getDatabase(app);

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (role, name, position, email, password) => {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    // await db.collection("users").add({
    //     uid: user.uid,
    //     name,
    //     authProvider: "local",
    //     email
    // })
    let finishDate = new Date();
    let startDate = new Date();
    startDate.setMonth(finishDate.getMonth() - 2);
    startDate.setDate(1);

    await set(ref(db, `workers/${user.uid}`), {
        name,
        email,
        photo: "", // backend will upload photo to AWS and set the url in Firebase
        position,
        role,
        attendance: generateRandomAttendance(startDate, finishDate) // generating random attendance for last 3 month for new worker
    });
    // console.log('[inner] created!');

    return user.uid;
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