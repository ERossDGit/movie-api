import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { truncate } from 'fs';

import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

import './main-view.scss';
import { isNull } from 'util';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {
      // movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://fun-with-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUser(authData.token);

  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: isNull
    });
    window.open("/", "_self");
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // if the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    // const { movies, user } = this.state;

    // before the movies have been loaded
    // if (!movies) return <div className="main-view" />;

    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router basename="/client">
        <Navbar bg='light '>
          <h1>Fun with Flix</h1>
          {user ? (
            <Link to={"/profile"}>
              <Button variant="link">
                Profile
              </Button>
            </Link>) : (<div></div>)}
          {user ? (
            <Link to={"/"}>
              <Button variant='link'>
                Back to movies
            </Button>
            </Link>) : (<div></div>)}
          {user ? (
            <Link to={"/"}>
              <Button variant='link' onClick={() => this.onLogOut()}>
                Log out
              </Button>
            </Link>) : (<div></div>)}
        </Navbar>
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies} />;
          }} />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }
          } />
          <Route path="/genre/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }
          } />
          <Route path="/profile" render={() => <ProfileView movies={movies} />} />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);

