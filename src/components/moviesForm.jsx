import React from "react";
import axios from "axios";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class movieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  async componentDidMount() {
    const { match, history } = this.props;

    const { data } = await axios.get("http://localhost:3900/api/genres");
    const genres = [{ _id: "", name: "" }, ...data];
    this.setState({ genres });

    const movieId = match.params.id;
    if (movieId === "new") {
      return;
    }

    const movie = getMovie(movieId);

    if (!movie) {
      return history.replace("/404");
    }

    this.setState({ data: this.mapToViewModel(movie) });
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = () => {
    this.props.history.push("/movies");
    saveMovie(this.state.data);
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number In Stock")}
        {this.renderInput("dailyRentalRate", "Rate")}
        {this.renderButton("Save", this.doSubmit)}
      </React.Fragment>
    );
  }
}

export default movieForm;
