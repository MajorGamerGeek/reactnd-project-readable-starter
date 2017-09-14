import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    const { post } = this.props;

    return (
      <li>
        <div className="post">
          <div className="post-title">{post.title}</div>
          <div className="book-body">{post.body}</div>
          <div className="book-author">Author: {post.author}</div>
        </div>
      </li>
    )
  }
}

export default Post;