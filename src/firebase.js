import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDAenm-Jam1IGWIe9JVp0AR2qSxv9617-4",
  authDomain: "netflix-clone-b2cf7.firebaseapp.com",
  projectId: "netflix-clone-b2cf7",
  storageBucket: "netflix-clone-b2cf7.firebasestorage.app",
  messagingSenderId: "1049757766629",
  appId: "1:1049757766629:web:5324bd323b7ca8bb82950c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password)=> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}