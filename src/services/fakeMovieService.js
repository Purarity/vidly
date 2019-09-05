import axios from "axios";

const apiEndPoint = "http://localhost:3900/api/movies/";

export const getMovies = async () => {
  const { data: allMovies } = await axios.get(apiEndPoint);
  movies = allMovies;
  return movies;
};

let movies = getMovies();

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export async function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genreId = movie.genreId;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  delete movieInDb._id;

  if (!movieInDb._id) {
    return await axios.post(apiEndPoint, movieInDb);
  }
  const movieURL = `${apiEndPoint}${movieInDb._id}`;
  await axios.put(movieURL, movieInDb);
  return movieInDb;
}

export async function deleteMovie(id) {
  const movieURL = `${apiEndPoint}${id}`;
  await axios.delete(movieURL);
  const updatedMovies = movies.filter(m => m._id !== id);
  console.log(updatedMovies);
  movies = updatedMovies;
  return updatedMovies;
}
