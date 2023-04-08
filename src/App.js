import React, { useEffect, useState } from "react";
import fetchCountries from "./api/fetchCountries";
import fetchCityImage from "./api/fetchCityImage";

function App(response) {
  const [countries, setCountries] = useState();
  const [country, setCountry] = useState("United Kingdom");
  const [capital, setcapital] = useState("London");
  const [cityImage, setCityImage] = useState("London");

  useEffect(() => {
    fetchCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  useEffect(() => {
    fetchCityImage(capital).then((res) => {
      setCityImage(res);
    });
  }, [capital]);

  const handleClick = () => {
    if (!countries) return;

    const i = Math.trunc(Math.random() * countries.data.length);
    setCountry(countries.data[i].name.common);
    setcapital(countries.data[i].capital[0]);
  };

  return (
    <div>
      <img alt={capital} src={cityImage} />
      <div>Country: {country}</div>
      <div>Capital: {capital}</div>
      <div>
        <button onClick={handleClick}> Next </button>
      </div>
    </div>
  );
}

export default App;
