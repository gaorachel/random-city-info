import axios from "axios";

async function fetchCityImage(city) {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
    },
    params: { query: city },
  });

  return response.data?.results?.[0]?.urls?.regular;
}

export default fetchCityImage;
