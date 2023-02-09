import NavBar from "../../components/NavBar";
import Maps from "../../components/Maps";
// import PropertyCard from "../../components/PropertyCard";
import Footer from "../../components/Footer";
import PropertyMap from "../../components/PropertyMap/PropertyMap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import axios from "axios";
import instance from "../../config/axios";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const PropertyPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  // console.log("params", params.id);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const [property, setProperty] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setmainImage] = useState("");

  useEffect(() => {
    console.log("hii");
    setIsLoading(true);
    try {
      getPropertyData();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);
  const getPropertyData = async () => {
    try {
      console.log("token is:", token);
      const id = params.id;
      const result = await instance.get(`property/singleProperty/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("result is", result.data.property);
      //  setUserData(result.data.user);
      setProperty(result.data.property);
      setmainImage(result.data.mainImg);
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };
  const chatWithSeller = async (id) => {
    try {
      console.log("user Id ", id);
      console.log("user is", user);
      const res = await instance.post(
        "/chat",
        { senderId: user, recieverId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", res.status);
      if (res.status == 200 || res.status === 201) {
        toast.success("Created a chat room with seller");
        navigate("/chat");
      } else {
        toast.error("Unexpected error occured while creating chat room");
      }
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };
  return (
    <div className="w-full max-w-[100%]">
      <NavBar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-3  max-w-[98%] flex">
          <div className="flex flex-col w-[65%] ">
            <div
              className="bg-cover bg-center mt-8 mx-10 h-[500px] w-[90%]"
              style={{
                backgroundImage: `url(${mainImage})`,
              }}></div>
            <div className="mt-5 mx-20 my-10 flex">
              {property.image &&
                property.image.map((img) => {
                  return (
                    <div
                      className="mx-2  bg-cover bg-blend-soft-light bg-center h-36 w-52"
                      style={{
                        backgroundImage: `url(${img})`,
                      }}></div>
                  );
                })}
              {/* <div className="mx-7 bg-[url('OtpBg.jpg')] bg-cover bg-blend-soft-light bg-center h-40 w-52"></div>
            <div className="mx-7 bg-[url('OtpBg.jpg')] bg-cover bg-blend-soft-light bg-center h-40 w-52"></div>
            <div className="mx-7 bg-[url('OtpBg.jpg')] bg-cover bg-blend-soft-light bg-center h-40 w-52"></div> */}
            </div>
          </div>

          <div className="mt-8 mx-8 font-Jost text-black">
            <div className="border-b-2">
              <h1 className=" font-bold  text-3xl">{property.title}</h1>
              <p className="text-sm mt-3">{property.address}</p>
              <p className="text-xs mt-3">{property.squareFoot} Sq.Ft</p>
              <p className="text-lg mt-3 mb-6 text-red-700">
                ₹ {property.price}
              </p>
            </div>
            <div>
              <h1 className=" font-bold  text-3xl mt-9 mb-6">BASIC DETAILS</h1>
              <p className="text-sm mt-2">Parent: {property.userName}</p>
              <p className="text-xs mt-2">
                Property Type: {property.propertyType}
              </p>
              <p className="text-sm mt-2">
                Listing Type: {property.listingType}
              </p>
              {/* <p className="text-xs mt-2">Listing Id: 1064</p> */}
              <p className="text-sm mt-2">Price: ₹{property.price}</p>
              <p className="text-xs mt-2">View: {property.views}</p>
              <p className="text-sm mt-2">Rooms: {property.rooms}</p>
              <p className="text-xs mt-2">BathRooms: {property.bathRooms}</p>
              <p className="text-xs mt-2">
                Half BathRooms: {property.HalfBathRooms}
              </p>
              <p className="text-xs mt-2">
                Square Footage: {property.squareFoot} ft.
              </p>
              {/* <p className="text-xs mt-2">Floors: 1</p> */}
              <p className="text-xs mt-2">Year Built: {property.yearBuilt}</p>
              <button
                type="button"
                className=" mt-16 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => chatWithSeller(property.userId)}>
                Chat with Seller
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container px-12 pt-3  text-black  max-w-[98%] flex-col">
        <h1 className=" font-bold  text-3xl mx-3">Property Description</h1>
        <p className="text-sm mt-3 mx-3">{property.Description}</p>
      </div>
      <div className="container px-12 pt-3 bg-red text-black  max-w-[98%] flex">
        <div className=" mt-8  h-[500px] w-[65%] bg-red">
          <h1 className="font-Jost text-2xl font-semibold mb-10">LOCATION</h1>
          {property && (
            <PropertyMap
              lattitude={property.lattitude}
              longitude={property.longitude}
              zoom={property.zoom}
            />
          )}
        </div>
        <div className="mt-8 mx-8 flex items-center justify-center flex-col">
          <div className="mt-4">
            <p className="pt-8">Lattitude : {property.lattitude}</p>
            <p className="pt-8">Longitude : {property.longitude}</p>
          </div>
          <div className="mt-20">
            <h1 className="font-Jost text-lg">Sellers Info</h1>
            <div className="flex flex-row">
              <div className="mx-auto bg-[url('OtpBg.jpg')] bg-cover bg-center h-24 w-24"></div>
              <div className=" mx-4 flex justify-center items-center flex-col">
                <p className="font-Jost">{property.userName}</p>
                <p className="font-Jost">{property.userMail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-12 pt-3 text-black max-w-[98%] border-b-2">
        <h1 className="font-Jost text-2xl font-semibold mx-10">
          Contact Seller
        </h1>
        <div className="w-full  mx-10 flex">
          <input
            type="text"
            placeholder="Full name:"
            className="h-8 w-1/5 rounded-xl mx-10 mt-5 bg-slate-200 font-Jost text-center"
          />
          <input
            type="text"
            placeholder="Email:"
            className="h-8 w-1/5 rounded-xl mx-10 mt-5 bg-slate-200 font-Jost text-center"
          />
          <input
            type="text"
            placeholder="Mobile Number:"
            className="h-8 w-1/5 rounded-xl mx-10 mt-5 bg-slate-200 font-Jost text-center"
          />
        </div>
        <div className=" max-h-[20] w-full mx-20 mt-8 ">
          <div className="">
            <textarea
              name="message"
              className="max-w-[73%] w-full rounded bg-slate-200 text-black "
              rows={6}
              placeholder="Message"></textarea>
          </div>
          <div className="mt-3 max-w-[74%] flex justify-end">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="w-fullfont-Jost text-black ">
        <div className=" mt-4 flex items-center justify-center font-bold text-2xl ">
          <h1 className="text-orange-600">SIMILAR PROPERTIES</h1>
        </div>
        <div className="font-Jost text-black mt-6">
          <div className="w-[80%] mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* <PropertyCard />
            <PropertyCard />
            <PropertyCard /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyPage;
