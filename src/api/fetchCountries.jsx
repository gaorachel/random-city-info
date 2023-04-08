import axios from "axios";

async function fetchCountries() {
  const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,capital");

  return response;
}

export default fetchCountries;
