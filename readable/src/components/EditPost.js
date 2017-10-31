import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPost, addPosts, editPost } from '../actions/Posts';
import {
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap';

class EditPost extends Component {
  static propTypes = {
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { post_id } = this.props.match.params;
    
    if (post_id) {
      dispatch(fetchPost(post_id));
    }
  };
  
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
        <FormGroup controlId="title" validationState={this.state.validations.title}>
          <Col xs={1}>
            <ControlLabel>Title: </ControlLabel>
          </Col>
          <Col xs={12} md={11}>
            <FormControl type="text"
              value={title}
              placeholder="Post title"
              onChange={this.handleFormChange} />
          </Col>          
        </FormGroup>
        <FormGroup controlId="category" validationState={this.state.validations.body}>
          <Col xs={1}>
            <ControlLabel>Category: </ControlLabel>
          </Col>
          <Col xs={12} md={11}>
            <FormControl
            type="text"
            value={category}
            placeholder="Category"
            onChange={this.handleFormChange} />
          </Col>
        </FormGroup>
        <FormGroup controlId="body" validationState={this.state.validations.body}>
          <Col xs={1}>
            <ControlLabel>Body: </ControlLabel>
          </Col>
          <Col xs={12} md={11}>
            <FormControl
              rows={10}
              componentClass="textarea"
              value={body}
              onChange={this.handleFormChange}
              placeholder="Enter Post Body" />
          </Col>
        </FormGroup>
        <FormGroup controlId="author" validationState={this.state.validations.body}>
          <Col xs={1}>
            <ControlLabel>Author: </ControlLabel>
          </Col>
          <Col xs={12} md={11}>
            <FormControl
            type="text"
            value={author}
            placeholder="Author"
            onChange={this.handleFormChange} />
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