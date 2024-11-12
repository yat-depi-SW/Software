import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBYUMkDq2mMT60HQklX77TtqKhAg0MvQEU",
  authDomain: "chat-app-js-81089.firebaseapp.com",
  projectId: "chat-app-js-81089",
  storageBucket: "chat-app-js-81089.appspot.com",
  messagingSenderId: "225968962551",
  appId: "1:225968962551:web:1fd86af6ce9b078e1d4cf2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    // Validate email format
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Trim email before sending to Firebase
    const trimmedEmail = email.trim();

    const res = await createUserWithEmailAndPassword(
      auth,
      trimmedEmail,
      password
    );
    const user = res.user;

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email: trimmedEmail,
      name: "",
      avatar: "",
      bio: "Hey, There I am using chat app",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });

    toast.success("Account created successfully!");
  } catch (error) {
    console.error(error);
    if (error.code === "auth/weak-password") {
      toast.error("Password should be at least 6 characters.");
    } else if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already in use.");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Invalid email address.");
    } else {
      toast.error("Failed to create an account.");
    }
  }
};

const login = async (email, password) => {
  try {
    const trimmedEmail = email.trim();
    await signInWithEmailAndPassword(auth, trimmedEmail, password);
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error(error);
    if (error.code === "auth/wrong-password") {
      toast.error("Incorrect password.");
    } else if (error.code === "auth/user-not-found") {
      toast.error("No user found with this email.");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Invalid email address.");
    } else {
      toast.error("Failed to log in.");
    }
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error("Failed to log out.");
  }
};

// handle function to reset password
const resetPass = async (email) =>{
  if(!email){
    toast.error("Please enter your email address.");
    return null;
  }
  try{
    const userRef = collection(db, 'users');
    const q = query(userRef,where("email","==",email));
    const querySnap = await getDocs(q);
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth,email);
      toast.success("reset email sent successfully.");
    }
    else{
      toast.error("Email does not exist");
    }
  }
  catch(error){
    console.error(error);
    toast.error("Failed to reset password.");
  }
}

export { signup, login, logout, auth, db,resetPass };
