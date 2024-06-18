import ArrowCircleRightIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import userImg from "../assets/user.png";
import { Link } from "react-router-dom";


//The question deisplayer child component
function Question({ id, title, description, user }) {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="w-[90%] xl:w-4/6 py-0 px-5">
          <hr />
        </div>
      </div>

      <div className="flex items-center justify-center ">
        <div className="w-[90%] xl:w-4/6 flex items-center justify-between py-4 px-5">
          <div className="flex items-center justify-center ">
            <div>
              <img className="w-20" src={userImg} alt="" />
              <p className="flex items-center justify-center ">{user}</p>
            </div>
            <p className="pl-6 text-justify pb-8 pr-3">{title}</p>
          </div>

          {/* Ensure currentUser is defined before creating the Link */}

          <Link
            to={{
              pathname: "/answer",
              search: `?id=${id}&title=${encodeURIComponent(
                title
              )}&description=${encodeURIComponent(
                description
              )}&userName=${encodeURIComponent(user)}`,
            }}
          >
            <button className="cursor-pointer border rounded-md border-transparent hover:border-gray-500 p-2">
              <ArrowCircleRightIcon />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Question;
