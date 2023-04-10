import React, { useState } from "react";
import fetchCountries from "./api/fetchCountries";
import fetchCityImage from "./api/fetchCityImage";
import fetchWeather from "./api/fetchWeather";
import { GridLoader } from "react-spinners";
import { useQuery, useIsFetching } from "@tanstack/react-query";

function App() {
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
  if (isFetching)
    return (
      <GridLoader
        className="absolute top-1/2 left-1/2"
        color="#b3becc"
        margin={4}
      />
    );
  if (!weather) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-sm m-auto">
      <div className="relative">
        {/** City image */}
        <img
          alt={capital}
          src={cityImage}
          className="w-96 h-96 object-cover rounded-xl"
        />
        {/** City info card */}
        <div
          className="flex p-4 w-96 gap-4 absolute bottom-0 justify-between rounded-b-xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="flex flex-col gap-2 justify-between">
            <p className="text-3xl font-medium text-white">{capital}</p>
            <p className="text-xl font-medium text-white">{country}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-white w-max">{weather.localTime}</p>
            <img alt={weather.desc} src={weather.iconSrc} className="w-12" />
          </div>
        </div>
      </div>
      {/** Next button */}
      <button
        onClick={handleClick}
        className="p-2 px-4 self-end bg-slate-300 rounded-md mt-2 shadow-sm hover:bg-slate-400 transition"
      >
        Next
      </button>
    </div>
  );
}

export default App;
