import React from "react";
import facbook from "../assets/facebook_logo.png"
import instagram from "../assets/instagram_logo.png";
import youtube from "../assets/youtube-logo.png";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";

//component for footer
function Footer() {
  return (
    <>
      <div className="xl:sticky xl:bottom-0 w-full bg-fotter_blue">
        <div className="flex items-center justify-center">
          <div className="w-5/6 block md:flex  md:justify-between py-4 px-[25%] md:px-5">
            <div>
              <Link to="/">
                <img
                  className="w-40 pt-0 cursor-pointer border-2 border-transparent hover:border-white rounded-md"
                  src={logo}
                  alt=""
                />
              </Link>
              <div className="flex items-center py-2 px-7 space-x-2 md:space-x-5">
                <img className="h-5 cursor-pointer" src={facbook} alt="" />
                <img className="h-5 cursor-pointer" src={instagram} alt="" />
                <img className="h-5 cursor-pointer" src={youtube} alt="" />
              </div>
            </div>

            <div className="text-white">
              <p className="text-md md:text-lg pb-3  font-bold">Usfule Link</p>
              <ul className="list-none text-sm space-y-2">
                <li className="cursor-pointer">How it works</li>
                <li className="cursor-pointer">Terms of Service</li>
                <li className="cursor-pointer">Privacy policy</li>
              </ul>
            </div>

            <div className="text-white">
              <p className="text-md md:text-lg pb-3 py-3 md:pt-0 font-bold">
                Contact Info
              </p>
              <ul className="list-none text-sm space-y-2">
                <li className="cursor-pointer">Evangadi Networks</li>
                <li className="cursor-pointer">support@evangadi.com</li>
                <li className="cursor-pointer">+1-202-386-2702</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
