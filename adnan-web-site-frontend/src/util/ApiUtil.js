import axios from "axios";

// const ApiUtil = () => {
// defines a contant called API_BASE_URL that specifies the base URL for an API
const API_BASE_URL = "http://localhost:8080";

// The frameToken function is used to format an authentication token for use in an API request. it returns the string that we getting from the backend
const frameToken = (token) => `Bearer ${token}`;

// frameResponse that returns an object representing a response from an API request.
// The function takes in two arguments: reqStatus and reqPayLoad.
// reqStatus and reqPayLoad return an object with status of 0 and a payLoad of "Invalid request. Please try again later."

// reqStatus this function return an object with a reqStatus and reqPayLoad as the values of the status and payLoad properties, respectively
const frameResponse = (
  reqStatus = 0,
  reqPayLoad = "Invalid request. Please try again later."
) => {
  return {
    status: reqStatus,
    payLoad: reqPayLoad,
  };
};
// This fucntion makes an axios call to //localhost:8080/user/signup API from the backend
// The code exports a function called registerApi that makes an API request for registering a new user.
export const registerApi = async (
  username,
  password,
  emailId,
  firstName,
  lastName,
  phone
) => {
  let response = frameResponse();

  // with in this try catch is here i call my API from backend
  try {
    const url = `${API_BASE_URL}/user/signup`;

    //axios makes a post request to the signup API with the request body
    const apiResponse = await axios.post(url, {
      username,
      password,
      emailId,
      firstName,
      lastName,
      phone,
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

// The code exports a function called verifyEmailApi which takes in a token parameter.
export const verifyEmailApi = async (token) => {
  let response = frameResponse();

  try {
    // makes a GET request to an API endpoint http:localhost:8080/user/verify/email to verify the email of a user. It will make axios library API request
    const url = `${API_BASE_URL}/user/verify/email`;

    // The API request is made using the axios.get method, passing the URL and headers. The headers include an Authorization header with a token generated using the frameToken function and the token argument that was passed into the verifyEmailApi function.
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    // The response from API is checked with if statement and the status code is 1 from DB API
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      // if an error occor during API request, its caught and reponse and the response object is updated with a status code of 0 and the error message from the API response.
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    //Finally, the response object is returned from the function.
    return response;
  }
};

// The code below exports a function called loginApi which takes in two parameters: username and password.
export const loginApi = async (username, password) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/login`;
    // The code makes a POST request to the /user/login endpoint of an API. The function takes in two parameters, username and password, which are passed as the request payload.
    // The function starts by initializing the response object with the frameResponse utility function, which sets the default values for the response object.
    const apiResponse = await axios.post(url, { username, password });
    // it makes a POST request to the API with returns 200 status, and the response payload is extracted into a payLoad object
    if (apiResponse.status === 200) {
      const payLoad = {
        // The payLoad object contains the user data returned by the API and the Authorization header, which is the token that will be used to authenticate subsequent API calls.
        userData: apiResponse.data,
        token: apiResponse.headers.authorization,
      };
      response = frameResponse(1, payLoad);
    }
  } catch (err) {
    // If an error occurs during the API request, the error message is extracted from the error response and set as the payLoad in the response object.
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response; // The function then returns the response object, which will contain either the success status code and payLoad data or the error status code and error message.
  }
};

//This function makes an axios call to //hppt://localhost:8080/user/reset/{email} API from the backend

export const forgotPasswordApi = async (email) => {
  let response = frameResponse();

  // The code above makes a GET request to the server using the Axios library.
  // It uses the axios.get method to send the request to the server, with the URL being ${API_BASE_URL}/user/reset/${email}
  try {
    const url = `${API_BASE_URL}/user/reset/${email}`;
    const apiResponse = await axios.get(url);
    if (apiResponse.status === 200) {
      // The function uses a try-catch block to handle any errors that may occur during the request. If the response from the server is successful (status code 200), the frameResponse function is called with the arguments 1 and undefined. This sets the status property of the response object to 1 and the payLoad property to undefined.
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      // If an error occurs during the request, the catch block checks if the error has a response property. If it does, it calls the frameResponse function with arguments 0 and err.response.data.message, which sets the status property of the response object to 0 and the payLoad property to the error message. The error is also logged to the console.
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    // Finally, the function returns the response object, regardless of whether the request was successful or not.
    return response;
  }
};

// The code above exports a function called resetPasswordApi which takes in two parameters: token and password.
export const resetPasswordApi = async (token, password) => {
  let response = frameResponse();

  // The code above performs a POST request to the /user/reset endpoint with the new password and a token in the header. The token is passed to the frameToken function which adds some additional information to the token, specifically the Bearer prefix.
  try {
    const url = `${API_BASE_URL}/user/reset`;
    const apiResponse = await axios.post(
      url,
      {
        password,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    // The response from the API is then evaluated. If the status code is 200, then a success response is returned using the frameResponse function with a status of 1.
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    // If there is an error within the response, the error message is extracted and returned using the frameResponse function with a status of 0. If there are any other errors, they are logged to the console.
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    // Finally, the response is returned.
    return response;
  }
};

// // This function called sessionApi which takes in a single parameter called token
export const sessionApi = async (token) => {
  let response = frameResponse();
  // The response from the API is handled in a try-catch block.
  try {
    const url = `${API_BASE_URL}/user/get`;
    // The GET request makes an API endpoint at ${API_BASE_URL}/user/get with an authorization header of Authorization: frameToken(token).
    // The frameToken function is used to format the token that was passed into the function.
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    // If the request is successful and returns a status code of 200.
    // after that the response is set to a success response with the data from the API as the payload.
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      // If there is an error in the request, the catch block is executed and an error response is set with the error message from the API.
      response = frameResponse(0, err.response.data.message);
    }
    // Whether the request is successful or not, the response is then returned from the function.
    console.log(err);
  } finally {
    return response;
  }
};

export const updatePublicProfileApi = async (
  token,
  bio,
  city,
  country,
  headline,
  picture
) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/update/profile`;
    const apiResponse = await axios.post(
      url,
      {
        bio,
        city,
        country,
        headline,
        picture,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const getOthersFeedsApi = async (token, pageNumber) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds/other/${pageNumber}/5`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const addFeedApi = async (token, content, picture) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds`;
    const apiResponse = await axios.post(
      url,
      {
        content,
        picture,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const addFeedMetaDataApi = async (token, feedId, isLike, comment) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/feeds/meta/${feedId}`;
    const apiResponse = await axios.post(
      url,
      {
        isLike,
        comment,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};
