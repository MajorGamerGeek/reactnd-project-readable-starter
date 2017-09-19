import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/Categories';
import { fetchAllPosts } from '../actions/Posts';
import Post from './Post';
import Comment from './Comment';
import Categories from './Categories';
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchAllPosts();

    console.log('props', this.props);
  };

  render() {
    const { categories, posts } = this.props;

    posts.sort((a, b) => a.voteScore < b.voteScore);
    
    return (
      <div className="App">
        <div className="App-header">
          <div className="categories">
            {categories && categories.map(category => (
              <div key={category.path}>                
                <a href={`/${category.path}`} className="category-link">
                  <div className="category-name">{category.name}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
        <Route exact path="/" render={() => (
          <div>
            <ol className="posts-list">
              {posts && posts.map(post => (<Post key={post.id} post={post} />))}
            </ol>
          </div>
        )} />
        {categories.map(category => 
        <Route path={`/${category.path}#/`} key={category.path} render={() => (
            <div><h1>Categories: </h1><Categories/></div>
          )} />
        )}

      </div>
    );
  }
};

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchAllPosts: () => dispatch(fetchAllPosts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);