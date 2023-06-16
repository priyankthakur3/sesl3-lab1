import DistanceCalculator from "./components/DistanceCalculator";
import "./App.css";
import MapComponent from "./components/MapComponent";
import { useState } from "react";

function App() {
  console.log(process.env);
  const [points, setPoints] = useState({ pointA: null, pointB: null });
  const [distance, setDistance] = useState("");
  const updatePointsDistance = (newpointA, newpointB, newdistance) => {
    setPoints({ pointA: newpointA, pointB: newpointB });
    setDistance(newdistance);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Distance Calculator</h1>
      </div>
      <div className="App-container">
        <div className="child">
          <DistanceCalculator updatePointsDistance={updatePointsDistance} />
        </div>

        <MapComponent
          pointA={points.pointA}
          pointB={points.pointB}
          distance={distance}
        />

        <footer>
          Lighthall Software Engineering Super League (SESL3) Made by Priyank
          Thakur
        </footer>
      </div>
    </div>
  );
}

export default App;
