import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { MdOutlineClose, MdTrendingUp } from "react-icons/md";
import instance from "../config/axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "500px",
    transform: "translate(-50%, -50%)",
  },
};

function OtpModal({ modalState, close }) {
  const [oldEmail, setOldEmail] = useState();
  const [newEmailField, setNewEmailField] = useState(false);
  const [email, setEmail] = useState();
  const [verifyPart, setVerifyPart] = useState(false);
  const token = useSelector(selectCurrentToken);
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
  const checkEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await instance
        .post("/getUser", { email: oldEmail })
        .then((res) => {
          console.log("data vane", res.data);
          if (res.data.user) {
            setNewEmailField(true);
          } else {
            toast.error("Not Valid Email");
          }
        });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };
  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await instance
        .post("/changeEmail", { email, oldEmail })
        .then((data) => {
          console.log("data", data.data);
          setVerifyPart(true);
        });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
    // console.log("respo", response);
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    const response = await instance
      .post("/verifyOtp", { otp, email, oldEmail })
      .then((data) => {
        console.log("data", data.data.message);
        if (data.data.message === "invalid-otp") {
          toast.error("Invalid OTP");
        } else if (data.data.message === "otp-expired") {
          toast.error("OTP Expired.Try Again");
        } else if (data.data.message === "verified") {
          toast.success("OTP Verified Successfully.");
        } else {
          toast.warning("Something went wrong");
        }
        close();
        // setVerifyPart(true);
      });
  };
  if (!modalState) return null;
  return (
    <div className="w-[50rem]">
      {/* <ToastContainer position="bottom-right" /> */}
      <Modal
        isOpen={modalState}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="w-full h-[25rem] overflow-scroll scrollbar-hide">
          <div className=" w-full flex  justify-end ">
            <div className="cursor-pointer">
              <MdOutlineClose
                size={20}
                onClick={close}
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center items-center font-Jost font-bold text-3xl border-b-2 w-full">
              Change Email
            </div>
          </div>
          <div className="w-full font-Jost font-black">
            <form onSubmit={checkEmail}>
              <div class="w-full  mt-2  text-black ">
                <div className="w-full mt-2">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-900">
                    Enter Your Email
                  </label>
                  <div class="w-full mb-4 ">
                    <div class="relative mb-6">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@gmail.com"
                        value={oldEmail}
                        onChange={(e) => {
                          setOldEmail(e.target.value);
                        }}
                        disabled={newEmailField}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-4 flex items-center justify-center">
                {!newEmailField && (
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                  </button>
                )}
              </div>
            </form>
            {newEmailField && (
              <form onSubmit={sendOtp}>
                <div class="w-full mb-2  text-black ">
                  <div className="w-full mt-2">
                    <div class="w-full mb-4 ">
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-900">
                        Enter New Email
                      </label>
                      <div class="relative mb-6">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@gmail.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-4 flex items-center justify-center">
                  {!verifyPart && (
                    <button
                      type="submit"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            )}
            {verifyPart && (
              <form onSubmit={verifyOtp}>
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
                      <p className="text-black">
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p className="text-black"> Didnt Recieve an OTP?</p>
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
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OtpModal;
