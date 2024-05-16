import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Field from "../../components/Field";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

import LogoImage from "../../assets/images/logo.png";

import { forgotPasswordApi } from "../../util/ApiUtil";

const ForgotPassword = () => {
  // useRef is a hook in React that allows you to access the properties of a DOM element or a component instance.
  // formikRef is a reference to the Formik component instance, which will be used later to manipulate the form
  const formikRef = useRef();

  // useState is a hook that allows you to add state to your functional component.
  // isFetching is a state variable that keeps track of the loading status of the form. setIsFetching is the update function for isFetching
  const [isFetching, setIsFetching] = useState(false);

  // This useEffect hook sets the title of the document to "Forgot Password | Feed App".
  // The empty array passed as the second argument to useEffect means that this effect will only run once, when the component is first mounted.
  useEffect(() => {
    document.title = "Forgot Password | Feed App";
  }, []);

  // This function triggers the form submit and it takes the values of the form data as its only argument
  const onFormSubmit = async (values) => {
    console.log(values);

    // this fucntion checks value for isFetching, if its not it proceeds
    if (!isFetching) {
      setIsFetching(true); // The first thing the function does is to set isFetching to true using the setIsFetching function.

      // next it calls forgotPasswordApi function and passes in the email value from the form as an argument. This function makes an API call to initiate a password reset for the email provided.
      const apiResponse = await forgotPasswordApi(values.email);

      // After that API call is complete it checks the status property of the response object apiResponse, its it === 1 its succeful and return value of the forMessage, Please check your email to reset the password." using formikRef.current.setFieldValue
      if (apiResponse.status === 1) {
        formikRef.current.setFieldValue(
          "formMessage",
          "Please check your email to reset the password."
        );
      } else {
        // If the status property is not equal to 1, it means there was an error, and the function sets the value of the formMessage field to the error message returned by the API, stored in apiResponse.payLoad.
        formikRef.current.setFieldValue("formMessage", apiResponse.payLoad);
      }
      setIsFetching(false);
    }
  };

  // This function validate the user input form SubmitEvent. It will help us reduce the bumber of apis calls we make and check for inputs on the client
  // The code defines Yub schema validate for input fields for the forgot password form and the object has the following filds email
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
  });

  return (
    <div className="background-color: #FEFDF5">
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full mx-auto lg:w-full mt-20 md:mt-0 px-10 md:px-36">
          <div className="flex-1">
            <div className="text-center">
              <Formik
                innerRef={formikRef}
                initialValues={{
                  email: "",
                  formMessage: undefined,
                }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={onFormSubmit}
              >
                {({ values }) => (
                  <Form>
                    {values.formMessage && (
                      <div className="w-full md:w-1/2 mx-auto">
                        <Badge text={values.formMessage} />
                      </div>
                    )}
                    <img src={LogoImage} width={120} className="mx-auto mb-2" />
                    <h2 className="text-4xl font-bold text-center text-gray-700">
                      Forgot Password?
                    </h2>

                    <p className="mt-3 text-gray-500 mb-10">
                      Enter your email below to get a reset link.
                    </p>

                    <div className="my-5 w-60 mx-auto">
                      <Field name="email" id="email" placeholder="" />
                    </div>
                    <div className="my-5 w-60 mx-auto">
                      <Button text="Request Link" />
                    </div>
                    <Link
                      to="/user/login"
                      className="text-sm text-gray-400 focus:text-purple-500 hover:text-purple-500 hover:underline"
                    >
                      Back to Login
                    </Link>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
