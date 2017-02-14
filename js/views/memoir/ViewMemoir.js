import React, { Component } from 'react';
import Relay from 'react-relay';
import { Grid, Row, Col, FormGroup, Button, ControlLabel } from 'react-bootstrap';

const titleCase = (text) => text.replace(/(^\w|\b\w)/g, (m) => m.toUpperCase());

class ViewMemoir extends Component{
	constructor(props) {
		super(props);
		this.state = {
			memoirId: this.props.viewer.oneMemoir.memoirId,
			title: this.props.viewer.oneMemoir.title,
			content: this.props.viewer.oneMemoir.content,
		};

		this.renderUneditableFields = this.renderUneditableFields.bind(this);
	}

	renderUneditableFields() {
		const fields = ['memoirId', 'title', 'content'];
		return fields.map((field, i) => {
			let fieldTitleCase = titleCase(field);
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
            { this.renderUneditableFields() }
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button onClick={this.handleUpdate}>
                  Update
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Row>
      </Grid>
		);
	}
}

export default Relay.createContainer(ViewMemoir, {
	initialVariables: {
		memoirId: null,
	},
	fragments: {
		viewer: () => Relay.QL`
      fragment on User {
        oneMemoir(memoirId: $memoirId) {
          id
          memoirId
          title
          content
        }
      }
    `
	}
});
