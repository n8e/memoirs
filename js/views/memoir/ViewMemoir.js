import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import { Alert, Grid, Row, Col, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import global from 'global';
import UpdateMemoirMutation from '../../mutations/UpdateMemoirMutation';

const titleCase = text => text.replace(/(^\w|\b\w)/g, m => m.toUpperCase());

class ViewMemoir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: 'none',
      editable: false,
      memoirId: this.props.viewer.oneMemoir.memoirId,
      title: this.props.viewer.oneMemoir.title,
      content: this.props.viewer.oneMemoir.content,
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderEditableFields = this.renderEditableFields.bind(this);
    this.renderUneditableFields = this.renderUneditableFields.bind(this);
  }

  onSuccess() { this.setState({ editable: false }); }

  onFailure() { this.setState({ fail: 'block' }); }

  handleEditing() { this.setState({ editable: !this.state.editable }); }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleUpdate() {
    console.log('GLOBAL - CREATE MEMOIR', global);
    const token = global.token;
    const onSuccess = this.onSuccess;
    const onFailure = this.onFailure;
    Relay.Store.commitUpdate(new UpdateMemoirMutation({
      memoirId: this.props.viewer.oneMemoir.memoirId,
      title: this.state.title,
      content: this.state.content,
      token,
      viewer: this.props.viewer,
    }), { onFailure, onSuccess });
  }

  renderEditableFields() {
    return (
      <div>
        <FormGroup controlId={'formHorizontalMemoirId'}>
          <Col componentClass={ControlLabel} sm={2}>Memoir Id</Col>
          <Col sm={10}>{this.props.viewer.oneMemoir.memoirId}</Col>
        </FormGroup>

        <FormGroup controlId={'formHorizontalTitle'}>
          <Col componentClass={ControlLabel} sm={2}>Title</Col>
          <Col sm={10}>
            <FormControl
              type="text"
              name="title"
              placeholder="Title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId={'formHorizontalContent'}>
          <Col componentClass={ControlLabel} sm={2}>Content</Col>
          <Col sm={10}>
            <FormControl
              name="content"
              componentClass="textarea"
              className="memoir-text-area"
              placeholder="Content"
              onChange={this.handleChange}
              value={this.state.content}
            />
          </Col>
        </FormGroup>
      </div>
    );
  }

  renderUneditableFields() {
    const fields = ['memoirId', 'title', 'content'];
    return fields.map((field, i) => {
      const fieldTitleCase = titleCase(field);
      return (
        <FormGroup key={i} controlId={`formHorizontal${fieldTitleCase}`}>
          <Col componentClass={ControlLabel} sm={2}>
            {fieldTitleCase}
          </Col>
          <Col sm={10}>
            { this.props.viewer.oneMemoir[field] }
          </Col>
        </FormGroup>
      );
    });
  }

  render() {
    return (
      <Grid>
        <Row className="page-body">
          <div>
            <Alert bsStyle="danger" style={{ display: this.state.fail }}>
              <strong>Error!</strong> Failed to update
            </Alert>
            {
              this.state.editable ? this.renderEditableFields() : this.renderUneditableFields()
            }

            { this.state.editable ? (
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button onClick={this.handleUpdate}>Update</Button>
                </Col>
              </FormGroup>
            ) : (
              <div>
                <label className="switch">
                  <input type="checkbox" onChange={this.handleEditing} />
                  <div className="slider round" />
                </label>
                <div>Edit</div>
              </div>
            )}
          </div>
        </Row>
      </Grid>
    );
  }
}

ViewMemoir.propTypes = {
  viewer: PropTypes.shape({
    oneMemoir: PropTypes.shape({
      id: PropTypes.string,
      memoirId: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    }),
  }).isRequired,
};

export default Relay.createContainer(ViewMemoir, {
  initialVariables: {
    memoirId: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${UpdateMemoirMutation.getFragment('viewer')},
        oneMemoir(memoirId: $memoirId) {
          id
          memoirId
          title
          content
        },
      }
    `,
  },
});
