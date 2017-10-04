import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPost, fetchAllPosts } from '../actions/Posts';
import Post from './Post';
import PostDetail from './PostDetail';

class Posts extends Component {
  static propTypes = {
    detailView: PropTypes.bool.isRequired
  }

  componentDidMount() {
    const { dispatch, detailView } = this.props;

    if (detailView) {
      const { post_id } = this.props.match.params;
      dispatch(fetchPost(post_id));
    } else {
      dispatch(fetchAllPosts());
    }   

    console.log('props', this.props);
  };

  render() {
    const { posts, detailView } = this.props;

    return (
      <div>
        <ol className="posts-list">
          {posts && detailView ? posts.map(post => (<PostDetail key={post.id} post={post} />)) : posts && posts.map(post => (<Post key={post.id} post={post} />))}
        </ol>
      </div>
    );
  }
};

function mapStateToProps({ posts, post_id }) {
  return {
    posts: posts.posts,
    post_id
  };
};

export default connect(mapStateToProps)(Posts);