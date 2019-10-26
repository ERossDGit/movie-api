import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './director-view.scss';

export class DirectorView extends React.Component {

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
    const { director } = this.props;
    const { movies } = this.state;

    if (!director) return null;

    return (
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Name:</Col>
          <Col><h3>{director.Name}</h3></Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Bio:</Col>
          <Col xs={5}>{director.Bio}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Birth:  </Col>
          <Col xs={5}>{director.Birth}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Death:  </Col>
          <Col xs={5}>{director.Death}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={4}><h4 className="my-3">This director's movies include:</h4></Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={4}>
            {movies.map(movie => {
              if (movie.Director.Name === director.Name) {
                return <p key={movie._id}>{movie.Title}</p>
              }
            })}
          </Col>
        </Row>

      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string,
    Death: PropTypes.string
  }).isRequired
};