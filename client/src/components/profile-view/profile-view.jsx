import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { user } = this.props;

    if (!user) return null;

    console.log(user);

    return (
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Username:</Col>
          <Col><h1>{user.Username}</h1></Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Password:</Col>
          <Col xs={5}>{user.Password}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Email:  </Col>
          <Col xs={5}>{user.Email}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={1}>Birthday:  </Col>
          <Col xs={5}>{user.Birthday}</Col>
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  director: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string,
    Birthday: PropTypes.string
  }).isRequired
};