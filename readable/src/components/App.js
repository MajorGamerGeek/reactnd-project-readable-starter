import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions/Posts';
import Post from './Post';
import Comment from './Comment';
import Categories from './Categories';
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();

    console.log('props', this.props);
  };

  render() {
    const { posts } = this.props;

    posts.sort((a, b) => a.voteScore < b.voteScore);

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Readable</h2>
        </div>
        <Route exact path="/" render={() => (
          <div>
            <ol className="posts-list">
              {posts && posts.map(post => (<Post key={post.id} post={post} />))}
            </ol>
          </div>
        )} />
        <Route path="/categories" render={() => (
          <div><h1>Categories: </h1><Categories/></div>
        )} />
      </div>
    );
  }
};

function mapStateToProps({ posts }) {
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