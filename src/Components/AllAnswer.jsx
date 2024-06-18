import React from "react";
import user from "../assets/user.png";

// Component to display the answers
function AllAnswer({ answer, userName }) {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-[90%] xl:w-4/6 flex items-center justify-between py-2 lg:py-4 px-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="w-20 h-20 object-cover" src={user} alt="User" />
            <p className="font-medium text-center mt-1">{userName}</p>
          </div>
          <div className="flex items-center justify-center ml-4">
            <p className="text-sm md:text-md text-justify pr-3">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllAnswer;
