import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";

class Movies extends Component {
  state = {
    allMovies: getMovies()
  };

  componentDidMount() {
    this.setState({ allMovies: getMovies() });
  }

  handleLike = movie => {
    const allMovies = [...this.state.allMovies];
    const index = allMovies.indexOf(movie);
    allMovies[index] = { ...movie };
    allMovies[index].liked = !allMovies[index].liked;
    this.setState({ allMovies });
  };

  displayLike = movie => {
    if (movie.liked) {
      return <i className="fas fa-heart" />;
    }
    return <i className="far fa-heart" />;
  };

  render() {
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.state.allMovies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td onClick={() => this.handleLike(movie)}>
                  {this.displayLike(movie)}
                </td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
