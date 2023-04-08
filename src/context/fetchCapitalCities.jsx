import axios from "axios";

async function fetchCapitalCities() {
  const response = await axios.get("https://restcountries.com/v3.1/all?fields=capital");

  return response;
}

export default fetchCapitalCities;
