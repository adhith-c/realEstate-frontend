import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./MyMap.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidW5kZXI4Njc5IiwiYSI6ImNsY3ZudWhmcjAzYnEzb3BoZHV0bjczc3UifQ._LGzT_f5pMq7-OBSXmb3OA";

export default function MyMao() {
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(74.8436891311305);
  // const [lat, setLat] = useState(22.593023268136676);
  // const [zoom, setZoom] = useState(1);

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });

  //   // map.current.addControl(
  //   //   new mapboxgl.GeolocateControl({
  //   //     positionOptions: {
  //   //       enableHighAccuracy: true,
  //   //     },
  //   //     // When active the map will receive updates to the device's location as it changes.
  //   //     trackUserLocation: true,
  //   //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
  //   //     showUserHeading: true,
  //   //   })
  //   // );
  //   map.current.addControl(
  //     new MapboxGeocoder({
  //       accessToken: mapboxgl.accessToken,
  //       mapboxgl: mapboxgl,
  //     })
  //   );
  // }, []);
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng);
  //     setLat(map.current.getCenter().lat);
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  //   const marker = new mapboxgl.Marker();

  //   function add_marker(event) {
  //     const coordinates = event.lngLat;
  //     console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
  //     marker.setLngLat(coordinates).addTo(map.current);
  //     setLat(event.lngLat.lat);
  //     setLng(coordinates.lng);
  //     // console.log("lng state", lng, "lat state:", lat);
  //   }
  //   map.current.on("click", add_marker);

  //   // map.current.on("mousemove", (e) => {
  //   //   document.getElementById("info").innerHTML =
  //   //     // `e.point` is the x, y coordinates of the `mousemove` event
  //   //     // relative to the top-left corner of the map.
  //   //     JSON.stringify(e.point) +
  //   //     "<br />" +
  //   //     // `e.lngLat` is the longitude, latitude geographical position of the event.
  //   //     JSON.stringify(e.lngLat.wrap());
  //   // });
  // }, []);

  // useEffect(() => {
  //   if (!map.current) return;
  //   if (!map.current.marker) {
  //     //   const marker = new mapboxgl.Marker();

  //     //   function add_marker(event) {
  //     //     const coordinates = event.lngLat;
  //     //     console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
  //     //     marker.setLngLat(coordinates).addTo(map.current);
  //     //     setLat(coordinates.lat);
  //     //     setLng(coordinates.lng);

  //     //     console.log("lng state", lng, "lat state:", lat);
  //     //   }
  //     //   map.current.on("click", add_marker);
  //     // } else {
  //     return;
  //   }
  // }, []);

  function changeMap() {
    // map.current.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true,
    //     },
    //     // When active the map will receive updates to the device's location as it changes.
    //     trackUserLocation: true,
    //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
    //     showUserHeading: true,
    //   })
    // );
  }
  return (
    <div className="relative">
      <div
        className="sidebar "
        // onClick={changeMap}
      >
        {/* Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}
      </div>
      <pre id="info"></pre>
      <div
        // ref={mapContainer}
        className="h-96"
      />
    </div>
  );
}
