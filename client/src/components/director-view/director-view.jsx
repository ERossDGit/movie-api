import React from 'react';
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

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Name::</Col>
          <Col><h1>{director.Name}</h1></Col>
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