import React, { useState, useEffect } from "react";
import { addQuestion } from "../firebase";
import progres_gif from "../assets/progess-bar.gif";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { getUserByUsernameAndPassword } from "../firebase";

//component for asking question
function AskQuestion() {
  //for database
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  function generateUniqueFiveDigitNumber() {
    const timestamp = new Date().getTime();
    return (timestamp % 90000) + 10000; // Generate a unique 5-digit number
  }

  //add question to db
  const add_question = async (e) => {
    e.preventDefault();
    const newQuestionId = generateUniqueFiveDigitNumber();
    setLoading(true);
    try {
      await addQuestion(newQuestionId, description, title, currentUser);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error adding question: ", error);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Retrieve email and password from sessionStorage
        const email = sessionStorage.getItem("email");
        const password = sessionStorage.getItem("password");

        //get user based on credential passed
        const userName = await getUserByUsernameAndPassword(email, password);
        setCurrentUser(userName);
        console.log("Current user: ", userName);
      } catch (error) {
        console.error("Error fetching current user: ", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return loading ? (
    <div>
      <div
        onClick={() => {
          setLoading(false);
        }}
        className="flex justify-end pr-7 "
      >
        <span className="text-red-500 cursor-pointer border rounded-md border-transparent hover:border-gray-500 px-2">
          <CloseIcon />
        </span>
      </div>
      <div className="pt-[6%] pb-[14%] flex items-center justify-center">
        <img src={progres_gif} alt="Loading..." />
      </div>
    </div>
  ) : (
    <>
      <div className="flex items-center justify-center ">
        <div className="w-[90%] md:w-4/6 flex items-center justify-between py-4 px-5">
          <div className="w-full flex items-center justify-center">
            <div>
              <p className="text-center text-md md:text-xl font-bold">
                Steps to write a good question
              </p>
              <ul className="list-disc text-sm md:text-md">
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>
                  Describe what you tried and what you expected to happen.
                </li>
                <li>Review your question and post it to the site.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center pb-4">
        <div
          className="w-[90%] xl:w-[74%] bg-red "
          style={{ boxShadow: "12px 12px  12px rgba(128, 128, 128, 0.2)" }}
        >
          <div className="flex items-center justify-center ">
            <div className="w-[90%] flex items-center justify-between py-4 px-5">
              <div className="w-full text-center pt-10">
                <p className="text-md md:text-xl font-bold">
                  Ask a public question
                </p>
                <p className="pt-3 text-sm md:text-md">Go to Question page</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-[90%] flex items-center justify-between py-4 ">
              <input
                className="w-full border-2 border-gray rounded-md p-1 text-sm md:text-md"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                placeholder="Title"
              />
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-[90%] flex items-center justify-between ">
              <textarea
                placeholder="Question Description.."
                className="w-full h-40 pl-2 border-2 border-gray rounded-md text-sm md:text-md"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-center -mt-3">
            <div className="w-[90%] flex items-center justify-between py-1 pt-5">
              <button
                type="submit"
                onClick={add_question}
                className="font-titleFont font-medium text-base bg-gradient-to-tr from-blue-600 to-blue-500 border hover:from-blue-500 hover:to-blue-border-blue-700 hover:border-blue-700 active:bg-gradient-tobl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md text-white mt-3 mb-3 px-4 md:px-10 text-md md:text-lg"
              >
                Post Your Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AskQuestion;
