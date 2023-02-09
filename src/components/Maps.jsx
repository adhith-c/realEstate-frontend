import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { Map, markers } from "mapbox-gl";
const Maps = () => {
  mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;

  return (
    <div
      id="map"
      className="w-[500px] h-[380px]"></div>
  );
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
};

export default Maps;
