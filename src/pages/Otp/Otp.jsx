import React, { useEffect, useState } from "react";
import "./Otp.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import instance from "../../config/axios";

function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [minutes, setMinutes] = useState(1);
  const [validate, setValidate] = useState({ status: false, error: "" });
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds == 0) {
        if (minutes == 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  const changeOtp = (e) => {
    setOtp(e.target.value);
  };

  const otpCheck = () => {
    if (otp.length <= 5) {
      setValidate(() => ({
        status: false,
        error: "Otp must be 6 characters long",
      }));
    } else {
      setValidate(() => ({
        status: true,
        error: "",
      }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    otpCheck();
    console.log(otp);
    try {
      if (validate.status) {
        const response = await instance.post("/otpVerify", {
          otp,
          email: location.state.email,
        });
        console.log("data of resp", response.data);
        if (response.data) {
          toast.success("Registered successfully.Please Login");
          navigate("/login");
        } else {
          setValidate((prevState) => ({
            status: false,
            message: "Incorrect Otp",
          }));
          toast.success("Incorrect Otp");
        }
      }
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
    // else {
    //   console.log("otp error");
    // }
  };
  return (
    // <div className="h-screen bg-[url('../public/buildings.jpg')]  bg-opacity-25 bg-cover">
    <div className="h-screen bg-cover otpBg">
      <ToastContainer position="bottom-right" />
      <div className="w-full px-6 py-12 h-full  ">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-100">
          <div className=" md: w-2/5 rounded-r-3xl rounded-l-3xl ">
            <div className="mt-4">
              <h3 className="text-white-900 text-2xl text-center font-semibold ">
                OTP
              </h3>
              <div className="container mb-10  p-5 flex justify-center items-center flex-wrap">
                <form onSubmit={submitForm}>
                  <div className=" h-16">
                    <input
                      type="text"
                      value={otp}
                      onChange={changeOtp}
                      onBlur={otpCheck}
                      className="form-control block w-full px-1 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                      placeholder="Enter The OTP"
                    />
                    {!validate.status && (
                      <p className="text-red-300 text-xs">{validate.error}</p>
                    )}
                  </div>

                  <div className=" mb-4 flex justify-center align-center">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-orange-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-2/3"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light">
                      Verify
                    </button>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <p className="text-white text-xs text-right font-normal">
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          Time Remaining:{" "}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      ) : (
                        <p> Didnt Recieve an OTP?</p>
                      )}

                      {/* <button
                        disabled={seconds > 0 || minutes > 0}
                        type="button"
                        // onClick={resendOtp}
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Resend Otp
                      </button> */}
                      {seconds == 0 && minutes == 0 ? (
                        <button
                          type="button"
                          // onClick={resendOtp}
                          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-2 py-2 text-center mr-2 mb-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                          Resend Otp
                        </button>
                      ) : (
                        ""
                      )}
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
  );
}

export default Otp;
