import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';
import Axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://fun-with-flix.herokuapp.com/login', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
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
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placedholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
      </Col>
      <Col xs={2}>
        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="birthday" placedholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
      </Col>
      <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string,
  birthday: PropTypes.string
};
