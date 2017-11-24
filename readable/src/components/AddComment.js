import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from "js-uuid";
import { Button, Col, Form, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import { newComment } from '../actions/Comments';

class AddComment extends Component {
  static propTypes = {
    parentId: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        author: 'anonymous',
        body: ''
      },
      validations: {
        author: null,
        body: null
      }
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  componentDidMount() {
    const { parentId } = this.props;

    this.setState((state) => ({
      ...state,
      formData: {
        ...state.formData,
        parentId
      }
    }))
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
    });
  };

  handleFormSubmit() {
    const { parentId } = this.props;
    const formData = this.state.formData;
    let validations = this.state.validations;
    let formValid = true;

    for (let key in formData) {
      if (!formData[key] || formData[key].length === 0) {
        validations[key] = 'error';
        formValid = false;
      } else {
        validations[key] = 'success';
      }
    }

    if (!formValid) {
      this.setState({ ...this.state, validations });
    } else if (parentId) {
      this.props.newComment({
        ...formData,
        id: uuid.v4(),
        parentId,
        timestamp: Date.now()
      });
    };
  };

  render() {
    const { author, body } = this.state.formData;

    return (
      <Col xs={12}>
        <Form horizontal>
          <label className="form-title-label">Add Comment</label>
          <FormGroup validationState={this.state.validations.author} controlId="author">
            <Col xs={1}>
              <ControlLabel>Author</ControlLabel>
            </Col>
            <Col xs={11}>
              <FormControl type='text' placeholder='Comment author' value={author} onChange={this.handleFormChange} />
            </Col>
          </FormGroup>
          <FormGroup validationState={this.state.validations.body} controlId="body">
            <Col xs={1}>
              <ControlLabel>Body</ControlLabel>
            </Col>
            <Col xs={11}>
              <FormControl rows={10} componentClass="textarea" placeholder="Enter comment" value={body} onChange={this.handleFormChange} />
            </Col>
          </FormGroup>
          <Col xs={12}>
            <Button bsStyle='primary' onClick={this.handleFormSubmit}>Add Comment</Button>
          </Col>
        </Form>
      </Col>
    )
  }
};

function mapStateToProps() {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    newComment: (comment) => dispatch(newComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);