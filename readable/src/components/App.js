
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchCategories } from '../actions/Categories';
import Posts from './Posts';
import CategoryPosts from './CategoryPosts';
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  };

  render() {
    const { categories } = this.props;

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
        <Switch>
          <Route exact path='/' component={Posts} />
          <Route exact path='/:category' component={CategoryPosts} />
        </Switch>
      </div>
    );
  }
};

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);