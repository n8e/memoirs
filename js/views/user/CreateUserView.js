import React, { Component } from 'react';
import Relay from 'react-relay';
import { Grid, Row, Col, Form, FormGroup, FormControl, Checkbox, Button, Panel, ControlLabel, Alert } from 'react-bootstrap';

import SignUpMutation from '../../mutations/SignUpMutation';

const camelToTitleCase = (text) => text
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, str => str.toUpperCase());

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

		this.onSuccess = this.onSuccess.bind(this);
		this.onFailure = this.onFailure.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.renderFormFields = this.renderFormFields.bind(this);
	}

	renderFormFields() {
		const fields = ['firstName', 'lastName', 'userName', 'email', 'password'];
		return fields.map((field, i) => {
			let fieldTitleCase = camelToTitleCase(field);
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

	onSuccess() { this.setState({success: 'block'}); }

	onFailure() { this.setState({fail: 'block'}); }

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({user: Object.assign({}, this.state.user, {[name]: value})});
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
		return (
      <Grid>
        <Row>
          <Panel className="panel-mobile">
            <h2>Sign up</h2>
          </Panel>
        </Row>
        <Row className="page-body">
          <Alert bsStyle="danger" ref="failAlert" style={{display: this.state.fail}}>
            <strong>Sign up failure!</strong> Please try again.
          </Alert>
          <Alert bsStyle="success" ref="successAlert" style={{display: this.state.success}}>
            <strong>Sign up successful!</strong>
          </Alert>
          <div>
            { this.renderFormFields() }
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button onClick={ this.handleSignUp }>
                  Sign up
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Row>
      </Grid>
		);
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
