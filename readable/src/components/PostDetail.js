import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementPost, decrementPost } from '../actions/Posts';
import { fetchPostComments } from '../actions/Comments';
import Comment from './Comment';

class PostDetail extends Component {
  componentDidMount() {
    const { dispatch, post } = this.props;
    dispatch(fetchPostComments(post));
  };

  getPostComments = (postId) => {
    const { comments } = this.props;

    if (comments[postId]) {
      return comments[postId];
    }
    return [];
  };

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
          <div>
            <ol className="posts-list">
              {this.getPostComments(post.id).map(comment => (<Comment key={comment.id} comment={comment} />))}
            </ol>
        </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  };
};

export default connect(mapStateToProps)(PostDetail);