import React, { useEffect, useState } from "react";
import { TbLamp, TbBuildingCommunity } from "react-icons/tb";
import { BiHomeHeart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import instance from "../config/axios";

import ConfirmModal from "./ConfirmModal";
function MyPropertyCard({ property, goTo }) {
  const [sold, setSold] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("propertyCard", property);
  }, []);
  const closeConfirmModal = () => {
    setConfirmModal(false);
  };
  const openModal = (e) => {
    e.preventDefault();
    setConfirmModal(true);
  };
  const savedHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await instance
        .post(
          `/property/markSold/${property._id}`,
          { propertyId: property._id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          console.log("data ", data);
          closeConfirmModal();
          toast.success("Property Marked Sold Successfully");
        });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
    // setSaved(!saved);
  };
  // const loadProperyPage = (e) => {
  //   console.log("clickedd");
  //   navigate(`/propertyDetails/${property._id}`);
  // };
  // console.log("property:  ", property);
  return (
    <div
      className="w-[300px] bg-white mb-4 flex  flex-col rounded drop-shadow-2xl shadow-2xl"
      // onClick={loadProperyPage}
    >
      <ToastContainer
        position="bottom-right"
        type="success"
      />
      <ConfirmModal
        modalState={confirmModal}
        close={closeConfirmModal}
        confirm={savedHandler}
      />

      <div onClick={goTo}>
        <div className="flex justify-center items-center flex-col">
          <div className=" text-2xl font-Jost font-semibold">
            {property.title}
          </div>
          <div className="font-Jost text-sm"> {property.address}</div>
          <div
            className=" container h-40 w-[90%] bg-center bg-cover"
            style={{ backgroundImage: `url(${property.image[0]})` }}></div>
        </div>
        <div className="flex justify-around mt-4">
          <div className="flex">
            <TbLamp />
            <p className="font-Jost text-xs">{property.rooms} Cabins</p>
          </div>
          <div className="flex">
            <TbBuildingCommunity />
            <p className="font-Jost text-xs">{property.squareFoot} Sq.Feet</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        {!property.isSold ? (
          <button
            type="button"
            onClick={openModal}
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  p-1 mx-4  mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Mark SOLD
          </button>
        ) : (
          <span class="bg-red-100 text-red-800 text-sm font-medium mx-4 p-1 mb-2 rounded dark:bg-red-900 dark:text-red-300">
            SOLD
          </span>
        )}

        <div className="font-Jost text-sm">{property.price}</div>
      </div>
    </div>
  );
}

export default MyPropertyCard;
