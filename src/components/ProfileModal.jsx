import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { MdOutlineClose } from "react-icons/md";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../features/auth/authSlice";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import instance from "../config/axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#yourAppElement");

function ProfileModal({ modalState, close }) {
  // const [otpModal, setOtpModal] = useState(false);
  const [desc, SetDesc] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    mobileNumber: "",
  });
  const [image, SetImage] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
  });
  const imageInput = useRef(null);
  const id = useSelector(selectCurrentUser);
  console.log("id is", id);
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    getData();
    console.log("hii");
  }, []);
  // const closeOtpModal = () => {
  //   setOtpModal(false);
  // };
  const getData = async () => {
    try {
      console.log("token:", token);
      const result = await instance.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("result ", result.data.user);
      setUserData(result.data.user);
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };
  const valueSet = (e) => {
    console.log("e.target.name", e.target.name);

    console.log("e.target.value", e.target.value);
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const imageHalndler = (e) => {
    try {
      e.preventDefault();
      console.log("hii imagehandler");
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "agbr5ubj");
      data.append("cloud_name", "dinwlxluq");

      fetch("https://api.cloudinary.com/v1_1/dinwlxluq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("dataaaa'", data);
          // // const id = userDetails._id;
          // console.log(id);
          const url = data.url;
          fetch(`${import.meta.env.VITE_BASEURL}profile/editProfile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url,
              userData,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              close();
              resetShare();
              setUserData("");
              console.log("hijio", data);
              if (data.user) {
                toast.success("Profile updated successfully");
              } else if (data.error) {
                toast.error(data.error.message);
              } else {
                toast.warning(
                  "Somenthing Went Wrong.Try Again after some time"
                );
              }
            });
        })
        .catch((err) => {
          toast.warning("Somethig went Wrong...");
          console.log(err);
        });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };
  const resetShare = () => {
    SetImage(null);
  };
  if (!modalState) return null;
  return (
    <div>
      {/* {otpModal && (
        <OtpModal
          modalState={otpModal}
          close={closeOtpModal}
        />
      )} */}
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalState}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Example Modal">
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
        <div className="w-full  h-[35rem] overflow-scroll scrollbar-hide">
          <div className=" w-full flex  justify-end ">
            <div className="w-10">
              <MdOutlineClose
                size={20}
                onClick={close}
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center items-center font-Jost font-bold text-3xl border-b-2 w-full">
              EDIT PROFILE
            </div>
          </div>
          <div className="w-full font-Jost font-black">
            <form>
              <div class="grid gap-6 mb-2 md:grid-cols-2 text-black">
                <div className="">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-900 ">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    value={userData.firstName}
                    onChange={valueSet}
                    required
                  />
                </div>
                <div className="">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-900">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="lastName"
                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    value={userData.lastName}
                    onChange={valueSet}
                    required
                  />
                </div>

                <div>
                  <label
                    for="City"
                    class="block  text-sm font-medium text-gray-900">
                    City
                  </label>
                  <input
                    type="text"
                    id="City"
                    name="city"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="NewYork"
                    value={userData.city}
                    onChange={valueSet}
                    required
                  />
                </div>
                <div>
                  <label
                    for="Country"
                    class="block text-sm font-medium text-gray-900 ">
                    Country
                  </label>
                  <input
                    type="text"
                    id="Country"
                    name="country"
                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="USA"
                    value={userData.country}
                    onChange={valueSet}
                    required
                  />
                </div>

                <div>
                  <label
                    for="phone"
                    class="block  text-sm font-medium text-gray-900">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="mobileNumber"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123-45-678"
                    maxLength={10}
                    pattern="[0-9]{10}" // pattern="[0-9]{3}[0-9]{2}[0-9]{3}"
                    value={userData.mobileNumber}
                    onChange={valueSet}
                    required
                  />
                </div>
              </div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-900">
                Your Email
              </label>
              <div class="w-full mb-6 flex justify-between">
                <div class="relative mb-6 w-full">
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
                    value={userData.email}
                    disabled
                  />
                </div>
                {/* <button
                  type="button"
                  class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 h-10 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => setOtpModal(true)}>
                  Edit
                </button> */}
              </div>
              <div class="mb-2">
                <div class="flex items-center justify-center w-full ">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="w-full h-full">
                      <FaTimes
                        onClick={resetShare}
                        className="justify-end"
                      />

                      {image ? (
                        <div className="previewImage w-[100%] h-[100%] bg-cover bg-center bg-no-repeat">
                          <div
                            className="bg-contain bg-no-repeat bg-center"
                            style={{
                              backgroundImage: `url(${URL.createObjectURL(
                                image
                              )})`,
                              width: "100%",
                              height: "100%",
                            }}></div>
                        </div>
                      ) : (
                        <div
                          class="w-full flex flex-col items-center justify-center pt-5 pb-6"
                          onClick={() => imageInput.current.click()}>
                          <svg
                            aria-hidden="true"
                            class="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      onChange={(e) => {
                        SetImage(e.target.files[0]);
                        // console.log(image);
                      }}
                      type="file"
                      id="file"
                      ref={imageInput}
                      style={{ display: "none" }}
                      accept="image/x-png,image/gif,image/jpeg"
                      // class="hidden"
                    />
                  </label>
                </div>
              </div>
              <div class="mb-4 flex items-center justify-center">
                <button
                  type="submit"
                  onClick={imageHalndler}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProfileModal;
