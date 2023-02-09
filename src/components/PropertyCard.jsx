import React, { useEffect, useState } from "react";
import { TbLamp, TbBuildingCommunity } from "react-icons/tb";
import { BiHomeHeart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import instance from "../config/axios";
function PropertyCard({ property }) {
  const [saved, setSaved] = useState(false);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("propertyCard", property);
  }, []);
  const savedHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("save button clicked");
      const result = await instance.post(
        `/saved/addToSaved/${property._id}`,
        { propertyId: property._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSaved(!saved);
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
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
      <div className="flex justify-between mt-6">
        <div>
          {saved ? (
            <BiHomeHeart
              onClick={savedHandler}
              style={{ color: "red" }}
            />
          ) : (
            <BiHomeHeart onClick={savedHandler} />
          )}
        </div>
        <div className="font-Jost text-sm">{property.price}</div>
      </div>
    </div>
  );
}

export default PropertyCard;
