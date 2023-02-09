import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "../../config/axios";
import { selectCurrentToken } from "../../features/auth/authSlice";
// import Charts from "./Charts";
function DashBoard() {
  const token = useSelector(selectCurrentToken);
  const [userCount, setUserCount] = useState();
  const [propertyCount, setPropertyCount] = useState();
  const [chatCount, setChatCount] = useState();
  useEffect(() => {
    try {
      const userCount = instance
        .get("/admin/getUserCount", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => setUserCount(data.data.userCount));

      const propertyCount = instance
        .get("/admin/getPropertyCount", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => setPropertyCount(data.data.propertyCount));
      const chatCount = instance
        .get("/admin/getChatCount", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => setChatCount(data.data.chatCount));
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  }, []);
  console.log("fgfg", propertyCount);
  return (
    <div>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="flex flex-col items-center justify-center h-32 rounded bg-gray-50 dark:bg-gray-800">
          <p class="text-2xl text-gray-200 dark:text-gray-200 font-Jost font-semibold">
            Total Users
          </p>
          <p class="text-2xl text-gray-400 dark:text-gray-500">{userCount}</p>
        </div>
        <div class="flex flex-col items-center justify-center h-32 rounded bg-gray-50 dark:bg-gray-800">
          <p class="text-2xl text-gray-200 dark:text-gray-200 font-Jost font-semibold">
            Total Properties
          </p>
          <p class="text-2xl text-gray-400 dark:text-gray-500">
            {propertyCount}
          </p>
        </div>
        <div class="flex flex-col items-center justify-center h-32 rounded bg-gray-50 dark:bg-gray-800">
          <p class="text-2xl text-gray-200 dark:text-gray-200 font-Jost font-semibold">
            Total Chats
          </p>
          <p class="text-2xl text-gray-400 dark:text-gray-500">{chatCount}</p>
        </div>
      </div>
      <div class="flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
        {/* <Charts /> */}
        {/* <p class="text-2xl text-gray-400 dark:text-gray-500">+</p> */}
      </div>
    </div>
  );
}

export default DashBoard;
