import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { incrementComment, decrementComment, removeComment, openEditCommentModal } from '../actions/Comments';
import { decrementCommentCount } from '../actions/Posts';
import { formatDate } from '../utils/FormatDate';
import CommentModal from './CommentModal';

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
    this.props.decrementCommentCount(comment.parentId);
  }

  render() {
    const { comment, commentToEdit, showModal } = this.props;

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
        {(showModal && comment.id === commentToEdit.id) && <CommentModal showModal={showModal} commentToEdit={comment} editComment={true} />}
      </Row>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments: comments.comments,
    commentToEdit: comments.commentToEdit,
		showModal: comments.showModal		
  };
};

function mapDispatchToProps(dispatch) {
  return {
    incrementComment: (comment) => dispatch(incrementComment(comment)),
    decrementComment: (comment) => dispatch(decrementComment(comment)),
    openEditCommentModal: (comment) => dispatch(openEditCommentModal(comment)),
    removeComment: (comment) => dispatch(removeComment(comment)),
    decrementCommentCount: (postId) => dispatch(decrementCommentCount(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);