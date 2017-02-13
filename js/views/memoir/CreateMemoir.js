import React,{ Component } from 'react';
import Relay from 'react-relay';
import { Grid, Row, Col, Panel, Alert, FormGroup, Checkbox, Button, ControlLabel, FormControl } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';

import CreateMemoirMutation from '../../mutations/CreateMemoirMutation';

const titleCase = (text) => text.replace(/(^\w|\b\w)/g, (m) => m.toUpperCase());

class CreateMemoir extends Component{
	constructor(props) {
		super(props);
		this.state = {
			fail: 'none',
			success: 'none',
			memoir: {
				title: null,
				content: null,
			}
		};

		this.handleMemoirSave = this.handleMemoirSave.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
		this.onFailure = this.onFailure.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	onSuccess(res) {
		this.setState({success: 'block'});
		// hashHistory.push('/welcome');
	}

	onFailure() {
		this.setState({fail: 'block'});
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({memoir: Object.assign({}, this.state.memoir, {[name]: value})});
	}

	handleMemoirSave() {
		const onSuccess = this.onSuccess;
		const onFailure = this.onFailure;
		Relay.Store.commitUpdate(new CreateMemoirMutation({
			title: this.state.memoir.title,
			content: this.state.memoir.content,
			viewer: this.props.viewer
		}), {onFailure, onSuccess});
	}

	render() {
		return(
      <Grid>
        <Row className="page-body">
          <Alert bsStyle='danger' ref='failAlert' style={{display: this.state.fail}}>
            <strong>Error!</strong> Failed to save
          </Alert>
          <Alert bsStyle='success' ref='successAlert' style={{display: this.state.success}}>
            <strong>Memoir created successfully!</strong>
          </Alert>
          <div>

            <FormGroup controlId={'formHorizontalTitle'}>
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalContent">
              <Col sm={2}>
                <ControlLabel>Content</ControlLabel>
              </Col>
              <Col sm={10}>
                <FormControl
                  name="content"
                  componentClass="textarea"
                  placeholder="Content"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button onClick={this.handleMemoirSave}>
                  Save
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Row>
      </Grid>
		);
	}
}

export default Relay.createContainer(CreateMemoir, {
	fragments: {
		viewer: () => Relay.QL`
      fragment on User {
        ${CreateMemoirMutation.getFragment('viewer')},
        memoir {
          id
        }
      }
    `
	}
});
