import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <Row>
          <Col xs={3}><img width={200} height={300} src={movie.ImagePath} /></Col>
          <Col><h1>{movie.Title}</h1></Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Description:</Col>
          <Col xs={5}>{movie.Description}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Genre:  </Col>
          <Col xs={5}>{movie.Genre.Name}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Director:  </Col>
          <Col xs={5}>{movie.Director.Name}</Col>
        </Row>
        {/* <Row>
          <button onClick={() => this.props.onReturnClick()}>Return to Movie List</button>
        </Row> */}
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">View director info</Button>
        </Link>
        <Link to={`/genre/${movie.Genre.Name}`}>
          <Button variant="link">View genre info</Button>
        </Link>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};