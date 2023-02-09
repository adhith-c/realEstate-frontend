import { FaSearchLocation } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoidW5kZXI4Njc5IiwiYSI6ImNsY3ZudWhmcjAzYnEzb3BoZHV0bjczc3UifQ._LGzT_f5pMq7-OBSXmb3OA";

// const map = useRef(null);
const SearchBar = ({ addGeo, setCoordinates, mapCircle }) => {
  const [localSearch, setLocalSearch] = useState("");
  const [recommendation, setRecommendation] = useState([]);

  async function getLocation(e) {
    setLocalSearch(e.target.value);
    const result = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${localSearch}.json?limit=8&access_token=${mapboxgl.accessToken}`
    );
    console.log("mapbox", result.data);
    setRecommendation(result.data.features);
    // addGeo();
  }
  function updatePlace(e) {
    console.log(e.place_name);
    console.log(e.geometry.coordinates);
    setLocalSearch(e.place_name);
    setCoordinates(e.geometry.coordinates);
    setRecommendation([]);
    // mapCircle();
  }

  return (
    <div className="flex flex-col w-80">
      <form
        class="flex items-center"
        onSubmit={(e) => e.preventDefault()}>
        <label
          for="simple-search"
          class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <CiLocationArrow1 color="white" />
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={getLocation}
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
      {recommendation && (
        <div className="w-full bg-gray-500 max-h-80 overflow-hidden">
          {recommendation.map((recommend) => {
            return (
              <>
                <span
                  className=""
                  value={recommend.place_name}
                  onClick={() => updatePlace(recommend)}>
                  {recommend.place_name}
                </span>
                ;
                <hr />
              </>
            );
          })}
        </div>
      )}

      {/* <div className="w-full bg-gray-500 max-h-80">
        <span>hiii</span>
      </div> */}
    </div>
  );
};

export default SearchBar;
