import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import uuid from "js-uuid";
import { closeModal } from '../actions/Modal';
import { newPost, updatePost } from '../actions/Posts';
import { Button, Clearfix, Col, ControlLabel, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { editComment } from '../actions/Comments';

class ModalDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        author: 'anonymous',
        body: '',
        category: '',
        title: ''
      },
      validations: {
        author: null,
        body: null,
        category: null,
        title: null
      }
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { modal } = nextProps;

    if (!modal.postToEdit || !modal.postToEdit.id) {
      return;
    }

    const post = modal.postToEdit;

    this.setState((state) => ({
      ...state,
      formData: {
        author: post.author,
        body: post.body,
        category: post.category,
        title: post.title
      }
    }));
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

  handleSubmit(event) {
    const { postToEdit } = this.props.modal;
    const formData = this.state.formData;
    let validations = this.state.validations;
    let formValid = true;

    for (let key in formData) {
      if (!formData[key] || formData[key].length === 0) {
        console.log(formData[key]);
        console.log(key);
        validations[key] = 'error';
        formValid = false;
      } else {
        validations[key] = 'success';
      }
    }

    if (formValid) {      
      const POST = {
        ...formData,
        timestamp: Date.now(),
        id: uuid.v4()
      };
      
      if (postToEdit.id) {
        POST.id = postToEdit.id;
        this.props.updatePost(POST);
      } else {
        console.log(formData);
        this.props.newPost(POST);
      }

      this.closeModal();
      this.props.history.push(`/${POST.category}/${POST.id}`);
      event.preventDefault();
    } else {
      console.log('Form NOT valid');
      this.setState({
        ...this.state,
        validations
      });
    }
  }

  resetState = () => {
    this.setState({
      formData: {
        author: 'anonymous',
        body: '',
        category: '',
        title: ''
      },
      validations: {
        author: null,
        body: null,
        category: null,
        title: null
      }
    });
  };

  closeModal = () => {
    this.resetState();
    this.props.closeModal();
  };

  render() {
    let { author, title, category, body } = this.state.formData;
    let { categories, modal } = this.props;

    return (
      <Modal show={modal.showModal} bsSize="large" onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modal.postToEdit.id ? "Edit" : "Add"}  Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {!modal.postToEdit.id && (
              <div>
                <FormGroup controlId="author" validationState={this.state.validations.author}>
                  <Col xs={1}>
                    <ControlLabel>Name: </ControlLabel>
                  </Col>
                  <Col xs={12} md={5}>
                    <FormControl type="text" value={author} placeholder="Your Name" onChange={this.handleFormChange} />
                  </Col>
                </FormGroup>
                <FormGroup controlId="category" validationState={this.state.validations.category}>
                  <Col xs={1}>
                    <ControlLabel>Category: </ControlLabel>
                  </Col>
                  <Col xs={12} md={5}>
                    <FormControl id='category' componentClass='select' onChange={this.handleFormChange} value={category}>
                      <option value="">Select a Category</option>
                      {categories && categories.map((category) => (<option key={category.path} value={category.path}>{category.name}</option>))}
                    </FormControl>
                  </Col>
                </FormGroup>
              </div>
            )}
            <FormGroup controlId="title" validationState={this.state.validations.title}>
              <Col xs={1}>
                <ControlLabel>Title: </ControlLabel>
              </Col>
              <Col xs={12} md={11}>
                <FormControl type="text" value={title} placeholder="Title" onChange={this.handleFormChange} />
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

function mapStateToProps({ categories, modal }, ownProps) {
  return {
    ...ownProps,
    categories,
    modal
  };
};

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch(closeModal()),
    newPost: (post) => dispatch(newPost(post)),
    updatePost: (post) => dispatch(updatePost(post))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalDialog));