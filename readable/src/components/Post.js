import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementPost, decrementPost } from '../actions/Posts';

class Post extends Component {
  incrementPost = (post) => {
    const { dispatch } = this.props;
    dispatch(incrementPost(post));
  };

  decrementPost = (post) => {
    const { dispatch } = this.props;
    dispatch(decrementPost(post));
  };

  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    const { post } = this.props;

    return (
      <li>
        <div className="post">
          <div className="post-id">{post.id}</div>
          <div className="post-title">{post.title}</div>
          <div className="book-body">{post.body}</div>
          <div className="book-author">Author: {post.author}</div>
          <div className="book-voteScore">Vote Score: {post.voteScore}</div>
          <div onClick={event => this.incrementPost(post)}>Vote Up</div>
          <div onClick={event => this.decrementPost(post)}>Vote Down</div>
        </div>
      </li>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
};

export default connect(mapStateToProps)(Post);