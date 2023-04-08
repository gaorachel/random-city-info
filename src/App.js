import React, { useEffect, useState } from "react";
import fetchCapitalCities from "./context/fetchCapitalCities";

function App(response) {
  const [capitals, setCapitals] = useState();

  useEffect(() => {
    fetchCapitalCities().then((res) => {
      setCapitals(res);
    });
  }, []);

  let capital = "";
  if (!capitals) capital = "London";

  const i = Math.trunc(Math.random() * capitals?.data.length);
  capital = capitals?.data[i].capital;

  const handleClick = () => {
    fetchCapitalCities().then((res) => {
      setCapitals(res);
    });
  };

  return (
    <div>
      Capital City: {capital}
      <button onClick={handleClick}> Next </button>
    </div>
  );
}

export default App;
