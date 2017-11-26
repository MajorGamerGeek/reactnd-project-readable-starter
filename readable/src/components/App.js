
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Grid, Nav, NavItem } from 'react-bootstrap';
import { fetchCategories } from '../actions/Categories';
import NoPage from './NoPage';
import Post from './Post';
import Posts from './Posts';
import PostModal from './PostModal';
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  };

  render() {
    const { categories } = this.props;
    
    return (
      <div className="App">
        <PostModal {...this.props} />
        <div className="App-header">
          <Nav bsStyle="tabs">
            <NavItem href="/">Home</NavItem>
            {categories && categories.map(category => (
              <NavItem key={category.path} href={`/${category.path}`} title={category.name}>{category.name}</NavItem>
            ))}
          </Nav>
        </div>
        <Grid>
          <Switch>
            <Route exact path='/' render={(props) => (<Posts {...props} />)} />
            <Route exact path='/:category' render={(props) => (<Posts {...props} />)} /> />
            <Route exact path='/:category/:post_id' render={(props) => (<Post {...props} postDetails={true} />)} />
          </Switch>
        </Grid>
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