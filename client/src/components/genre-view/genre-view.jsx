import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './genre-view.scss';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies(token) {
    axios.get('https://fun-with-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          movies: response.data
        });
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
      // this.getUser(accessToken);
    }
  }


  render() {
    const { genre } = this.props;
    const { movies } = this.state;

    if (!genre) return null;

    return (
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Name::</Col>
          <Col><h3>{genre.Name}</h3></Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Description:</Col>
          <Col xs={5}>{genre.Description}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={4}><h4 className="my-3">Movies in this genre include:</h4></Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={4}>
            {movies.map(movie => {
              if (movie.Genre.Name === genre.Name) {
                return <p key={movie._id}>{movie.Title}</p>
              }
            })}
          </Col>
        </Row>

        {/* <Col xs={3}></Col>
        <Col xs={1}>Movies in this genre include:</Col>
        <Col xs={5}>
          {movies.map(movie => {
            if (movie.Genre.Name === genre.Name) {
              return <p key={movie._id}>{movie.Title}</p>
            }
          })}
        </Col> */}
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};