import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB1qzbLTv7bynkdgMq75sFCw7tImYEWdtA",
  authDomain: "evangadi-forum-19711.firebaseapp.com",
  projectId: "evangadi-forum-19711",
  storageBucket: "evangadi-forum-19711.appspot.com",
  messagingSenderId: "127027946061",
  appId: "1:127027946061:web:8b52d9710cb35d617cb204",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (firstName, lastName, userName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      firstName,
      lastName,
      userName,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// Function to add a question to the Question collection
const addQuestion = async (questionId, questionDescription, title, userName) => {
  try {
    // Ensure parameters are defined and valid
    if (!questionId || !questionDescription || !title) {
      throw new Error("Missing required parameters");
    }

    const docRef = await addDoc(collection(db, "Question"), {
      questionId,
      questionDescription,
      title,
      userName
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error(error.message ? error.message : "Unknown error");
  }
};

// Function to add a answer to the Question collection
const addAnswer = async (questionId, userName, answer) => {
  try {
    // Ensure parameters are defined and valid
    if (!questionId || !userName || !answer) {
      throw new Error("Missing required parameters");
    }

    const docRef = await addDoc(collection(db, "Answer"), {
      questionId,
      userName,
      answer,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error(error.message ? error.message : "Unknown error");
  }
};

//read the question data
const readQuestions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Question"));
    const questions = [];

    querySnapshot.forEach((doc) => {
      // Push each document's data to the array
      questions.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return questions;
  } catch (error) {
    console.error("Error getting documents: ", error);
    toast.error(error.message ? error.message : "Unknown error");
    return []; // Return an empty array in case of an error
  }
};

//read only user name
const getUserByUsernameAndPassword = async (email, password) => {
  try {
    // Create a query to find the user with the provided email and password
    const userRef = collection(db, "user");
    const userQuery = query(
      userRef,
      where("email", "==", email),
    );

    // Execute the query
    const querySnapshot = await getDocs(userQuery);

    // Check if any document matches the query
    if (querySnapshot.size === 0) {
      throw new Error("User not found");
    }

    // Retrieve the userName from the first document
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const userName = userData.userName;

    return userName;
  } catch (error) {
    console.error("Error getting user: ", error);
    toast.error(error.message ? error.message : "Unknown error");
    return null; // Return null if user not found or any error occurs
  }
};


// Function to read userName and answer for all matched questionId
const getAnswersByQuestionId = async (questionId) => {
  try {
    // Ensure questionId is defined and valid
    if (!questionId) {
      throw new Error("Missing required parameter: questionId");
    }

    // Create a query to find answers with the provided questionId
    const answersRef = collection(db, "Answer");
    const q = query(answersRef, where("questionId", "==", questionId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Extract userName and answer from each matching document
    const answers = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      answers.push({
        userName: data.userName,
        answer: data.answer,
      });
    });

    return answers;
  } catch (error) {
    console.error("Error getting answers: ", error);
    toast.error(error.message ? error.message : "Unknown error");
    return []; // Return an empty array in case of an error
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  login,
  signup,
  logout,
  addQuestion,
  readQuestions,
  getUserByUsernameAndPassword,
  addAnswer,
  getAnswersByQuestionId,
};
