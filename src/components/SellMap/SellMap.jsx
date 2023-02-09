import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./SellMap.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidW5kZXI4Njc5IiwiYSI6ImNsY3ZudWhmcjAzYnEzb3BoZHV0bjczc3UifQ._LGzT_f5pMq7-OBSXmb3OA";

export default function SellMap({ lat, setLat, lng, setLng, zoom, setZoom }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
  }, []);
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng);
      setLat(map.current.getCenter().lat);
      setZoom(map.current.getZoom());
    });
    const marker = new mapboxgl.Marker();
    setZoom(map.current.getZoom());
    function add_marker(event) {
      const coordinates = event.lngLat;
      const cordzoom = event.zoom;
      console.log(
        "Lng:",
        coordinates.lng,
        "Lat:",
        coordinates.lat,
        "zoom",
        zoom
      );
      marker.setLngLat(coordinates).addTo(map.current);
      setLat(event.lngLat.lat);
      setLng(coordinates.lng);
    }
    map.current.on("click", add_marker);
  }, [zoom]);

  return (
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
  );
}
