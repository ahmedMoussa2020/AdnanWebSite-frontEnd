import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import Field from "../../components/Field";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

import LogoImage from "../../assets/images/logo.png";

import { resetPasswordApi } from "../../util/ApiUtil";

const ResetPassword = () => {
  // the useSearchParams hook from the react-router-dom library to get the search parameters from the URL. In this case, it's looking for the token search parameter.
  // It then creates a variable verifyToken and sets its value to the value of the token search parameter.
  const [searchParams] = useSearchParams();
  const verifyToken = searchParams.get("token");

  // The useRef hook is used to create a mutable object that can be referenced in the component, in this case, it's used to store a reference to the Formik component.
  //   useState is used to set up a state variable called isFetching which will be used to keep track of whether a request to the API is in progress. Initially, isFetching is set to false.
  const formikRef = useRef();
  const [isFetching, setIsFetching] = useState(false);

  // This useEffect hook sets the title of the document to "Reset Password | Feed App". The empty array passed as the second argument to useEffect means that this effect will run only once, when the component is first mounted.
  useEffect(() => {
    document.title = "Reset Password | Feed App";
  }, []);

  // onFormSubmit is a function that is triggered when the form is submitted. It takes the values object which contains the form data as an argument.
  const onFormSubmit = async (values) => {
    console.log(values);
    // The function first checks if isFetching is false. If it is, it sets isFetching to true to indicate that the form is currently being submitted.
    if (!isFetching) {
      setIsFetching(true);
      //  it calls the resetPasswordApi function and passes in values.verifyToken and values.password as parameters. resetPasswordApi is our function that makes an API call to reset the password.
      const apiResponse = await resetPasswordApi(
        values.verifyToken,
        values.password
      );
      // when its completed it checks status property apiResponse, if its === 1 it uses the formRef reference to set value for formMessage filds "Your password has been reset. Please login to continue.".
      if (apiResponse.status === 1) {
        formikRef.current.setFieldValue(
          "formMessage",
          "Your password has been reset. Please login to continue."
        );
      } else {
        // If the status is not equal to 1, it sets the value of formMessage to apiResponse.payLoad.
        formikRef.current.setFieldValue("formMessage", apiResponse.payLoad);
      } // Finally, it sets isFetching to false to indicate that the form submission is complete.
      setIsFetching(false);
    }
  };

  // The code defines a Yup schema for validating the input fields in the reset password form. The ResetPasswordSchema object has the following fields:
  // verifyToken: a required string.
  // password: a required string.
  const ResetPasswordSchema = Yup.object().shape({
    verifyToken: Yup.string().required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required"),
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
                  verifyToken,
                  password: "",
                  formMessage: undefined,
                }}
                validationSchema={ResetPasswordSchema}
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
                      Reset Password
                    </h2>

                    <p className="mt-3 text-gray-500 mb-10">
                      Enter a new password below.
                    </p>

                    <div className="my-5 w-60 mx-auto">
                      <Field
                        name="password"
                        id="password"
                        placeholder=""
                        type="password"
                      />
                    </div>
                    <div className="my-5 w-60 mx-auto">
                      <Button text="Reset Password" />
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

export default ResetPassword;
