import axios from "axios";

const apiEndPoint = "http://localhost:3900/api/genres";

export const getGenres = async () => {
  const { data: allGenres } = await axios.get(apiEndPoint);
  genres = allGenres;
  return genres;
};

export let genres = getGenres();
