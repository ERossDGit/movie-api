import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from "react-router-dom";

import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      faveMovies: [],
      usernameForm: null,
      passwordForm: null,
      emailForm: null,
      birthdayForm: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios.get(`https://fun-with-flix.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userData: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          faveMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteFavoriteMovie(movieId) {
    axios.delete(`https://fun-with-flix.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        console.log(response)
        console.log('successfully deleted')
        this.getUser(localStorage.token)
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleUpdate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .put(
        `https://fun-with-flix.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          Username: this.state.usernameForm,
          Password: this.state.passwordForm,
          Email: this.state.emailForm,
          Birthday: this.state.birthdayForm
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log("Your account details have been updated.");
        localStorage.setItem("user", this.state.usernameForm);
        this.getUser(localStorage.getItem("token"));
        document.getElementsByClassName("updateInfoForm")[0].reset();
      })
      .catch(error => {
        console.log("error");
      });
  }

  deleteUser(e) {
    e.preventDefault();
    axios
      .delete(
        `https://fun-with-flix.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log("Your account has been successfully deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { userData, username, email, birthday, faveMovies } = this.state;

    if (!userData) return null;

    return (

      <Container>
        <Link to={"/"}>
          <Button className='view-btn' variant='primary' type='button'>
            Back to movies
          </Button>
        </Link>
        <Row>
          <Col xs={3}></Col>
          <Col xs={2}>Username:</Col>
          <Col>{username}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={2}>Password:</Col>
          <Col xs={5}>*******</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={2}>Email:  </Col>
          <Col xs={5}>{email}</Col>
        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={2}>Birthday:  </Col>
          <Col xs={5}>{birthday}</Col>
        </Row>

        <Row>
          <Col xs={3}></Col>
          <Col xs={2}>Favorites list:</Col>
          <Col xs={5}>
            {this.props.movies.map(movie => {
              if (movie._id === faveMovies.find(faveMovie => faveMovie === movie._id)) {
                return <p key={movie._id}>{movie.Title}<Button variant='danger' size='sm' onClick={() => this.deleteFavoriteMovie(movie._id)}>Remove</Button></p>
              } else if (!faveMovies) {
                return <p>No Favorite movies added yet...</p>
              }
            })}</Col>
        </Row>

        {/* <div className="favoriteMovies">
          <div className="label">Favorites list:</div>
          {this.props.movies.map(movie => {
            if (movie._id === faveMovies.find(faveMovie => faveMovie === movie._id)) {
              return <p key={movie._id}>{movie.Title}<Button variant='danger' size='sm' onClick={() => this.deleteFavoriteMovie(movie._id)}>Remove</Button></p>
            } else if (!faveMovies) {
              return <p>No Favorite movies added yet...</p>
            }
          })}
        </div> */}
        <Form className="updateInfoForm">
          <Col xs={4}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>User name</Form.Label>
              <Form.Control type="username" placedholder="Update your user name" name='usernameForm' onChange={e => this.handleUpdate(e)} />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placedholder="Password" name="passwordForm" onChange={e => this.handleUpdate(e)} />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placedholder="Email" name="emailForm" onChange={e => this.handleUpdate(e)} />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="birthday" placedholder="Birthday" name="birthdayForm" onChange={e => this.handleUpdate(e)} />
            </Form.Group>
          </Col>
          <Row>
            <Button variant="primary" type="button" onClick={e => this.handleSubmit(e)}>
              Update
            </Button>
            <Col xs={1}></Col>
            <Button className='view-btn' variant='primary' type='button' onClick={e => this.deleteUser(e)}>
              Delete account
            </Button>

          </Row>
        </Form>

      </Container>
    );
  }
}

// ProfileView.propTypes = {
//   director: PropTypes.shape({
//     Username: PropTypes.string.isRequired,
//     Password: PropTypes.string.isRequired,
//     Email: PropTypes.string,
//     Birthday: PropTypes.string
//   }).isRequired
// };