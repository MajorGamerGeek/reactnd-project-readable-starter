import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { incrementComment, decrementComment, removeComment, openEditCommentModal } from '../actions/Comments';
import { formatDate } from '../utils/FormatDate';
import EditComment from './EditComment';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  incrementComment = (comment) => {
    this.props.incrementComment(comment);
  };

  decrementComment = (comment) => {
    this.props.decrementComment(comment);
  };
  
  editComment = (event, comment) => {
      event.stopPropagation();
      this.props.openEditCommentModal(comment);
  };
  
  removeComment = (comment) => {
    this.props.removeComment(comment);
  }

  render() {
    const { comment } = this.props;

    return (
      <Row className="comment">
        <Col xs={12} sm={2} md={1} className="comment-voteScore">
          <Glyphicon glyph="triangle-top" className="pointer" onClick={event => this.incrementComment(comment)} />
          <div>{comment.voteScore}</div>
          <Glyphicon glyph="triangle-bottom" className="pointer" onClick={event => this.decrementComment(comment)} />
        </Col>
        <Col xs={12} sm={8} md={10}>
          <div className="comment-body">{comment.body}</div>
          <div className="comment-timeStampAuthor">{formatDate(comment.timestamp)} - {comment.author}</div>
        </Col>
        <Col xs={12} sm={2} md={1}>
          <div>
            <Glyphicon glyph="pencil" className="pointer" onClick={event => this.editComment(event, comment)} />
          </div>
          <div>
            <Glyphicon glyph="trash" className="pointer" onClick={event => this.removeComment(comment)} />
          </div>
        </Col>
        {comment.showModal && <EditComment showModal={comment.showModal} commentToEdit={comment} editComment={true} />}
      </Row>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
		comments: comments.comments
  };
};

function mapDispatchToProps(dispatch) {
  return {
    incrementComment: (comment) => dispatch(incrementComment(comment)),
    decrementComment: (comment) => dispatch(decrementComment(comment)),
    openEditCommentModal: (comment) => dispatch(openEditCommentModal(comment)),
    removeComment: (comment) => dispatch(removeComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);