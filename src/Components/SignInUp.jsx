import React, { useState, useEffect } from "react";
import cover from "../assets/cover-photo.jpg";
import { login, signup } from "../firebase";
import progres_gif from "../assets/progess-bar.gif";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

//The sign and sign up page
function SignInUp() {
  const [signState, setSignState] = useState("Create an account?");
  const [topState, setTopState] = useState("Login to your account");
  const [switchAccount, setSwitchAccount] = useState(true);
  const [passHint, setPassHint] = useState("Your password");
  const [emailHint, setEmailHint] = useState("Your email");
  const [topStateStyle, setTopStateStyle] = useState("");
  const [netToTopLeft, setNetToTopLeft] = useState("Don't have account?");
  const [netToTopRight, setNetToTopRight] = useState("Create a new account");
  const [loading, setLoading] = useState(false);
  const [adjustedHeight, setAdjustedHeight] = useState(null);

  useEffect(() => {
    // Calculate the height by subtracting 200px from the viewport height
    const height = window.innerHeight - 260;
    setAdjustedHeight(height);
  }, []);

  //for database
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //sign in or sign up based on conditions
  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (signState === "Create an account?") {
        await login(email, password);
      } else {
        await signup(firstName, lastName, userName, email, password);
      }
      setLoading(false);

      // Store email and password in sessionStorage
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
    } catch (error) {
      console.error(error);
      toast.error(error.code.split("/")[1].split("-").join(" "));
      setLoading(false);
    }
  };

  //toggel the signIn and signUp page
  const toggleAccount = () => {
    setSwitchAccount(!switchAccount);
    if (switchAccount === true) {
      setSignState("Already have an account?");
      setEmailHint("Email");
      setPassHint("Password");
      setTopState("Join the network");
      setTopStateStyle("font-bold text-lg");
      setNetToTopLeft("Aready have an account?");
      setNetToTopRight("Sign in");
    } else {
      setSignState("Create an account?");
      setEmailHint("Your email");
      setPassHint("Your password");
      setTopState("Login to your account");
      setTopStateStyle("");
      setNetToTopLeft("Don't have account?");
      setNetToTopRight("Create a new account");
    }
  };

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
        <img src={progres_gif} alt="" />
      </div>
    </div>
  ) : (
    <div className="bg-cover " style={{ backgroundImage: `url(${cover})` }}>
      <div className="flex items-center justify-center pt-2 pb-1 ">
        <div className="w-full md:w-[70%] lg:w-5/6 xl:w-4/6 lg:flex  justify-center py-4 px-5 lg:space-x-6">
          <div
            className="flex items-center justify-center lg:w-1/2 h-screen pb-3 md:pb-0 bg-white rounded-md"
            style={{
              height: adjustedHeight ? `${adjustedHeight}px` : "auto",
              boxShadow: "12px 12px 12px rgba(128, 128, 128, 0.2)",
            }}
          >
            <div className="w-[90%] lg:w-2/3 text-center space-y-2 py-9 lg:pt-0 ">
              <p className={`${topStateStyle}`}>{topState}</p>
              <p>
                {netToTopLeft}
                <span className="text-yellow-500 cursor-pointer">
                  {netToTopRight}
                </span>
              </p>
              <form>
                <input
                  className="w-full border-2 border-gray rounded-md p-1"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder={emailHint}
                />
                {!switchAccount && (
                  <div>
                    <div className="w-full">
                      <p className="py-1.5"></p>
                      <div className="flex justify-between">
                        <input
                          className="w-[49%] border-2 border-gray rounded-md p-1"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          type="text"
                          placeholder="First Name"
                        />
                        <input
                          className="w-[49%] border-2 border-gray rounded-md p-1"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <p className="py-1.5"></p>
                    <input
                      className="w-full border-2 border-gray rounded-md p-1"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      type="text"
                      placeholder="User Name"
                    />
                  </div>
                )}
                <p className="py-1.5"></p>
                <input
                  className="w-full border-2 border-gray rounded-md p-1"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder={passHint}
                />
                <br />

                {switchAccount ? (
                  <button
                    onClick={user_auth}
                    type="submit"
                    className="w-2/4 font-titleFont font-medium text-base bg-gradient-to-tr from-orange-600 to-yellow-500 border hover:from-yellow-500 hover:to-yellow-border-yellow-700 hover:border-yellow-700 active:bg-gradient-tobl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md text-white mt-6 mb-3"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={user_auth}
                    type="submit"
                    className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-blue-600 to-blue-500 border hover:from-blue-500 hover:to-blue-border-blue-700 hover:border-blue-700 active:bg-gradient-tobl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md text-white mt-3 mb-3"
                  >
                    Agree to Join
                  </button>
                )}
                <br />
                {!switchAccount && (
                  <p className="pb-4 text-sm">
                    I agree to the{" "}
                    <span className="text-yellow-500 underline cursor-pointer">
                      privacy policy
                    </span>{" "}
                    and{" "}
                    <span className="text-yellow-500 underline cursor-pointer">
                      {" "}
                      terms of serivice
                    </span>
                  </p>
                )}
                <p
                  className="text-yellow-500 underline cursor-pointer pb-3 xl:pb-0"
                  onClick={toggleAccount}
                >
                  {signState}
                </p>
              </form>
            </div>
          </div>

          <div className="lg:w-1/2 pt-4 lg:pt-0 flex items-center justify-center">
            <div>
              <p className="text-yellow-500 pb-3 text-xl xl:text-md text-center lg:text-start">
                About
              </p>
              <p className="text-md xl:text-xl pb-2">Evagadi Networks Q&A</p>
              <div className="space-y-3 pb-9 text-justify">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Exercitationem accusamus sed consequatur quae rerum incidunt,
                  sint, voluptatibus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  temporibus modi corporis fuga necessitatibus porro excepturi
                  quae expedita molestiae{" "}
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  fugit deleniti, expedita similique veniam tempora nisi odit
                  quo earum explicabo eligendi harum id!
                </p>
              </div>
              <div className="text-center lg:text-start">
                <button className="w-[50%] font-titleFont font-medium text-base bg-gradient-to-tr from-orange-600 to-yellow-500 border hover:from-yellow-500 hover:to-yellow-border-yellow-500 hover:border-yellow-700 active:bg-gradient-tobl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 px:1 xl:px-3 rounded-md text-white mt-1 text-md xl:text-lg">
                  HOW IT WORKS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInUp;
