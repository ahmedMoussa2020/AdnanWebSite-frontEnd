import React, { useState } from "react";
import { useCookies } from "react-cookie";

// create a context object using createContext();
const AppContext = React.createContext();

// fucntional component
const AppContextProvider = ({ children }) => {
  // initialize my variables

  // setCookie function can be used to update the value of "appToken cookie"
  //removeCookie functional can be used to delete to "appToken" cookie from the browser
  const [cookies, setCookie, removeCookie] = useCookies(["appToken"]);

  // userSessionData is a state variable initially set to undefined, it will hold data for the current user
  // setUserSessionData will update the value of the userSessionData
  // useSate hook can store and update the user session data of the component. Any changes it will trigger re-render
  const [userSessionData, setUserSessionData] = useState(undefined);

  //function which saves the token into the cookies "appToken" = cookieName, value=token
  const setSession = (token) => {
    setCookie("appToken", token, {
      path: "/",
      maxAge: 900, //15minutes
    });
  };
  //fucntion whick allows us to retrieve the value of the token from cookies by using cookies.appToken
  const getSession = () => {
    const token = cookies.appToken || null;
    return token;
  };

  const setUserData = (userData) => setUserSessionData(userData);
  const getUserData = () => userSessionData;

  // it remove the cookies from the appToken cookie from the browsers cookie storage.
  const logout = () => {
    removeCookie("appToken", { path: "/" });
    setUserData(undefined);
  };

  return (
    <AppContext.Provider
      value={{
        setSession,
        getSession,
        setUserData,
        getUserData,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default AppContextProvider;
