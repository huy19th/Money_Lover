import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDF7hKb0cf3LM4SZAmYZ_sD7SRrES2dUjc",
    authDomain: "case-md5-46ad6.firebaseapp.com",
    projectId: "case-md5-46ad6",
    storageBucket: "case-md5-46ad6.appspot.com",
    messagingSenderId: "360121200930",
    appId: "1:360121200930:web:6ef01d312b9310035b757b",
    measurementId: "G-QD89H30CKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;