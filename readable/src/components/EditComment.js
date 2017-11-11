import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Form, FormControl, ControlLabel, FormGroup, Modal, Clearfix } from 'react-bootstrap';
import { addComment, editComment } from '../actions/Comments';

class EditComment extends Component {
  static propTypes = {
    editComment: PropTypes.bool.isRequired,
    comment: PropTypes.object
  }


  componentDidMount() {
    const { comment, editComment } = this.props;

    if (editComment) {
      this.setState((state) => ({
        ...state,
        formData: {
          ...state.formData,
          ...comment
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

  render() {
    const { editFlag } = this.props;
    const { author, body } = this.state.formData;

    return (
      <Modal bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup validationState={this.state.validations.author} controlId="author">
              <Col xs={2}>
                <ControlLabel>Author </ControlLabel>
              </Col>
              <Col xs={10}>
                <FormControl type='text' disabled={editFlag} placeholder='Comment author' value={author} onChange={this.handleChange} />
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
          <Button bsStyle='danger'>Cancel</Button>
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