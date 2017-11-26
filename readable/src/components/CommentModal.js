import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup, Modal, Clearfix } from 'react-bootstrap';
import { updateComment, closeEditCommentModal } from '../actions/Comments';

class CommentModal extends Component {
  static propTypes = {
    commentToEdit: PropTypes.object,
    editComment: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired
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
    const { commentToEdit, editComment } = this.props;
    
    if (editComment) {
      this.setState((state) => ({
        ...state,
        formData: {
          ...state.formData,
          author: commentToEdit.author,
          body: commentToEdit.body
        }
      }))
    }
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
    const { formData, validations } = this.state;
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
    } else if (this.props.editComment) {
      this.props.updateComment({
        ...formData,
        id: this.props.commentToEdit.id,
        timestamp: Date.now()
      });
    };
  };

  closeModal = () => {
    this.props.closeEditCommentModal();
  };

  render() {
    const { editComment, showModal } = this.props;
    const { author, body } = this.state.formData;

    return (
      <Modal show={showModal} bsSize="large" onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup validationState={this.state.validations.author} controlId="author">
              <Col xs={1}>
                <ControlLabel>Author </ControlLabel>
              </Col>
              <Col xs={11}>
                <FormControl type='text' disabled={editComment} placeholder='Comment author' value={author} onChange={this.handleFormChange} />
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
            <Clearfix />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.closeModal}>Cancel</Button>
          <Button bsStyle='success' onClick={this.handleFormSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (comment) => dispatch(updateComment(comment)),
    closeEditCommentModal: () => dispatch(closeEditCommentModal())
  };
};

export default connect(null, mapDispatchToProps)(CommentModal);