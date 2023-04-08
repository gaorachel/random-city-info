import React, { useEffect, useState } from "react";
import fetchCountries from "./api/fetchCountries";

function App(response) {
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState("United Kingdom");
  const [capital, setcapital] = useState("London");

  useEffect(() => {
    fetchCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  const handleClick = () => {
    if (!countries) return;

    const i = Math.trunc(Math.random() * countries.data.length);
    setCountry(countries.data[i].name.common);
    setcapital(countries.data[i].capital);
  };

  return (
    <div>
      <div>Country: {country}</div>
      <div>Capital: {capital}</div>
      <div>
        <button onClick={handleClick}> Next </button>
      </div>
    </div>
  );
}

export default App;
