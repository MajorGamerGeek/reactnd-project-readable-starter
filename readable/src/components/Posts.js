import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions/Posts';
import Post from './Post';

class Posts extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllPosts());

    console.log('props', this.props);
  };

  render() {
    const { posts } = this.props;

    return (
      <div>
        <ol className="posts-list">
          {posts && posts.map(post => (<Post key={post.id} post={post} />))}
        </ol>
      </div>
    );
  }
};

function mapStateToProps({ posts }) {
  return {
    posts: posts.posts
  };
};

export default connect(mapStateToProps)(Posts);