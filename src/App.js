import React, { useState } from "react";
import fetchCountries from "./api/fetchCountries";
import fetchCityImage from "./api/fetchCityImage";
import fetchWeather from "./api/fetchWeather";
import { GridLoader } from "react-spinners";
import { useQuery, useIsFetching } from "@tanstack/react-query";

function App(response) {
  const [country, setCountry] = useState("United Kingdom");
  const [capital, setCapital] = useState("London");

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    onError: () => alert("Couldnt fetch a list of country."),
  });

  const { data: weather } = useQuery({
    queryKey: ["weather", capital],
    queryFn: () => fetchWeather(capital),
    onError: () => alert(`Couldnt fetch the weather data for ${capital}`),
    select: (weather) => {
      const desc = weather?.current?.condition.text;
      const iconSrc = `https:${weather.current?.condition.icon}`;
      const localTime = weather.location?.localtime;

      return { desc, iconSrc, localTime };
    },
  });

  const { data: cityImage } = useQuery({
    queryKey: ["city image", capital],
    queryFn: () => fetchCityImage(capital),
    onError: () => alert(`Couldnt fetch any images for ${capital}.`),
  });

  const handleClick = () => {
    if (!countries) return;

    const i = Math.trunc(Math.random() * countries.data.length);
    setCountry(countries.data[i].name.common);
    setCapital(countries.data[i].capital[0]);
  };

  const isFetching = useIsFetching();
  if (isFetching) return <GridLoader color="#578ce6" margin={4} />;
  if (!weather) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <img alt={capital} src={cityImage} className="w-96 h-96 object-cover" />
        {/** City info card */}
        <div
          className="flex flex-col p-4 w-96 gap-4 absolute bottom-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="flex gap-2 justify-between">
            <p className="text-white">local time</p>
            <p className="text-white">icon</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-medium text-white">City</p>
            <p className="text-xl font-medium text-white">Country</p>
          </div>
        </div>
        {/* <div>Country: {country}</div>
        <div>Capital: {capital}</div>
        <div>
          Weather:
          <img alt={weather.desc} src={weather.iconSrc} />
          {weather.desc}
        </div>
        <div>Local Time: {weather?.localTime} </div>
        <div>
          <button onClick={handleClick}> Next </button>
        </div> */}
      </div>
    </div>
  );
}

export default App;
