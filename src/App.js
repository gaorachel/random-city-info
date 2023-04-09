import React, { useEffect, useState } from "react";
import fetchCountries from "./api/fetchCountries";
import fetchCityImage from "./api/fetchCityImage";
import fetchWeather from "./api/fetchWeather";
import { GridLoader } from "react-spinners";

function App(response) {
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState();
  const [country, setCountry] = useState("United Kingdom");
  const [capital, setCapital] = useState("London");
  const [cityImage, setCityImage] = useState("London");
  const [weather, setWeather] = useState("raining");

  const weatherDesc = weather.current?.condition.text;

  useEffect(() => {
    setLoading(true);
    fetchCountries().then((res) => {
      setCountries(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchWeather(capital).then((res) => {
      setWeather(res);
      fetchCityImage(capital).then((res) => {
        setCityImage(res);
        setLoading(false);
      });
    });
  }, [capital]);

  const handleClick = () => {
    if (!countries) return;

    const i = Math.trunc(Math.random() * countries.data.length);
    setCountry(countries.data[i].name.common);
    setCapital(countries.data[i].capital[0]);
  };

  if (loading) return <GridLoader color="#578ce6" margin={4} />;

  return (
    <div>
      <img alt={capital} src={cityImage} />
      <div>Country: {country}</div>
      <div>Capital: {capital}</div>
      <div>
        Weather:
        <img alt={weatherDesc} src={`https:${weather.current?.condition.icon}`} />
        {weatherDesc}
      </div>
      <div>Local Time: {weather.location?.localtime} </div>
      <div>
        <button onClick={handleClick}> Next </button>
      </div>
    </div>
  );
}

export default App;
