import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {

  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {};
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


  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // if the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}
