import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import instance from "../../config/axios";
function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    firstName: {
      status: false,
      error: "",
    },
    lastName: {
      status: false,
      error: "",
    },
    email: {
      status: false,
      error: "",
    },
    password: {
      status: false,
      error: "",
    },
    confirmPassword: {
      status: false,
      error: "",
    },
  });

  const valueSet = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const firstNameCheck = () => {
    if (userData.firstName.length < 2) {
      setValidation((prevState) => ({
        ...prevState,
        firstName: {
          status: false,
          error: "First name must be atleast 3 characters",
        },
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        firstName: {
          status: true,
          error: "",
        },
      }));
    }
  };

  const emailCheck = () => {
    if (userData.email.length < 2) {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          status: false,
          error: "email must be atleast 3 characters",
        },
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        email: {
          status: true,
          error: "",
        },
      }));
    }
  };
  const passwordCheck = () => {
    if (userData.password.length < 6) {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          status: false,
          error: "Password must be atleast 3 characters",
        },
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        password: {
          status: true,
          error: "",
        },
      }));
    }
  };
  const confirmPasswordCheck = () => {
    if (userData.confirmPassword.length < 2) {
      setValidation((prevState) => ({
        ...prevState,
        confirmPassword: {
          status: false,
          error: "confirmPassword must be atleast 3 characters",
        },
      }));
    } else if (userData.password != userData.confirmPassword) {
      setValidation((prevState) => ({
        ...prevState,
        confirmPassword: {
          status: false,
          error: "passwords do not match",
        },
      }));
    } else {
      setValidation((prevState) => ({
        ...prevState,
        confirmPassword: {
          status: true,
          error: "",
        },
      }));
    }
  };

  const FormSubmission = async (e) => {
    console.log("formil ethio");
    e.preventDefault();
    firstNameCheck();
    // console.log(validation.firstName.status);
    emailCheck();
    // console.log(first);
    passwordCheck();
    // console.log(first);
    confirmPasswordCheck();
    // console.log(first);
    if (
      validation.firstName.status == true &&
      validation.email.status == true &&
      validation.password.status == true &&
      validation.confirmPassword.status == true
    ) {
      try {
        console.log("userdata", userData);
        const response = await instance.post("/register", userData);
        console.log(response);
        if (!response.data) {
          setValidation((prevState) => ({
            ...prevState,
            email: {
              status: false,
              message: "Email already exist",
            },
          }));
        } else {
          navigate("/otpVerify", { state: { email: userData.email } });
        }
      } catch (err) {
        toast.error("Something went wrong.Please try again");
      }
    }
  };

  const changeVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    // <div className="h-screen bg-[url('../public/buildings.jpg')]  bg-opacity-25 bg-cover">
    <div className="h-screen bg-cover signupBg">
      <div className="w-full px-6 py-12 h-full  ">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-100">
          <div className="bg-[#000] h-4/5 w-4/5 rounded-3xl flex">
            <div className=" md:w-2/5 h-full bg-[url('../public/buildings.jpg')] bg-cover opacity-100 signupImage rounded-l-3xl"></div>

            <div className=" md:bg-[#ffff] w-4/5 rounded-r-3xl ">
              <div className="mt-4">
                <h3 className="text-stone-900 text-2xl text-center font-semibold ">
                  SIGN UP
                </h3>
                <div className="container mb-10  p-5 flex justify-center items-center flex-wrap">
                  <form onSubmit={FormSubmission}>
                    <div className="h-16">
                      <div className="flex w-fit ">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={userData.firstName}
                          onChange={valueSet}
                          onBlur={firstNameCheck}
                          class="form-control block w-7/12 px-2 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={userData.lastName}
                          onChange={valueSet}
                          className="form-control p-2 block w-7/12 px-2 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                          placeholder="Last Name "
                        />
                      </div>

                      {!validation.firstName.status && (
                        <p className="text-red-300 text-xs">
                          {validation.firstName.error}
                        </p>
                      )}

                      {!validation.lastName.status && (
                        <p className="text-red-300 text-xs">
                          {validation.lastName.error}
                        </p>
                      )}
                    </div>
                    <div className=" h-16">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={valueSet}
                        onBlur={emailCheck}
                        className="form-control block w-full px-1 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                        placeholder="Email address"
                      />
                      {!validation.email.status && (
                        <p className="text-red-300 text-xs">
                          {validation.email.error}
                        </p>
                      )}
                    </div>
                    <div className="h-16">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={userData.password}
                        onChange={valueSet}
                        onBlur={passwordCheck}
                        className="form-control block w-full px-2 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                        placeholder="Password"
                      />
                      <div className="flex">
                        {!validation.password.status && (
                          <p className="text-red-300 text-xs">
                            {validation.password.error}
                          </p>
                        )}
                        {showPassword ? (
                          <RemoveRedEyeIcon onClick={changeVisibility} />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </div>
                    </div>
                    <div className="h-16">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={valueSet}
                        onBlur={confirmPasswordCheck}
                        className="form-control block w-full px-2 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                        placeholder="Confirm Password"
                      />
                      {!validation.confirmPassword.status && (
                        <p className="text-red-300 text-xs">
                          {validation.confirmPassword.error}
                        </p>
                      )}
                    </div>

                    <div className=" mb-4 flex justify-center align-center">
                      <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-orange-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/3"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light">
                        Register
                      </button>
                    </div>
                    <div className=" mb-4">
                      <p className="text-black text-xs text-right font-normal">
                        already have an account?<a href="#">Sign In</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <form>
                <div className="mb-6"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
