import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import LogoImage from "../../assets/images/logo.png";

import { verifyEmailApi } from "../../util/ApiUtil";

const VerifyEmail = () => {
  // Declare variables

  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your account...");
  // The code above uses the useSearchParams hook from the react-router-dom library to access the URL search parameters.
  // It sets the searchParams variable to the search parameters of the URL. The code also sets the initial state of message to "Verifying your account..." using the useState hook.

  // verifyEmail creating here
  // useEffect hook to set the page and get verification tokek from the VerifyEmail
  const verifyAccount = async (token) => {


    const apiResponse = await verifyEmailApi(token);
    // The code above checks the response from the verifyEmailApi function, which is an asynchronous function used to verify a user's email address.
    // The token argument is passed to the function, which is used to make a GET request to the API.
    console.log(apiResponse);
    if (apiResponse.status === 1) {
      // after receiving the reponse it cheks the status  fild. if its === to 1 the message till print
      setMessage("Your account has been verified.");
    } else {
      // The setMessage function is used to set the value of the message state. The value of the message state is then used to display a message to the user.
      setMessage(apiResponse.payLoad);
    }
  };
  // console.log(token);
  useEffect(() => {
    // The useEffect hook is used to set the document title to "Verify Email | Feed App" when the component is rendered.
    document.title = "Verify Email | Feed App";

    const verifyToken = searchParams.get("token");
    // The verifyToken variable is obtained from the URL using the searchParams hook from the react-router-dom library. The searchParams.get("token") method is used to extract the token from the URL query parameters.
    if (verifyToken) {
      // If the verifyToken is present, the verifyAccount function is called with the verifyToken as an argument. If the verifyToken is not present, the message is set to "Invalid verification request.".
      verifyAccount(verifyToken);
    } else {
      setMessage("Invalid verification request.");
    } // This useEffect hook is only executed once when the component is first rendered because we've set an empty array as the second argument on line 11.
  }, []);

  return (
    <div className="background-color: #FEFDF5">
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full mx-auto lg:w-full mt-20 md:mt-0 px-10 md:px-36">
          <div className="flex-1">
            <div className="text-center">
              <img src={LogoImage} width={120} className="mx-auto mb-2" />
              <h2 className="text-4xl font-bold text-center text-gray-700">
                Account Verification
              </h2>

              <p className="mt-3 text-gray-500 mb-10">{message}</p>

              <Link
                to="/user/login"
                className="w-52 p-4 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
              >
                Click to Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
