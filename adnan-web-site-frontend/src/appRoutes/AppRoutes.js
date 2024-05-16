import React, { useState, useEffect, useContext } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import VerifyEmail from "../pages/User/VerifyEmail";
import ForgotPassword from "../pages/User/ForgotPassword";
import ResetPassword from "../pages/User/ResetPassword";

import Wrapper from "../components/Wrapper";
import NavBar from "../components/NavBar";

import { AppContext } from "../context/applicationContext";
import LoadingIndicator from "../components/LoadingIndicator";

import { sessionApi } from "../util/ApiUtil";

import Dashboard from "../pages/App/Dashboard";
import Profile from "../pages/App/Profile";
import CompleteProfile from "../pages/App/CompleteProfile";
import MyFeeds from "../pages/App/MyFeeds";

const AppRoutes = () => {
  //navigate leverages a hook provided by react-router-dom library that allows you to programmatically navigate to different routes in your application.
  const navigate = useNavigate();
  //location leverages another hook provided by react-router-dom library that returns the current location in your application.
  const location = useLocation();
  // appContext is the context that holds the application state and functions.  it is using the useContext hook to access the AppContext from the ../context/applicationContext file.
  const appContext = useContext(AppContext);
  // token is a variable that holds the value of the session token.  It is obtained by calling the getSession function from the appContext.
  const token = appContext.getSession();

  // The userData is a variable that holds the user data for the current session. It calls the getUserData function from the appContext.
  const userData = appContext.getUserData();
  // isAuthenticated is a state variable that holds a null, true, or false value indicating whether the user is authenticated or not.
  // setIsAuthenticated is a state hook that allows you to update the value of isAuthenticated.
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // pageTitles is an object that holds the page titles for the different routes in the application. And it maps the route paths to their respective page tiltes for use at the top of the browser
  const pageTitles = {
    "/app/dashboard": "Dashboard",
    "/app/profile": "Profile",
    "/app/myFeeds": "My Feeds",
  };
  // The code makes a call to the sessionApi function with the token parameter and retrieves the user's session information from the API.
  // If the API call returns a status of 1, the function sets the user data in the applicationContext by calling appContext.setUserData().
  const getSession = async () => {
    const apiResponse = await sessionApi(token);
    if (apiResponse.status === 1) {
      appContext.setUserData(apiResponse.payLoad);
    }
  };
  // This code calls the getSession function if there is a token present but no user data is found in the context.
  useEffect(() => {
    if (token && !userData) {
      getSession(); // the getSession function\methods is used to get the session details from the server.
    }
  }, []); // The second argument [] means that the effect will only run once when the component is mounted. This happens only when user is logged in and tab is open. if page refresh the context will lose data
  // this hook takes two argument, function and dependency array. useEffect is the executed everytime the component rendered.
  useEffect(() => {
    if (!userData && !token) {
      // The hook is set up to re-run whenever the userData value changes. The userData is obtainer from the AppContext, its global state.
      setIsAuthenticated(false);
    }
    // The function inside the hook has a conditional statement that checks if userData and token are both falsy. If this is the case, it sets the isAuthenticated state to false, indicating that the user is not authenticated.

    // If userData is truthy, it sets isAuthenticated to true, indicating that the user is authenticated.
    // It also checks if the userData.profile property is false. if is true it will navigate to function the react-router-dom.o redirect the user to the /app/completeProfile route
    if (userData) {
      setIsAuthenticated(true);
      if (!userData.profile) {
        navigate("/app/completeProfile");
      }
    }
  }, [userData]);

  // it checks the value is the isAuthenticated stare
  // if it null, the user is till being determined so the component LoadingIndicator is returned to indicate that app is in the process.
  if (isAuthenticated === null) return <LoadingIndicator />;
  // The LoadingIndicator component is usually used to indicate to the user that the app is busy loading data or performing another operation.

  // These routes should be wrapped under a condition wherein the isAuthenticated state variable is false.
  // if the user is not authenticated, code willl render to the route below
  if (isAuthenticated === false) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/user/login" replace />} />
        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/user/register" element={<Register />} />
        <Route exact path="/user/verifyEmail" element={<VerifyEmail />} />
        <Route exact path="/user/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/user/resetPassword" element={<ResetPassword />} />
      </Routes>
    );
  }

  // this code will render if the isAuthenticated is true.
  // the first returns Wrapper
  if (isAuthenticated === true) {
    return (
      <Wrapper>
        {userData && userData.profile && (
          <NavBar pageTitle={pageTitles[location.pathname]} />
        )}
        <Routes>
          <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
          <Route exact path="/app/dashboard" element={<Dashboard />} />
          <Route exact path="/app/myFeeds" element={<MyFeeds />} />
          <Route exact path="/app/profile" element={<Profile />} />
          <Route
            exact
            path="/app/completeProfile"
            element={<CompleteProfile />}
          />
        </Routes>
      </Wrapper>
    );
  }
};

export default AppRoutes;
