import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/authApiSlice";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import "./Login.css";
import Loading from "../../components/Loading";
import OtpModal from "../../components/OtpModal";
function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [otpModal, setOtpModal] = useState(false);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ user, pwd }).unwrap();
      console.log("usereData", userData);
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/home");
    } catch (err) {
      console.log("error", err);
      if (!err.originalStatus) {
        setErrMsg("No server Response");
        toast.error("No server response");
      } else if (err.originalStatus?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.originalStatus?.status === 401) {
        setErrMsg("UnAuthorized");
      } else {
        setErrMsg("login failed");
        toast.error("Login failed");
      }
      errRef.current.focus();
    }
  };
  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);
  const closeOtpModal = () => {
    setOtpModal(false);
  };
  // const [validate, setValidate] = useState({
  //   userName: {
  //     status: false,
  //     error: "",
  //   },
  //   password: {
  //     status: false,
  //     error: "",
  //   },
  // });
  const content = isLoading ? (
    <div className="w-full h-screen">
      <Loading />
    </div>
  ) : (
    <div className="h-screen bg-cover loginBg">
      {otpModal && (
        <OtpModal
          modalState={otpModal}
          close={closeOtpModal}
        />
      )}
      <div className="w-full px-6 py-12 h-full  ">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-100">
          <div className="bg-[#000] h-3/5 w-3/5 rounded-3xl flex">
            <div className=" md:w-2/5 h-full bg-[url('../public/login1.jpg')] bg-cover opacity-100 divImage rounded-l-3xl"></div>

            <div className=" md:bg-[#ffff] w-4/5 rounded-r-3xl ">
              <p
                ref={errRef}
                className={errMsg ? "text-red-700 text-xs" : "offscreen"}>
                {errMsg}
              </p>
              <div className="mt-4">
                <h3 className="text-stone-900 text-2xl text-center font-semibold ">
                  SIGN IN
                </h3>
                <div className="container mb-10  p-5 flex justify-center items-center flex-wrap">
                  <form onSubmit={handleSubmit}>
                    <div className=" mb-7">
                      <input
                        type="text"
                        ref={userRef}
                        value={user}
                        onChange={handleUserInput}
                        className="form-control block w-full px-1 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                        placeholder="Email address"
                        autoComplete="true"
                      />
                    </div>
                    <div className=" mb-7">
                      <input
                        type="password"
                        value={pwd}
                        onChange={handlePwdInput}
                        className="form-control block w-full px-2 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                        placeholder="Password"
                      />
                    </div>

                    <div className=" mb-4 flex justify-center align-center">
                      <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-orange-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-2/3"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light">
                        Login
                      </button>
                    </div>
                    <div className=" mb-4">
                      <p className="text-black text-xs text-right font-normal">
                        Dont have an account?
                        <a
                          href="#"
                          className="text-indigo-600">
                          Sign Up
                        </a>
                      </p>
                    </div>
                    <div className=" mb-4 flex items-center justify-center">
                      <p
                        className="text-cyan-800 text-xs text-right font-normal"
                        onClick={() => setOtpModal(true)}>
                        Change username/email
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
  return content;
}

export default Login;
