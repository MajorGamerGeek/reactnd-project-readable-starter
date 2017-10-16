import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPosts, editPost } from '../actions/Posts';
import {
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap';

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        author: 'anonymous',
        body: '',
        title: ''
      },
      validations: {
        author: null,
        title: null,
        body: null
      }
    }

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    const { id, value } = event.target;
    let formData = this.state.formData;
    formData[id] = value;
    
    this.setState((state) => {
      return {
        ...state,
        formData: {
          ...formData
        }
      }
    })
  }

  render() {
    let { author, title, category, body } = this.state.formData;

    return (
      <Form>
        <FormGroup
          controlId="title" validationState={this.state.validations.title}>
          <ControlLabel>Title: </ControlLabel>
          <FormControl
            type="text"
            value={title}
            placeholder="Post title"
            onChange={this.handleFormChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="body" validationState={this.state.validations.body}>
          <Col xs={2}>
            <ControlLabel>Body: </ControlLabel>
          </Col>
          <Col xs={10}>
            <FormControl
              rows={10}
              componentClass="textarea"
              value={body}
              onChange={this.handleFormChange}
              placeholder="Enter Post Body" />
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

function mapStateToProps() {
  return {
    
  };
};

export default connect(mapStateToProps)(EditPost);