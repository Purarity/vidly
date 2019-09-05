import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import PageNotFound from "./components/pageNotFound";
import MoviesForm from "./components/moviesForm";
import Login from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <NavBar />
        <Switch>
          <Route
            path="/movies/:id"
            render={props => <MoviesForm {...props} />}
          />
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/404" component={PageNotFound} />
          <Redirect path="/" exact to="/movies" />
          <Redirect to="/404" />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
