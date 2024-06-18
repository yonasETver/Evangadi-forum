import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import AskQuestion from "./Components/AskQuestion";
import Answer from "./Components/Answer";
import SignInUp from "./Components/SignInUp";
import Layout from "./Components/Layout";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged In");
        if (window.location.pathname === "/signInUp") {
          navigate("/");
        }
      } else {
        console.log("Logged out");
        if (window.location.pathname !== "/signInUp") {
          navigate("/signInUp");
        }
      }
    });
  }, [navigate]);

  return (
    <div class="min-h-screen flex flex-col">
      <Layout>
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="/signInUp" element={<SignInUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/askQuestion" element={<AskQuestion />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
