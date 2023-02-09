import React, { useState, useEffect } from "react";
import ProfileModal from "../../components/ProfileModal";
import AboutModal from "../../components/AboutModal";
import NavBar from "../../components/NavBar";

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import instance from "../../config/axios";

function ProfilePage() {
  const [editmodalIsOpen, setEditIsOpen] = useState(false);
  const [aboutmodalIsOpen, setAboutIsOpen] = useState(false);
  // const [load, setLoad] = useState(second)
  const [userData, setUserData] = useState({});
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    getData();
    console.log("hii");
  }, []);
  const getData = async () => {
    try {
      console.log("token is:", token);
      const result = await instance.get("profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("result is", result.data.user);
      setUserData(result.data.user);
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };

  function openEditModal() {
    setEditIsOpen(true);
  }
  function openAboutModal() {
    setAboutIsOpen(true);
  }

  function closeEditModal() {
    setEditIsOpen(false);
  }
  function closeAboutModal() {
    setAboutIsOpen(false);
  }

  return (
    <div className="w-full">
      <NavBar />
      <AboutModal
        modalState={aboutmodalIsOpen}
        close={closeAboutModal}
      />
      <ProfileModal
        modalState={editmodalIsOpen}
        close={closeEditModal}
      />
      <div className="grid lg:grid-cols-6 max-w-[98%] bg-stone-200  mx-auto ">
        <div className="md:col-span-1 mx-3 mt-4  bg-white mb-4 flex flex-col rounded-2xl border-black border max-h-60">
          <h1 className="font-Jost text-2xl mx-auto mt-8 mx-4">
            Profile Options:
          </h1>
          <p className="font-Jost text-lg mx-auto mt-12">Profile</p>
          {/* <p className="font-Jost text-lg mx-auto mt-8">My Properties</p> */}
          {/* <ProfileOptions /> */}
        </div>
        <div className="mt-5 mx-2 col-span-3 flex ">
          <div className="mt-2 w-full bg-white mb-4 rounded-2xl border-black border">
            <div className="flex flex-col">
              <p className="mt-2 mx-3 font-Jost text-sm font semibold">
                First Name : {userData?.firstName}
              </p>
              <p className="mt-2 mx-3 font-Jost text-sm font semibold">
                Last Name : {userData?.lastName}
              </p>
              <div className="flex flex-row mt-8">
                <p className="mt-2 mx-3 font-Jost text-sm font semibold">
                  Photo:
                </p>
                {userData?.url ? (
                  <div
                    style={{
                      backgroundImage: `url(${userData.url})`,
                      width: "8rem",
                      height: "8rem",
                    }}
                    className="h-32 w-32] bg-cover bg-center rounded-2xl"></div>
                ) : (
                  <div className="h-32 w-32 bg-[url('profilePic.jpg')] bg-cover bg-center rounded-2xl"></div>
                )}
              </div>
              {/* <div className="mt-3 mx-12">
                <button
                  type="button"
                  className="max-h-10 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">
                  Upload new Image
                </button>
              </div> */}
              <p className="mt-6 mx-3 font-Jost text-sm font semibold">
                Email : {userData?.email}
              </p>
              <p className="mt-6 mx-3 font-Jost text-sm font semibold">
                Mobile Number : {userData?.mobileNumber}
              </p>
              <p className="mt-6 mx-3 font-Jost text-sm font semibold">
                City : {userData?.city}
              </p>
              <p className="mt-6 mx-3 mb-8 font-Jost text-sm font semibold">
                Country : {userData?.country}
              </p>
              <div className="w-full flex justify-end">
                <button
                  className="w-16 h-10 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={openEditModal}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-2">
          <div className="mt-2 mx-2   bg-white mb-4 rounded-2xl border-black border  flex items-center justify-center flex-col">
            {/* <div className="flex flex-row">
              <h1 className="font-Jost font-semibold text-xl mt-6">ABOUT ME</h1>
              
            </div> */}
            <h1 className="font-Jost font-semibold text-xl mt-6">ABOUT ME</h1>
            <p className="mt-10 mx-10 font-Jost text-sm max-w-[70%] mb-16">
              I am a [city/region] real estate agent who works with home
              [buyers/sellers]. After graduating from [your college], I had [X
              experience] and took [X courses] that inspired my passion for real
              estate. My enthusiasm for helping others and [your
              skills/characteristics] help me connect with clients and provide
              them with the best service possible. When I'm not assisting my
              real estate clients, I enjoy [spending time with family,
              volunteering, participating in X hobby, etc.].
            </p>
            <div className="flex items-center justify-center">
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                onClick={openAboutModal}>
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Edit About Me
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
