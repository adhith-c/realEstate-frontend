import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { MdOutlineClose } from "react-icons/md";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../features/auth/authSlice";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import SellMap from "./SellMap/SellMap";
import DropzoneComponent from "./DropZoneComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function SellModal({ modalState, close }) {
  const [lng, setLng] = useState(74.8436891311305);
  const [lat, setLat] = useState(22.593023268136676);
  const [zoom, setZoom] = useState(1);

  // const [image, setImage] = useState(second)

  const [propertyDrop, setPropertyDrop] = useState(false);
  const [propertyType, setPropertyType] = useState("house");
  const [listingType, setListingType] = useState("forSale");

  function propertyChange(e) {
    setPropertyType(e.target.value);
  }
  function listingChange(e) {
    setListingType(e.target.value);
  }
  const [listingDrop, setListingDrop] = useState(false);
  function openDrop() {
    setPropertyDrop(!propertyDrop);
  }
  function changeDrop() {
    setListingDrop(!listingDrop);
  }

  // function closeDrop() {
  //   setPropertyDrop(false);
  // }
  const [desc, SetDesc] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
  });
  const [image, SetImage] = useState([]);
  let url = [];
  const [propertyData, setPropertyData] = useState({
    propertyName: "",
    price: "",
    // propertyType: "",
    // listingType: "",
    address: "",
    views: "",
    rooms: "",
    bathRooms: "",
    HalfBathRooms: "",
    squareFoot: "",
    yearBuilt: "",
    description: "",
  });
  const imageInput = useRef(null);
  const id = useSelector(selectCurrentUser);
  console.log("id is", id);
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    // getData();
    console.log("hii");
    // SetUrl("");
    url = [];
    SetImage("");
  }, []);

  const valueSet = (e) => {
    // console.log("e.target.name", e.target.name);

    // console.log("e.target.value", e.target.value);
    setPropertyData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const imageHalndler = (e) => {
    e.preventDefault();
    // console.log("hii imagehandler", files);
    try {
      console.log("image: at parent", image);
      const uploaders = image.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "agbr5ubj");
        data.append("cloud_name", "dinwlxluq");
        return axios
          .post(
            "https://api.cloudinary.com/v1_1/dinwlxluq/image/upload",
            data,
            {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }
          )
          .then((response) => {
            const data = response.data;
            // You should store this URL for future references in your app
            console.log(data.url);
            // SetUrl([...url, ...data.url]);
            url.push(data.url);
          });
      });
      axios.all(uploaders).then(async () => {
        console.log("urls :", url);
        var headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const result = await instance
          .post(
            "/property/addProperty",
            { propertyData, propertyType, listingType, url, lat, lng, zoom },
            { headers: headers }
          )
          .then((data) => {
            console.log("data", data.status);
            if (data.status === 200) {
              // setToast("success");
              toast.success("Property added successfully");
            } else {
              // setToast("error");
              toast.error("Property adding Failed");
            }
            close();
          });
        // ... perform after upload is successful operation
      });
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };
  const resetShare = () => {
    SetImage(null);
  };
  function propertySubmit(e) {
    e.preventDefault();
    console.log(propertyData);
    console.log(propertyType, listingType);
    console.log(lat, lng, zoom);
    // console.log(propertyDrop, listingDrop);
  }
  if (!modalState) return null;
  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalState}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Example Modal">
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
              SELL PROPERTY
            </div>
          </div>
          <div className="w-full font-Jost font-black">
            <form>
              <div class="grid gap-6 mb-2 md:grid-cols-2 text-black">
                <div className="">
                  <label
                    for="propertyName"
                    class="block text-sm font-medium text-gray-900 ">
                    Title
                  </label>
                  <input
                    type="text"
                    id="propertyName"
                    name="propertyName"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title"
                    value={propertyData.propertyName}
                    onChange={valueSet}
                    required
                  />
                </div>
                <div className="">
                  <label
                    for="price"
                    class="block text-sm font-medium text-gray-900">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="$123456"
                    value={propertyData.price}
                    onChange={valueSet}
                    required
                  />
                </div>

                <div>
                  {/* <label
                    for="address"
                    class="block  text-sm font-medium text-gray-900">
                    City
                  </label> */}
                  <div>
                    <button
                      id="dropdownDividerButton"
                      data-toggle="dropdownDivider"
                      class="text-white bg-zinc-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-zinc-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={changeDrop}>
                      PROPERTY TYPE
                      <svg
                        class="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>

                    {/* <!-- Dropdown menu --> */}
                    {listingDrop ? (
                      <div
                        id="dropdownDefaultRadio"
                        class="z-10  w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul
                          class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownRadioButton">
                          <li>
                            <div class="flex items-center">
                              <input
                                id="default-radio-1"
                                type="radio"
                                value="plot"
                                checked={propertyType === "plot"}
                                onChange={propertyChange}
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                              <label
                                for="default-radio-1"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Plot
                              </label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center">
                              <input
                                id="default-radio-2"
                                type="radio"
                                value="house"
                                checked={propertyType === "house"}
                                onChange={propertyChange}
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                              <label
                                for="default-radio-2"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                House
                              </label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center">
                              <input
                                id="default-radio-3"
                                type="radio"
                                value="office"
                                checked={propertyType === "office"}
                                onChange={propertyChange}
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                              <label
                                for="default-radio-3"
                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Office
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="hidden"></div>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    id="dropdownDividerButton"
                    data-toggle="dropdownDivider"
                    class="text-white bg-zinc-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-zinc-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={openDrop}>
                    LISTING TYPE
                    <svg
                      class="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {/* <!-- Dropdown menu --> */}
                  {propertyDrop ? (
                    <div
                      id="dropdownDefaultRadio"
                      class="z-10  w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                      <ul
                        class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownRadioButton">
                        <li>
                          <div class="flex items-center">
                            <input
                              id="listingType"
                              type="radio"
                              value="forRent"
                              checked={listingType === "forRent"}
                              onChange={listingChange}
                              name="listingType"
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              for="listingType"
                              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              For Rent
                            </label>
                          </div>
                        </li>
                        <li>
                          <div class="flex items-center">
                            <input
                              id="listingType"
                              type="radio"
                              value="forSale"
                              name="listingType"
                              checked={listingType === "forSale"}
                              onChange={listingChange}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              for="listingType"
                              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              For Sale
                            </label>
                          </div>
                        </li>
                        <li>
                          <div class="flex items-center">
                            <input
                              id="listingType"
                              type="radio"
                              value="vocationalRent"
                              name="listingType"
                              checked={listingType === "vocationalRent"}
                              onChange={listingChange}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              for="listingType"
                              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              For Vacational Rent
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="hidden"></div>
                  )}
                </div>
              </div>
              <div class="mb-6">
                <label
                  for="address"
                  class="block text-sm font-medium text-gray-900 ">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123 street,New York,USA"
                  value={propertyData.address}
                  onChange={valueSet}
                  required
                />
              </div>
              <div className="flex flex-row justify-between mb-2">
                <div className="w-[30%] mx-1">
                  <label
                    for="views"
                    class="block text-sm font-medium text-gray-900 ">
                    Views
                  </label>
                  <input
                    type="text"
                    id="views"
                    name="views"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Gardens,Beach,etc"
                    value={propertyData.views}
                    onChange={valueSet}
                    required
                  />
                </div>
                <div className="w-[30%] mx-1">
                  <label
                    for="rooms"
                    class="block text-sm font-medium text-gray-900 ">
                    Rooms
                  </label>
                  <input
                    type="number"
                    id="rooms"
                    name="rooms"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="5"
                    value={propertyData.rooms}
                    onChange={valueSet}
                    required
                  />
                </div>

                <div className="w-[30%]">
                  <label
                    for="bathRooms"
                    class="block text-sm font-medium text-gray-900">
                    BathRooms
                  </label>
                  <input
                    type="number"
                    id="bathRooms"
                    name="bathRooms"
                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="2"
                    value={propertyData.bathRooms}
                    onChange={valueSet}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between mb-2">
                <div className="w-[30%] mx-1">
                  <label
                    for="yearBuilt"
                    class="block text-sm font-medium text-gray-900 ">
                    Year
                  </label>
                  <input
                    type="text"
                    id="yearBuilt"
                    name="yearBuilt"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="2017"
                    value={propertyData.yearBuilt}
                    onChange={valueSet}
                    required
                  />
                </div>
                <div className="w-[30%] mx-1">
                  <label
                    for="squareFoot"
                    class="block text-sm font-medium text-gray-900 ">
                    Square Footage:
                  </label>
                  <input
                    type="number"
                    id="squareFoot"
                    name="squareFoot"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="200 "
                    value={propertyData.squareFoot}
                    onChange={valueSet}
                    required
                  />
                </div>

                <div className="w-[30%]">
                  <label
                    for="HalfBathRooms"
                    class="block text-sm font-medium text-gray-900">
                    Half BathRooms
                  </label>
                  <input
                    type="number"
                    id="HalfBathRooms"
                    name="HalfBathRooms"
                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="2"
                    value={propertyData.HalfBathRooms}
                    onChange={valueSet}
                    required
                  />
                </div>
              </div>
              <div className="w-full mb-4">
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="block w-[90%] mx-auto p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  rows={8}
                  value={propertyData.description}
                  onChange={valueSet}
                  placeholder="About the property"></textarea>
              </div>
              <div class="mb-2">
                <div class="flex items-center justify-center w-full ">
                  <DropzoneComponent
                    image={image}
                    SetImage={SetImage}
                  />
                </div>
              </div>
              <div className="w-full">
                <SellMap
                  lat={lat}
                  setLat={setLat}
                  lng={lng}
                  setLng={setLng}
                  zoom={zoom}
                  setZoom={setZoom}
                />
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

export default SellModal;
