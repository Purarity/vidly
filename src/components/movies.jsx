import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    allMovies: [],
    allGenres: [],
    selectedGenre: "All Genres",
    sortColumn: { column: "title", order: "asc" },
    pageSize: 4,
    currentPage: 1,
    searchQuery: ""
  };

  displayedMovies = 0;

  async componentDidMount() {
    let genres = await getGenres();
    genres = [{ name: "All Genres" }, ...genres];
    const allMovies = await getMovies();
    this.setState({ allMovies, allGenres: genres });
  }

  handleLike = movie => {
    const allMovies = [...this.state.allMovies];
    const index = allMovies.indexOf(movie);
    allMovies[index] = { ...movie };
    allMovies[index].liked = !allMovies[index].liked;
    this.setState({ allMovies });
  };

  handleDelete = async movieToDelete => {
    const updatedMoviesList = await deleteMovie(movieToDelete._id);
    this.setState({ allMovies: updatedMoviesList });
    this.displayedMovies--;
    if (this.displayedMovies === 0) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  handleGenreSelect = genre => {
    genre.name === "All Genres"
      ? this.setState({ selectedGenre: "All Genres" })
      : this.setState({ selectedGenre: genre });

    this.setState({ currentPage: 1, searchQuery: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getVisibleMovies = () => {
    const {
      allMovies,
      selectedGenre,
      sortColumn,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;

    let filteredMovies = allMovies;

    if (searchQuery) {
      filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredMovies =
        selectedGenre === "All Genres"
          ? allMovies
          : allMovies.filter(movie => movie.genre.name === selectedGenre.name);
    }
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.column],
      sortColumn.order
    );

    const paginated = paginate(sortedMovies, currentPage, pageSize);

    return {
      count: filteredMovies.length,
      paginated: paginated,
      sortedMovies: sortedMovies
    };
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, currentPage: 1, selectedGenre: "All Genres" });
  };

  render() {
    const {
      allMovies,
      allGenres,
      selectedGenre,
      sortColumn,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;
    if (allMovies.length === 0) {
      return <h5>There are no movies in the database.</h5>;
    }

    const { count, paginated: movies } = this.getVisibleMovies();

    this.displayedMovies = movies.length;

    return (
      <React.Fragment>
        <div className="row" align="center">
          <div className="col-2 pt-3" align="left">
            <ListGroup
              groups={allGenres}
              selectedGroup={selectedGenre}
              onGroupSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <div className="pt-3" align="left">
              <Link to="/movies/new" className="btn btn-primary">
                New Movie
              </Link>
            </div>
            <p align="left" className="pt-3">
              Showing {count} movies in the database.
            </p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              items={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={count}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
