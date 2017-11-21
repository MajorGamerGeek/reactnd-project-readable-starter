import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/Modal';
import { addPosts, editPost } from '../actions/Posts';
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

    this.setState((state) => ({
      ...state,
      formData: {
        ...state.formData,
        ...modal.postToEdit
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

  handleSubmit() {
    const { postToEdit } = this.props;
    const formData = this.state.formData;
    let validations = this.state.validations;
    let formValid = true;

    for (let key in formData) {
      console.log(key);
      console.log(formData[key]);

      if (!formData[key] || formData[key].length === 0) {
        validations[key] = 'error';
        formValid = false;
      } else {
        validations[key] = 'success';
      }
    }

    if (formValid) {
      if (true) {
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

  resetState = () => {
    this.setState({
      formData: {
        author: 'anonymous',
        body: '',
        category: '',
        title: ''
      }
    });
  };

  closeModal = () => {
    this.resetState();
    this.props.closeModal();
  };

  render() {
    let { author, title, category, body } = this.state.formData;
    let { categories, showModal } = this.props;

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
                <FormControl type="text" disabled={true} value={category} placeholder="Category" onChange={this.handleFormChange} />
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

function mapStateToProps({ categories, modal }, ownProps) {
  return {
    ...ownProps,
    categories: categories.categories,
    showModal: modal.showModal,
    modal
  };
};

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDialog);