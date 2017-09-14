import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions/Posts';
import Post from './Post';
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
    console.log('props', this.props);    
  };

  render() {
    const { posts } = this.props;
    console.log(this.props);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Readable</h2>
        </div>
        <div>
          <ol className="posts-list">
            {posts && posts.map(post => (<Post key={post.id} post={post} />))}
          </ol>
        </div>
      </div>
    );
  }
}

function mapStateToProps({posts}) {
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);