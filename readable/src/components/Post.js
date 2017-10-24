import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removePost, incrementPost, decrementPost } from '../actions/Posts';
import { fetchPostComments } from '../actions/Comments';
import Comment from './Comment';
import { formatDate } from '../utils/FormatDate';

class Post extends Component {
  componentDidMount() {
    const { postDetails } = this.props;
    
    if (postDetails) {
      const { dispatch, post } = this.props;
      dispatch(fetchPostComments(post.id));
    }
  };

  removePost = (postId) => {
    const { dispatch } = this.props;
    dispatch(removePost(postId));
  };

  incrementPost = (post) => {
    const { dispatch } = this.props;
    dispatch(incrementPost(post));
  };

  decrementPost = (post) => {
    const { dispatch } = this.props;
    dispatch(decrementPost(post));
  };

  getPostComments = (postId) => {
    const { comments } = this.props;
    let postComments = [];
    
    if (Array.isArray(comments)) {
      postComments = comments.map((comment) => {
        if (comment.parentId === postId) {
          return comment;
        }    
        return [];
      });
    }

    return postComments;
  };

  static propTypes = {
    post: PropTypes.object.isRequired,
    postDetails: PropTypes.bool.isRequired
  }

  render() {
    const { post, postDetails } = this.props;
    console.log(post);
    return (
      <li>
        <div className="post">
          <div className="post-title">{post.title}</div>
          <div className="post-timeStamp">Created: { formatDate(post.timestamp) }</div>
          <div className="post-body">{post.body}</div>
          <div className="post-author">Author: {post.author}</div>
          <div className="post-voteScore">Vote Score: {post.voteScore}</div>
          <div onClick={event => this.incrementPost(post)}>Vote Up</div>
          <div onClick={event => this.decrementPost(post)}>Vote Down</div>
          <div className="post-commentsCount">{post.commentCount} Comments</div>
          {postDetails ?
            <div>
              <ol className="posts-list">
                {this.getPostComments(post.id).map(comment => (<Comment key={comment.id} comment={comment} />))}
              </ol>
            </div>
          : <a href={`/${post.category}/${post.id}`}>Detail View</a>}
          <a href={`/EditPost/${post.id}`}>Edit Post</a>
          <div onClick={event => this.removePost(post.id)}>Delete Post</div>
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

export default connect(mapStateToProps)(Post);