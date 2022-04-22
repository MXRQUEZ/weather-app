import React from "react";
import "./styles/main.scss";
import Weather from "./components/weather/weather";

const App = () => {
  return (
    <div className="app">
      <main>
        <Weather />
      </main>
    </div>
  );
};

export default App;
