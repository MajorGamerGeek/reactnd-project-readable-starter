import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions/Posts';
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
    console.log('props', this.props);    
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(fetchAllPosts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);