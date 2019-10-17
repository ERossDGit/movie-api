import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://fun-with-flix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log(username)
        console.log(password)
        console.log('no such user')
        console.log('test msg')
      });
  };

  const handleNewUser = (e) => {
    e.preventDefault();
    console.log('new_user');
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    //setUsername('New');
    props.onNewUser();
  };

  return (
    <Form>
      <Col xs={2}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>User name</Form.Label>
          <Form.Control type="username" placedholder="Enter user name" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
      </Col>
      <Col xs={2}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placedholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
      </Col>
      <Col xs={2}>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="secondary" className="ml-2" onClick={handleNewUser}>
          New User
        </Button>
      </Col>
    </Form>

  );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};
