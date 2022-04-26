import React from "react";
import "./styles/main.scss";
import Weather from "./components/weather/weather";
import Layout from "./components/layout/layout";

const App = () => {
  return (
    <div className="app">
      <Layout>
        <Weather />
      </Layout>
    </div>
  );
};

export default App;
