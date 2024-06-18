import React, { useEffect, useState } from "react";
import Question from "./Question";
import { Link } from "react-router-dom";
import { readQuestions } from "../firebase";
import progres_gif from "../assets/progess-bar.gif";
import CloseIcon from "@mui/icons-material/Close";
import { getUserByUsernameAndPassword } from "../firebase";

//component of the home page
function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  //read all question posted from db
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const questionsArray = await readQuestions();
        setQuestions(questionsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    //get  current loged user
    const fetchCurrentUser = async () => {
      try {
        // Retrieve email and password from sessionStorage
        const email = sessionStorage.getItem("email");
        const password = sessionStorage.getItem("password");
        // Fetch the user name asynchronously
        const userName = await getUserByUsernameAndPassword(email, password);
        // Once the user name is fetched, update the state
        setCurrentUser(userName);
        console.log("Current user: ", userName);
      } catch (error) {
        console.error("Error fetching current user: ", error);
      }
    };
    fetchCurrentUser();

    fetchData();
  }, []);

  return (
    <>
      <hr />
      <div className="flex items-center justify-center ">
        <div className="w-[90%] xl:w-4/6 flex items-center justify-between py-4 px-5">
          <Link to="/askQuestion">
            <button className="font-titleFont font-medium text-base bg-gradient-to-tr from-blue-600 to-blue-500 border hover:from-blue-500 hover:to-blue-border-blue-700 hover:border-blue-700 active:bg-gradient-tobl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md text-white mt-3 mb-3 px-3 xl:px-6 text-md xl:text-lg">
              Ask Question
            </button>
          </Link>
          <p className="text-md xl:text-lg">Welcome: {currentUser}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[90%] xl:w-4/6 flex items-center justify-between py-2 px-5">
          <p className="text-md xl:text-xl">Question</p>
        </div>
      </div>
      <div id="question-container">
        {loading ? (
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
              <img src={progres_gif} alt="" />
            </div>
          </div>
        ) : (
          questions.map((question) => (
            <Question
              key={question.id}
              id={question.questionId}
              title={question.title}
              description={question.questionDescription}
              user={question.userName}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Home;
