import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { ImProfile } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import SellModal from "./SellModal";
import { io } from "socket.io-client";
import { getUser } from "../api/ChatRequests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../features/auth/authSlice";

function NavBar() {
  const user = useSelector(selectCurrentUser);
  const socket = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notiState, setNotiState] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  console.log(token);
  const [nav, setNav] = useState(true);
  // const [toast, setToast] = useState("");
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKETURL);
    socket.current.emit("newUser", user);
    // setSocket(io("ws://localhost:8800"));
    // console.log("socket connected", socket);
    // socket?.emit("newUser", user);
  }, []);
  useEffect(() => {
    socket.current.on("recieve-notification", (data) => {
      console.log("msg vanneeeee", data);

      getData(data);

      console.log("data of navbar:", user);
    });
  }, [socket, user, notifications]);
  async function getData(data) {
    console.log("data in fn", data);
    try {
      const singleUser = await getUser(data?.senderId);
      //setUserData(data.data);
      console.log("data in notif sender", singleUser.data.data);
      setNotifications((prevState) => {
        //console.log("0987654321qwertyui", prevState);
        return [
          ...prevState,
          { text: data.text, name: singleUser.data.data.firstName },
        ];
        // ...prevState,
        // data,
      });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  }
  // console.log("notificans vanooo????", user);
  const handleNav = () => {
    setNav(!nav);
  };
  const handleNavigate = () => {
    navigate("/profile");
  };
  const NavigateBackHome = () => {
    navigate("/home");
  };
  const handleSaved = () => {
    navigate("/saved");
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function handleChats() {
    navigate("/chat");
  }
  function NavigateMyProperties() {
    navigate("/myProperties");
  }
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfuly");
    navigate("/home");
  };
  return (
    <div className="flex justify-between item-center h-16 max-w-[1240px] mx-auto px-4 font-Jost">
      <SellModal
        modalState={modalIsOpen}
        close={closeModal}
        //  setToast={setToasts}
      />
      {/* <h1 class="text-3xl font-bold underline">Hello world!</h1> */}
      <h1 className="font-bold text-3xl mt-2 ">BeReal</h1>
      <ul className="hidden md:flex ">
        <li
          className="p-4"
          onClick={NavigateBackHome}>
          Home
        </li>
        <li
          className="p-4"
          onClick={NavigateMyProperties}>
          My Properties
        </li>

        <li className="p-4 relative">
          <button
            value={notiState}
            id="dropdownNotificationButton"
            data-dropdown-toggle="dropdownNotification"
            onClick={() => setNotiState(!notiState)}
            class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
            type="button">
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
            </svg>
            <div class="relative flex">
              <div class="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
            </div>
          </button>
          {notiState && notifications && (
            <div
              id="dropdownNotification"
              class="z-20 absolute mt-8 w-80 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
              aria-labelledby="dropdownNotificationButton">
              <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                Notifications
              </div>
              <div class="divide-y divide-gray-100 dark:divide-gray-700">
                <a
                  href="#"
                  class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div class="flex-shrink-0"></div>
                  <div className="flex flex-col">
                    {notifications.map((notification) => (
                      <div class="w-full pl-3">
                        <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                          New message from
                          <span class="font-semibold text-gray-900 dark:text-white">
                            {notification.name}
                          </span>
                          : {notification.text}
                        </div>
                        <div class="text-xs text-blue-600 dark:text-blue-500">
                          a few moments ago
                        </div>
                      </div>
                    ))}
                  </div>
                </a>
              </div>
              <a
                href="#"
                class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <div class="inline-flex items-center ">
                  <svg
                    class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                  View all
                </div>
              </a>
            </div>
          )}
        </li>

        <li
          className="p-4"
          onClick={handleChats}>
          Chats
        </li>
        <li
          className="p-4  cursor-pointer"
          onClick={handleSaved}>
          Saved
        </li>
        <li className="pt-3">
          <button
            type="button"
            class="text-gray-900 text-sm hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-2 py-1 text-center mr-2 mb-1 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            onClick={openModal}>
            SELL/RENT
          </button>
        </li>
        <li className="p-3  cursor-pointer">
          {/* <div
            className="flex flex-row justify-center items-center"
            onClick={handleNavigate}>
            <ImProfile />
            Profile
          </div> */}

          <div class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              class="absolute w-10 h-10 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              type="button"
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              alt="User dropdown"
              onClick={() => setProfileDropdown(!profileDropdown)}>
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"></path>
            </svg>
          </div>

          {profileDropdown && (
            <div
              id="userDropdown"
              className="z-20 absolute mt-8 -ml-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              {/* <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div class="font-medium truncate">name@flowbite.com</div>
              </div> */}
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton">
                <li className="">
                  <a
                    href="#"
                    onClick={handleNavigate}
                    class="flex items-center justify-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <ImProfile />
                    Profile
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Earnings
                  </a>
                </li> */}
              </ul>
              <div class="py-1">
                <a
                  href="#"
                  class="flex items-center justify-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={handleLogout}>
                  Sign out
                </a>
              </div>
            </div>
          )}
        </li>
      </ul>
      <div
        onClick={handleNav}
        className="block md:hidden mt-4">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed z-10 left-0 top-0 w-[40%] border-r border-r-gray-300 bg-[#ffff] h-full ease-in-out duration-500"
            : "fixed left-[100%]"
        }>
        <h1 className="font-bold text-3xl w-full m-4">React</h1>
        <ul className="pt-12 uppercase">
          <li className="p-4 border-b border-gray-400">Home</li>
          <li className="p-4 border-b border-gray-400">Property Type</li>
          <li className="p-4 border-b border-gray-400">Listing Type</li>
          <li className="p-4 border-b border-gray-400">Chats</li>
          <li className="p-4">Wishlist</li>
        </ul>
        {/* {toast && <Toast type={toast} />} */}
      </div>
    </div>
  );
}

export default NavBar;
