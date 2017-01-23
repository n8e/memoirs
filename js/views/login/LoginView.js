import React, { Component } from 'react';
import Relay from 'react-relay';
import { Grid, Row, Col, Form, FormGroup, FormControl, Checkbox, Button, Panel, ControlLabel, Alert } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';

import LoginMutation from '../../mutations/LoginMutation';

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fail: 'none',
      success: 'none',
      user: {
        username: null,
        password: null
      }
    };

    // bind methods
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  onSuccess(res) {
    console.log('Response on view', res.login.userInfo);
    this.setState({success: 'block'});
    // implement transition
    hashHistory.push('/welcome');
  }

  onFailure() {
    this.setState({fail: 'block'});
  }

  handleChange(e) {
    this.setState({user: Object.assign({}, this.state.user, {[e.target.name]: e.target.value})});
  }

  handleLogin() {
    const onSuccess = this.onSuccess;
    const onFailure = this.onFailure;
    Relay.Store.commitUpdate(new LoginMutation({
      username: this.state.user.username,
      password: this.state.user.password,
      viewer: this.props.viewer
    }), {onFailure, onSuccess});
  }

  render() {
    return (
      <Grid>
        <Row>
          <Panel>
            <h2>Login</h2>
          </Panel>
        </Row>
        <Row>
          <Alert bsStyle="danger" ref="failAlert" style={{display: this.state.fail}}>
            <strong>Login failure!</strong> Please try again.
          </Alert>
          <Alert bsStyle="success" ref="successAlert" style={{display: this.state.success}}>
            <strong>Login successful</strong>
          </Alert>
          <Form horizontal>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="username" placeholder="Username" onChange={this.handleChange} />
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
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button onClick={this.handleLogin}>
                  Sign in
                </Button>
              </Col>
            </FormGroup>

            <Col smOffset={2} sm={10}>
              <Link to={`/create`}>Sign up link</Link>
            </Col>
          </Form>
        </Row>
      </Grid>
    )
  }
}

export default Relay.createContainer(LoginView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${LoginMutation.getFragment('viewer')},
        userInfo {
          userName
        }
      }
    `,
  }
});
