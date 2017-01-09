import React, { Component } from 'react';
import Relay from 'react-relay';
import { Grid, Row, Col, Form, FormGroup, FormControl, Checkbox, Button, Panel, ControlLabel, Alert } from 'react-bootstrap';

import SignUpMutation from '../../mutations/SignUpMutation';

class CreateUserView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fail: 'none',
      success: 'none',
      user: {
        firstName: null,
        lastName: null,
        userName: null,
        email: null,
        password: null
      }
    };

    // bind methods
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  onSuccess() {
    this.setState({success: 'block'});
  }

  onFailure() {
    this.setState({fail: 'block'});
  }

  handleChange(e) {
    this.setState({user: Object.assign({}, this.state.user, {[e.target.name]: e.target.value})});
  }

  handleSignUp() {
    const onSuccess = this.onSuccess;
    const onFailure = this.onFailure;
    Relay.Store.commitUpdate(new SignUpMutation({
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      userName: this.state.user.userName,
      email: this.state.user.email,
      password: this.state.user.password,
      viewer: this.props.viewer
    }), {onFailure, onSuccess});
  }

  render() {
    console.log('Create user view state:', this.state.user);
    return (
      <Grid>
        <Row>
          <Panel>
            <h2>Sign up</h2>
          </Panel>
        </Row>
        <Row>
          <Alert bsStyle="danger" ref="failAlert" style={{display: this.state.fail}}>
            <strong>Sign up failure!</strong> Please try again.
          </Alert>
          <Alert bsStyle="success" ref="successAlert" style={{display: this.state.success}}>
            <strong>Sign up successful</strong>
          </Alert>
          <div>
            <FormGroup controlId="formHorizontalFirstName">
              <Col componentClass={ControlLabel} sm={2}>
                First Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalLastName">
              <Col componentClass={ControlLabel} sm={2}>
                Last Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUserName">
              <Col componentClass={ControlLabel} sm={2}>
                User Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="userName" placeholder="User Name" onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="email" placeholder="Email" onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" name="password" placeholder="Password" onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button onClick={this.handleSignUp}>
                  Sign up
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Row>
      </Grid>
    )
  }
}

export default Relay.createContainer(CreateUserView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${SignUpMutation.getFragment('viewer')},
        signUpInfo{
          id
        },
      }
    `,
  }
});
