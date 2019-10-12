import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { truncate } from 'fs';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: false
    };
  }

  //One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get("https://fun-with-flix.herokuapp.com/movies")
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onNewUser() {
    this.setState({
      newUser: true
    });
  }

  onReturnClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onRegister(user) {
    this.setState({
      user,
      newUser: false
    });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // if the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, newUser } = this.state;

    //if (!user && newUser === false) return <LoginView onRegisterClick={() => this.onRegisterClick()} onLoggedIn={user => this.onLoggedIn(user)} />;

    if (newUser) return <RegistrationView onRegister={user => this.onRegister(user)} />;

    if (!user) return <LoginView onNewUser={() => this.onNewUser()} onLoggedIn={user => this.onLoggedIn(user)} />;

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onReturnClick={() => this.onReturnClick()} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}
