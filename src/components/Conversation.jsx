import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../api/ChatRequests";

function Conversation({ data, currentUser }) {
  const [userData, setUserData] = useState(null);
  //   const dispatch = useDispatch();

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    console.log("other userid", userId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        console.log("data", data);
        setUserData(data.data);
        // dispatch({ type: "SAVE_USER", data: data });
      } catch (err) {
        toast.error("Something went wrong.Please try again");
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div className="flex flex-row">
          {/* {online && <div className="online-dot"></div>} */}
          <img
            // src={
            //   userData?.profilePicture
            //     ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
            //     : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            // }
            src={userData ? userData.url : "otpBg.jpg"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div
            className="name mx-4"
            style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            {/* <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span> */}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
}

export default Conversation;
