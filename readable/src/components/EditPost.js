import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPosts, editPost, closeEditPostModal } from '../actions/Posts';
import { Button, Clearfix,  Col, ControlLabel, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';

class EditPost extends Component {
  static propTypes = {
    postToEdit: PropTypes.object,
    editPost: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired
  }

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
    const { editPost, postToEdit } = this.props;

    if (editPost) {
      this.setState((state) => ({
        ...state,
        formData: {
          ...state.formData,
          ...postToEdit
        }
      }));
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
    const { editPost, postToEdit } = this.props;
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

    if (formValid) {
      if (editPost) {
        this.props.editPost({ ...formData, postToEdit }); 
      } else { 
        this.props.addPost(formData); 
      }
    } else {
      this.setState({
        ...this.state,
        validations
      });
    }
  }

  closeModal = () => {
    const { dispatch } = this.props;
		dispatch(closeEditPostModal());
	};

  render() {
    let { author, title, category, body } = this.state.formData;
    let { categories, editPost, showModal } = this.props;

    return (
      <Modal show={showModal} bsSize="large" onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <FormControl type="text" disabled={editPost} value={category} placeholder="Category" onChange={this.handleFormChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="body" validationState={this.state.validations.body}>
              <Col xs={1}>
                <ControlLabel>Body: </ControlLabel>
              </Col>
              <Col xs={12} md={11}>
                <FormControl rows={10} componentClass="textarea" value={body} onChange={this.handleFormChange} placeholder="Enter Post Body" />
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
            <Clearfix />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.closeModal}>Cancel</Button>
          <Button bsStyle='success' onClick={this.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(categories) {
  return {
    categories: categories.categories
  };
};

export default connect(mapStateToProps)(EditPost);