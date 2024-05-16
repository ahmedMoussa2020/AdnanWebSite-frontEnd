import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import LogoImage from "../assets/images/logo.png";

import { AppContext } from "../context/applicationContext";

// The NavBar takes an optional prop pageTitle with a default value of "Feed App".
const NavBar = ({ pageTitle = "Feed App" }) => {
  // This  uses the useContext hook to access the AppContext context, which is then stored in the appContext variable.
  // The useState hook is used to create a state variable called navbar with an initial value of false.
  const appContext = useContext(AppContext);
  const [navbar, setNavbar] = useState(false);
  // The state variable is used to keep track of the navigation bar should be open or close in the component.
  // If its open on a mobile device. Hiding a nav bar depending upon window size is a common pattern in front end design.

  // This function logs the user out by calling the logout function from the AppContext.
  const logout = () => {
    appContext.logout();
  };

  return (
    <nav className="w-full">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <h4 className="text-gray-600 text-3xl font-semibold">
              {pageTitle}
            </h4>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 px-0 lg:px-16 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li>
                <Link
                  className="text-sm text-gray-500 hover:text-purple-600"
                  to="/app/dashboard"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 hover:text-purple-600"
                  to="/app/myFeeds"
                >
                  My Feeds
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-500 hover:text-purple-600"
                  to="/app/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <a
                  className="text-sm text-gray-500 hover:text-purple-600 cursor-pointer"
                  onClick={() => logout()}
                >
                  Logout
                </a>
              </li>
              <li>
                <img src={LogoImage} width={40} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
