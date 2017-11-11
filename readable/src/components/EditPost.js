import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/Categories';
import { fetchPost, addPosts, editPost } from '../actions/Posts';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { post_id } = this.props.match.params;

    if (post_id) {
      this.props.fetchPost(post_id).then(res => console.log(res));
    }

  };

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

  handleSubmit() {
    const formData = this.state.formData;
    let validations = this.state.validations;
    let formValid = true;

    for (let key in formData) {
      console.log(formData[key]);

      if (!formData[key] || formData[key].length === 0) {
        validations[key] = 'error';
        formValid = false;
      } else {
        validations[key] = 'success';
      }
    }

    if (!formValid) {
      this.setState({
        ...this.state,
        validations
      });
    }
  }

  render() {
    let { author, title, category, body } = this.state.formData;
    let { post, categories } = this.props;

    console.log(post);
    console.log(categories);

    return (
      <Form>
        <FormGroup controlId="title" validationState={this.state.validations.title}>
          <Col xs={1}>
            <ControlLabel>Title: </ControlLabel>
          </Col>
          <Col xs={12} md={11}>
            <FormControl type="text" value={title} placeholder="Post title" onChange={this.handleFormChange} />
          </Col>
        </FormGroup>
        <FormGroup controlId="category">
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
              rows={10} componentClass="textarea" value={body} onChange={this.handleFormChange} placeholder="Enter Post Body" />
          </Col>
        </FormGroup>
        <FormGroup controlId="author" validationState={this.state.validations.author}>
          <Col xs={1}>
            <ControlLabel>Author: </ControlLabel>
          </Col>
          <Col xs={12} md={11}>
            <FormControl type="text" value={author} placeholder="Author" onChange={this.handleFormChange} />
          </Col>
        </FormGroup>
        <Col xs={12} className="submitButton">
          <Button bsStyle='success' onClick={this.handleSubmit}>Submit</Button>
        </Col>
      </Form>
    )
  }
}

function mapStateToProps(post, categories) {
  return {
    post,
    categories
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (postId) => dispatch(fetchPost(postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);