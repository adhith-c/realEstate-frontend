import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import Maps from "../../components/Maps";
import "./HomePage.css";
import SearchPage from "../../components/SearchBar";
import PropertyCard from "../../components/PropertyCard";
import Footer from "../../components/Footer";
import MyMap from "../../components/MyMap/MyMap";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as turf from "@turf/turf";
import Toast from "../../components/Toast";
import { toast } from "react-toastify";
import instance from "../../config/axios";
// import { io } from "socket.io-client";
mapboxgl.accessToken =
  "pk.eyJ1IjoidW5kZXI4Njc5IiwiYSI6ImNsY3ZudWhmcjAzYnEzb3BoZHV0bjczc3UifQ._LGzT_f5pMq7-OBSXmb3OA";
function HomePage() {
  const [properties, setProperties] = useState([]);
  const token = useSelector(selectCurrentToken);
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const socket = useRef();
  const [lng, setLng] = useState(74.8436891311305);
  const [lat, setLat] = useState(22.593023268136676);
  const [coordinates, setCoordinates] = useState([]);
  const [zoom, setZoom] = useState(1);
  const user = useSelector(selectCurrentUser);
  const [circlePoints, setCirclePoints] = useState([]);
  const [locationPoints, setLocationPoints] = useState([]);
  // const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    // console.log("hii");
    getPropertyData();
  }, [token]);
  const getPropertyData = async () => {
    // console.log("token is:", token);
    try {
      const result = await instance.get("property", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("result is", result.data.properties);
      //  setUserData(result.data.user);
      setProperties(result.data.properties);
      let fin = [];
      result.data.properties.map((property) => {
        let arr = [];
        arr.push(property.longitude, property.lattitude);
        fin.push(arr);
      });
      console.log("push array", fin);
      setLocationPoints(fin);
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };
  useEffect(() => {
    console.log("1 st us3eeff cur", coordinates);
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    //WORKING

    // map.current.on("load", () => {
    //   const points = turf.featureCollection([]);

    //   // add data source to hold our data we want to display
    //   map.current.addSource("circleData", {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [],
    //     },
    //   });

    //   // add a layer that displays the data
    //   map.current.addLayer({
    //     id: "data",
    //     type: "circle",
    //     source: "circleData",
    //     paint: {
    //       "circle-color": "#00b7bf",
    //       "circle-radius": 8,
    //       "circle-stroke-width": 1,
    //       "circle-stroke-color": "#333",
    //     },
    //   });

    //   // on user click, extract the latitude / longitude, update our data source and display it on our map
    //   map.current.on("click", () => {
    //     const lngLat = [11.254844, 75.802692];
    //     points.features.push(turf.point(lngLat));
    //     map.current.getSource("circleData").setData(points);
    //   });
    // });
  }, [coordinates]);
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng);
      setLat(map.current.getCenter().lat);
      setZoom(map.current.getZoom().toFixed(2));
    });

    console.log("coord lebgth", coordinates.length);
    // if (coordinates.length > 0) {
    map.current.on("load", function () {
      console.log("got inside");
      if (map.current.getLayer("circle500")) {
        console.log("get layer of map");
        map.current.removeSource("source_circle_500");
        map.current.removeLayer("circle500");
      }

      console.log("coordinates in map cur", coordinates);
      map.current.addSource(
        "polygon",
        createGeoJSONCircle([75.833578, 11.246209], 0.0)
      );

      map.current.addLayer({
        id: "map",
        type: "fill",
        source: "polygon",
        layout: {},
        paint: {
          "fill-color": "blue",
          "fill-opacity": 0.6,
        },
      });
    });

    var createGeoJSONCircle = function (center, radiusInKm, points) {
      console.log("inside createGeoJSONCircle", coordinates);
      if (!points) points = 64;

      var coords = {
        latitude: center[1],
        longitude: center[0],
      };

      var km = radiusInKm;

      var ret = [];
      var distanceX =
        km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
      var distanceY = km / 110.574;

      var theta, x, y;
      for (var i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
      }
      ret.push(ret[0]);
      setCirclePoints(ret);
      // console.log("ret in create jeo json: ", ret);

      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [ret],
              },
            },
          ],
        },
      };
    };
    // }
    if (coordinates.length > 0) {
      if (map.current.getLayer("searchWithin")) {
        console.log("get layer of map");

        map.current.removeLayer("searchWithin");
        map.current.removeLayer("points");
      }
      new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current);

      map.current.setCenter(coordinates);
      map.current.setZoom(14);
      setLng(coordinates[0]);
      setLat(coordinates[1]);
      console.log("coord above poly", coordinates);
      var center = coordinates; //[20.659698486328125, -103.349609375];
      var options = { steps: 5, units: "kilometers", options: {} };
      var radius = 1;
      var circlePolygon = turf.circle(center, radius, options);
      console.log("circlePolygon: ", circlePolygon.geometry.coordinates[0]);
      let circlePolygonCoords = circlePolygon.geometry.coordinates[0];

      var points = turf.points(
        locationPoints
        // [
        // [-46.6318, -23.5523],
        // [-46.6246, -23.5325],
        // [-46.6062, -23.5513],
        // [-46.663, -23.554],
        // [-46.643, -23.557],
        // ]
      );

      var searchWithin = turf.polygon([
        circlePolygonCoords,
        // [
        // [-46.653, -23.543],
        // [-46.634, -23.5346],
        // [-46.613, -23.543],
        // [-46.614, -23.559],
        // [-46.631, -23.567],
        // [-46.653, -23.56],
        // [-46.653, -23.543],
        // ],
      ]);
      console.log("search within", searchWithin);

      // Find point within polygon
      var ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
      // map.current.on("load", function () {
      // Draw polygon
      if (!map.current.getLayer("searchWithin")) {
        console.log("vivek mon", map.current.getLayer("searchWithin"));
        map.current.addLayer({
          id: "searchWithin",
          type: "fill",
          source: {
            type: "geojson",
            data: searchWithin,
          },
          layout: {},
          paint: {
            "fill-color": "#525252",
            "fill-opacity": 0.8,
          },
        });
        // Draw all points
        map.current.addLayer({
          id: "points",
          type: "circle",
          source: {
            type: "geojson",
            data: points,
          },
          layout: {},
          paint: {
            "circle-radius": 5,
            "circle-color": "red",
            "circle-opacity": 1,
          },
        });
        // Draw points within polygon feature
        map.current.addLayer({
          id: "ptsWithin",
          type: "circle",
          source: {
            type: "geojson",
            data: ptsWithin,
          },
          layout: {},
          paint: {
            "circle-radius": 5,
            "circle-color": "blue",
            "circle-opacity": 1,
          },
        });
      } else {
        console.log("djheeraj mon");
        map.current.getLayer("searchWithin").setData(searchWithin);
      }
      // });
    }

    // map.current.on("mousemove", (e) => {
    //   document.getElementById("info").innerHTML =
    //     // `e.point` is the x, y coordinates of the `mousemove` event
    //     // relative to the top-left corner of the map.
    //     JSON.stringify(e.point) +
    //     "<br />" +
    //     // `e.lngLat` is the longitude, latitude geographical position of the event.
    //     JSON.stringify(e.lngLat.wrap());
    // });
  }, [coordinates]);
  function addGeo() {
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    useEffect(() => {
      // map.on("load", function () {
      // });
      // if (coordinates.length > 0) {
      //   map.current
      //     .getSource("polygon")
      //     .setData(createGeoJSONCircle(coordinates, 1).data);
      // }
      // var createGeoJSONCircle = function (center, radiusInKm, points) {
      //   console.log("inside createGeoJSONCircle", coordinates);
      //   if (!points) points = 64;
      //   var coords = {
      //     latitude: center[1],
      //     longitude: center[0],
      //   };
      //   var km = radiusInKm;
      //   var ret = [];
      //   var distanceX =
      //     km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
      //   var distanceY = km / 110.574;
      //   var theta, x, y;
      //   for (var i = 0; i < points; i++) {
      //     theta = (i / points) * (2 * Math.PI);
      //     x = distanceX * Math.cos(theta);
      //     y = distanceY * Math.sin(theta);
      //     ret.push([coords.longitude + x, coords.latitude + y]);
      //   }
      //   ret.push(ret[0]);
      //   return {
      //     type: "geojson",
      //     data: {
      //       type: "FeatureCollection",
      //       features: [
      //         {
      //           type: "Feature",
      //           geometry: {
      //             type: "Polygon",
      //             coordinates: [ret],
      //           },
      //         },
      //       ],
      //     },
      //   };
      // };
    }, [coordinates]);
  }
  return (
    <div className="w-full">
      {/* <Toast /> */}
      <NavBar />
      <div className="homeBg bg-[url('/public/homebg.jpg')] bg-cover bg-center h-screen flex justify-center items-center">
        <SearchPage
          addGeo={addGeo}
          setCoordinates={setCoordinates}
        />
      </div>
      <div
        className="w-full"
        id="map">
        {/* <MyMap /> */}
        <div className="relative">
          <div
            className="sidebar "
            // onClick={changeMap}
          >
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <pre id="info"></pre>
          <div
            ref={mapContainer}
            className="h-96"
          />
        </div>
      </div>
      <div className="w-full bg-slate-700">
        <div className="flex justify-between item-center h-16 max-w-[1240px] mx-auto px-4">
          {/* <h1 class="text-3xl font-bold underline">Hello world!</h1> */}
          <h1 className="font-bold text-3xl mt-2 text-white">Sort Options</h1>
          <ul className="hidden md:flex ">
            <li className="p-4">Home</li>
            <li className="p-4">Property Type</li>
            <li className="p-4">Listing Type</li>
            <li className="p-4">Chats</li>
            <li className="p-4">Wishlist</li>
          </ul>
        </div>
      </div>
      {/* <div className=" max-w-[1400px] ml-10 mx-auto  bg-slate-700 grid grid-col-3 grid-flow-col">
        <div className="bg-white  w-[350px] flex items-center flex-col ">
          <div className=" text-2xl font-Jost font-semibold">
            Property For Rent
          </div>
          <div className="font-Jost text-sm">123 street ,NewYork ,USA</div>
          <div className=" container bg-[url('login2.jpg')] h-60 w-80 bg-center bg-cover"></div>
        </div>
        <div className="bg-white  w-[350px] flex items-center flex-col ">
          <div className=" text-2xl font-Jost font-semibold">
            Property For Rent
          </div>
          <div className="font-Jost text-sm">123 street ,NewYork ,USA</div>
          <div className=" container bg-[url('login2.jpg')] h-60 w-80 bg-center bg-cover"></div>
        </div>
        <div className="bg-white  w-[350px] flex items-center flex-col ">
          <div className=" text-2xl font-Jost font-semibold">
            Property For Rent
          </div>
          <div className="font-Jost text-sm">123 street ,NewYork ,USA</div>
          <div className="container bg-[url('login2.jpg')] h-60 w-80 bg-center bg-cover"></div>
        </div>
      </div> */}
      <div className="w-full bg-slate-700">
        <div className="w-[80%] mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {properties &&
            properties.map((property) => {
              return (
                <Link
                  to={{
                    pathname: `/propertyDetails/${property._id}`,
                    property: { property },
                  }}>
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                </Link>
              );
            })}

          {/* <PropertyCard />
          <PropertyCard /> 

          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard /> */}
          {/* <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div>
          <div className="w-[300px] h-[200px] bg-white mb-4 flex items-center flex-col"></div> */}
        </div>
      </div>
      <div className="bg-slate-900">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
