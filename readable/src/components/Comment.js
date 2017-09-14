import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
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
          <div className="comment-timestamp">{comment.timestamp}</div>
          <div className="comment-parentId">{comment.parentId}</div>
          <div className="comment-deleted">{comment.deleted}</div>
          <div className="comment-parentDeleted">{comment.parentDeleted}</div>
        </div>
      </li>
    )
  }
}

export default Comment;