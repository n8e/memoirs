import React,{ Component } from 'react';
import Relay from 'react-relay';
import { Grid, Row, Col, Form, FormGroup, FormControl, Checkbox, Button, Panel, ControlLabel, Alert } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';

import LoginMutation from '../../mutations/LoginMutation';
import { storeLoginObj } from '../../reusable/auth';

const titleCase = (text) => text.replace(/(^\w|\b\w)/g, (m) => m.toUpperCase());

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
		this.renderFormFields = this.renderFormFields.bind(this);
	}

	onSuccess(res) {
		storeLoginObj({
			loggedIn: res.login.userInfo.loggedIn,
			userName: res.login.userInfo.userName,
			token: res.login.userInfo.token,
		});
		this.setState({success: 'block'});
		hashHistory.push('/welcome');
	}

	onFailure() {
		this.setState({fail: 'block'});
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({user: Object.assign({}, this.state.user, {[name]: value})});
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

	renderFormFields() {
		const fields = ['username', 'password'];
		return fields.map((field, i) => {
			let fieldTitleCase = titleCase(field);
			return (
				<FormGroup key={i} controlId={`formHorizontal${fieldTitleCase}`}>
					<Col componentClass={ControlLabel} sm={2}>
						{fieldTitleCase}
					</Col>
					<Col sm={10}>
						<FormControl
							type={(field === 'password') ? 'password' : 'text'}
							name={field}
							placeholder={fieldTitleCase}
							onChange={this.handleChange}
						/>
					</Col>
				</FormGroup>
			);
		});
	}

	render() {
		return (
      <Grid>
        <Row>
          <Panel className="panel-mobile">
            <h2>Login</h2>
          </Panel>
        </Row>
        <Row className="page-body">
          <Alert bsStyle='danger' ref='failAlert' style={{display: this.state.fail}}>
            <strong>Login failure!</strong> Please try again.
          </Alert>
          <Alert bsStyle='success' ref='successAlert' style={{display: this.state.success}}>
            <strong>Login successful!</strong>
          </Alert>
          <div>
						{this.renderFormFields()}
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
              <Link to={'/create'}>Sign up link</Link>
            </Col>
          </div>
        </Row>
      </Grid>
		);
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
