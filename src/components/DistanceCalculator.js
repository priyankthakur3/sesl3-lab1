import React, { useState } from "react";

const DistanceCalculator = (props) => {
  const [pointA, setPointA] = useState("");
  const [pointB, setPointB] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [distanceResult, setDistanceResult] = useState("");

  const checkisLongitudeLatitude = (coordinate, type) => {
    if (typeof coordinate !== "number" || isNaN(coordinate)) return false;

    if (type === "long") {
      return coordinate > -180 && coordinate < 180;
    }

    if (type === "lat") {
      return coordinate > -90 && coordinate < 90;
    }
  };

  const calculateDistance = () => {
    const latLngA = pointA.split(",");
    const latA = parseFloat(latLngA[0]);
    const lngA = parseFloat(latLngA[1]);
    const latLngB = pointB.split(",");
    const latB = parseFloat(latLngB[0]);
    const lngB = parseFloat(latLngB[1]);

    if (pointA === "") {
      setErrorMessage("Please Input Point A Co-ordinates");
      return;
    }
    if (pointB === "") {
      setErrorMessage("Please Input Point B Co-ordinates");
      return;
    }
    if (latLngA.length !== 2) {
      setErrorMessage(
        "Co-ordinate for Point A must be in Latitude Longitude Format"
      );
      return;
    }

    if (latLngB.length !== 2) {
      setErrorMessage(
        "Co-ordinate for Point B must be in Latitude Longitude Format"
      );
      return;
    }

    if (isNaN(latA) || isNaN(lngA)) {
      setErrorMessage("Check Co-ordinates of Point A");
      return;
    }

    if (
      !checkisLongitudeLatitude(latA, "lat") ||
      !checkisLongitudeLatitude(lngA, "long")
    ) {
      setErrorMessage("Check Co-ordinates of Point A");
      return;
    }

    if (isNaN(latB) || isNaN(lngB)) {
      setErrorMessage("Check Co-ordinates of Point B");
      return;
    }

    if (
      !checkisLongitudeLatitude(latB, "lat") ||
      !checkisLongitudeLatitude(lngB, "long")
    ) {
      setErrorMessage("Check Co-ordinates of Point B");
      return;
    }

    setErrorMessage("");
    const distance = getDistanceFromLatLonInKm(latA, lngA, latB, lngB);
    props.updatePointsDistance([latA, lngA], [latB, lngB], distance);
    setDistanceResult(`Distance: ${distance.toFixed(2)} KM`);
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="container form">
      <h2>Input Co-ordinates for Point A and Point B</h2>
      <div className="input-group">
        <label htmlFor="pointA">Point A</label>
        <input
          type="text"
          id="pointA"
          value={pointA}
          onChange={(e) => setPointA(e.target.value)}
          placeholder="Enter latitude,longitude"
        />
      </div>
      <div className="input-group">
        <label htmlFor="pointB">Point B</label>
        <input
          type="text"
          id="pointB"
          value={pointB}
          onChange={(e) => setPointB(e.target.value)}
          placeholder="Enter latitude,longitude"
        />
      </div>
      <button onClick={calculateDistance}>Calculate</button>
      <div className="result">
        {errorMessage ? (
          <span>{errorMessage}</span>
        ) : (
          <span>{distanceResult}</span>
        )}
      </div>
    </div>
  );
};

export default DistanceCalculator;
