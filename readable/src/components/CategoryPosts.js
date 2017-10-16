import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryPosts } from '../actions/Posts';
import Post from './Post';
import '../App.css';

class CategoryPosts extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { category } = this.props.match.params;
    dispatch(fetchCategoryPosts(category));
  };

  render() {
    const { posts } = this.props;
    const { category } = this.props.match.params;
    
    return (
      <div>
        <div>{category} Posts</div>
        <ol className="posts-list">
          {posts && posts.map(post => (<Post key={post.id} post={post} postDetails={false} />))}
        </ol>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

export default connect(mapStateToProps)(CategoryPosts);