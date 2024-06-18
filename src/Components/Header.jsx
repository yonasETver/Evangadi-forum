import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { logout } from "../firebase";

//component for header
function Header() {
  return (
    <div className="sticky top-0 w-full bg-white">
      <div className="flex items-center justify-center ">
        <div className=" w-[90%]  xl:w-1/2 flex items-center justify-between">
          <Link to="/">
            <img
              className="w-[60%] xl:w-[80%] border-2 border-transparent hover:border-gray-500 rounded-md"
              src={logo}
              alt="Logo"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <p className="cursor-pointer border rounded-md border-transparent hover:border-gray-500 p-2 text-md xl:text-lg">
                Home
              </p>
            </Link>
            <p className="cursor-pointer border rounded-md border-transparent hover:border-gray-500 p-2 hidden md:block text-md xl:text-lg">
              How it Works
            </p>

            <button
              onClick={() => {
                logout();
              }}
              className="font-titleFont font-medium text-base bg-gradient-to-tr from-blue-600 to-blue-500 border hover:from-blue-500 hover:to-blue-border-blue-700 hover:border-blue-700 active:bg-gradient-tobl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md text-white mt-3 mb-3 px-3 xl:px-12 text-md xl:text-lg"
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
