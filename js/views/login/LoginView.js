import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import { Grid, Row, Col, FormGroup, Checkbox, Panel, Alert } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';
import FRC from 'formsy-react-components';
import LoginMutation from '../../mutations/LoginMutation';
import { storeLoginObj } from '../../reusable/auth';

const { Input } = FRC;

const titleCase = text => text.replace(/(^\w|\b\w)/g, m => m.toUpperCase());

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: 'none',
      success: 'none',
    };

    // bind methods
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.renderFormFields = this.renderFormFields.bind(this);
  }

  onSuccess(res) {
    storeLoginObj({
      loggedIn: res.login.userInfo.loggedIn,
      userName: res.login.userInfo.userName,
      token: res.login.userInfo.token,
    });
    this.setState({ success: 'block' });
    hashHistory.push('/welcome');
  }

  onFailure() {
    this.setState({ fail: 'block' });
  }

  handleLogin(data) {
    const onSuccess = this.onSuccess;
    const onFailure = this.onFailure;
    Relay.Store.commitUpdate(new LoginMutation({
      username: data.username,
      password: data.password,
      viewer: this.props.viewer,
    }), { onFailure, onSuccess });
  }

  renderFormFields() {
    const fields = ['username', 'password'];
    return fields.map((field, i) => {
      const fieldTitleCase = titleCase(field);
      return (
        <Input
          key={i}
          name={field}
          value=""
          label={fieldTitleCase}
          type={(field === 'password') ? 'password' : 'text'}
          placeholder={fieldTitleCase}
          required
        />
      );
    });
  }

  render() {
    let loginForm = null;
    return (
      <Grid>
        <Row>
          <Panel className="panel-mobile">
            <h2>Login</h2>
          </Panel>
        </Row>
        <Row className="page-body">
          <Alert
            bsStyle="danger"
            ref={(failAlert) => { this.failAlert = failAlert; }}
            style={{ display: this.state.fail }}
          >
            <strong>Login failure!</strong> Please try again.
          </Alert>
          <Alert
            bsStyle="success"
            ref={(successAlert) => { this.successAlert = successAlert; }}
            style={{ display: this.state.success }}
          >
            <strong>Login successful!</strong>
          </Alert>
          <FRC.Form
            onSubmit={this.handleLogin}
            layout="horizontal"
            validateOnSubmit
            validatePristine
            disabled={false}
            ref={(form) => { loginForm = form; }}
          >
            <fieldset>

              {this.renderFormFields()}

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Checkbox>Remember me</Checkbox>
                </Col>
              </FormGroup>


              <Col smOffset={2} sm={10}>
                <button type="submit">
									Sign in
								</button>
              </Col>

              <Col smOffset={2} sm={10}>
                <Link to={'/create'}>Sign up link</Link>
              </Col>

            </fieldset>
          </FRC.Form>
        </Row>
      </Grid>
    );
  }
}

LoginView.propTypes = {
  viewer: PropTypes.object.isRequired,
};

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
  },
});
