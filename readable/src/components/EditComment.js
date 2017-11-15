import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup, Modal, Clearfix } from 'react-bootstrap';
import { addComment, editComment, closeEditCommentModal } from '../actions/Comments';

class EditComment extends Component {
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
  }


  componentDidMount() {
    const { commentToEdit, editComment } = this.props;

    console.log(commentToEdit);

    if (editComment) {
      this.setState((state) => ({
        ...state,
        formData: {
          ...state.formData,
          ...commentToEdit
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
    })
  }

  handleSubmit() {
  }

  closeModal = () => {
    const { dispatch } = this.props;
		dispatch(closeEditCommentModal());
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
              <Col xs={2}>
                <ControlLabel>Author </ControlLabel>
              </Col>
              <Col xs={10}>
                <FormControl type='text' disabled={editComment} placeholder='Comment author' value={author} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validations.body} controlId="body">
              <Col xs={1}>
                <ControlLabel>Body</ControlLabel>
              </Col>
              <Col xs={11}>
                <FormControl rows={10} componentClass="textarea" placeholder="Enter comment body" value={body} onChange={this.handleChange} />
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

function mapStateToProps() {
  return {
  };
};

export default connect(mapStateToProps)(EditComment);