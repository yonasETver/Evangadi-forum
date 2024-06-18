import React, { useState, useEffect } from "react";
import AllAnswer from "./AllAnswer";
import { useLocation, useNavigate } from "react-router-dom";
import { addAnswer, getAnswersByQuestionId } from "../firebase";
import progres_gif from "../assets/progess-bar.gif";
import CloseIcon from "@mui/icons-material/Close";
import { getUserByUsernameAndPassword } from "../firebase";

//component to display answers and get answer from user
function Answer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [getAnswer, setGetAnswer] = useState([]);

  // Access the values of the query parameters passed from routing 
  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const userName = searchParams.get("userName");
  const [currentUser, setCurrentUser] = useState(null);

  //method to store the answer to db
  const add_answer = async (e) => {
    e.preventDefault();
    if (!id || !userName || !answer) {
      console.error("Missing required parameters");
      return;
    }
    setLoading(true);
    try {
      await addAnswer(id, currentUser, answer);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error adding answer: ", error);
    }
  };

  //get all answer from the db
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const answerArray = await getAnswersByQuestionId(id);
          setGetAnswer(answerArray);
          setLoading(false);
        } else {
          console.error("No question ID provided");
        }
      } catch (error) {
        console.error("Error fetching the answers: ", error);
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
  }, [id]);

  return loading ? (
    <div>
      <div
        onClick={() => {
          setLoading(false);
        }}
        className="flex justify-end pr-7"
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
      <hr />
      <div className="flex items-center justify-center ">
        <div className="w-[90%] xl:w-4/6 flex items-center justify-between py-4 pt-5">
          <div className="w-full">
            <p className="text-md xl:text-xl font-bold">Question</p>
            <p className="text-sm xl:text-md font-bold">{title}</p>
            <p className="text-sm xl:text-md ">{description}</p>
            <p className="pb-1.5" />
            <hr />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center -mt-5">
        <div className="w-[90%] xl:w-4/6 flex items-center justify-between py-4">
          <div className="w-full">
            <p className="md:text-md xl:text-xl font-bold">
              Answer From The Community
            </p>
            <p className="pb-1.5" />
            <hr />
          </div>
        </div>
      </div>
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
        getAnswer.map((answers) => (
          <AllAnswer
            key={answers.id}
            answer={answers.answer}
            userName={answers.userName}
          />
        ))
      )}
      <div className="w-full flex items-center justify-center pb-4">
        <div
          className="w-[90%] xl:w-[74%] bg-red"
          style={{ boxShadow: "12px 12px  12px rgba(128, 128, 128, 0.2)" }}
        >
          <div className="flex items-center justify-center">
            <div className="w-[90%] flex items-center justify-between py-4 pt-5">
              <div className="w-full flex items-center justify-center">
                <div>
                  <p className="text-md md:text-lg font-bold">
                    Answer The Top Question
                  </p>
                  <p className=" text-sm md:text-md text-center py-4">
                    Go to Question page
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-[90%] flex items-center justify-between pt-5 text-sm md-text-md">
              <textarea
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                placeholder="Your Answer..."
                className="w-full h-40 pl-2 pt-2 border-2 border-gray rounded-md"
              />
            </div>
          </div>
          <div className="flex items-center justify-center -mt-3">
            <div className="w-[90%] flex items-center justify-between py-1 pt-5">
              <button
                type="submit"
                onClick={add_answer}
                className="font-titleFont font-medium text-base bg-gradient-to-tr from-blue-600 to-blue-500 border hover:from-blue-500 hover:to-blue-border-blue-700 hover:border-blue-700 active:bg-gradient-tobl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md text-white mt-3 mb-3 px-4 md:px-10 text-md md:text-lg"
              >
                Post Your Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Answer;
