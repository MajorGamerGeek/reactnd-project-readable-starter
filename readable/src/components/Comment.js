import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementComment, decrementComment, removeComment } from '../actions/Comments';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  incrementComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(incrementComment(comment));
  };

  decrementComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(decrementComment(comment));
  };

  removeComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(removeComment(comment));
  }

  render() {
    const { comment } = this.props;

    return (
      <li>
        <div className="comment">
          <div className="comment-id">{comment.id}</div>
          <div className="comment-body">{comment.body}</div>
          <div className="comment-author">Author: {comment.author}</div>
          <div className="comment-voteScore">{comment.voteScore}</div>
          <div onClick={event => this.incrementComment(comment)}>Vote Up</div>
          <div onClick={event => this.decrementComment(comment)}>Vote Down</div>
          <div className="comment-timestamp">{comment.timestamp}</div>
          <div className="comment-parentId">{comment.parentId}</div>
          <div className="comment-deleted">{comment.deleted}</div>
          <div className="comment-parentDeleted">{comment.parentDeleted}</div>
          <div className="comment-delete" onClick={event => this.removeComment(comment)}>Delete Comment</div>
        </div>
      </li>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  };
};

export default connect(mapStateToProps)(Comment);