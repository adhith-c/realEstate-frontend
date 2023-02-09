import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyPropertyCard from "../../components/MyPropertyCard";
import NavBar from "../../components/NavBar";
import instance from "../../config/axios";
import { selectCurrentToken } from "../../features/auth/authSlice";

function MyProperties() {
  const [myProperties, setMyProperties] = useState([]);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const result = instance
        .get("/property/myProperties", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          console.log("juiii", data.data);
          setMyProperties(data.data.property);
        });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  }, []);

  return (
    <div className="w-full">
      <NavBar />
      <div className="w-full flex flex-col  mt-4">
        <div className="mt-4 flex items-center justify-center font-Jost font-bold text-3xl">
          <h1 className="border-b border-black">My Properties</h1>
        </div>
        <div className="w-[80%] mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-6">
          {myProperties &&
            myProperties.map((property) => {
              return (
                <MyPropertyCard
                  key={property._id}
                  property={property}
                  goTo={() => navigate(`/propertyDetails/${property._id}`)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MyProperties;
