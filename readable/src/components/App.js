
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import { fetchCategories } from '../actions/Categories';
import Posts from './Posts';
import EditPost from './EditPost';
import EditComment from './EditComment';
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
          <Nav activeHref="/" bsStyle="tabs">
            <NavItem href="/">Home</NavItem>
            {categories && categories.map(category => (
              <NavItem key={category.path} href={`/${category.path}`} title={category.name}>{category.name}</NavItem>
            ))}
          </Nav>
        </div>
        <Switch>
          <Route exact path='/' render={(props) => (<Posts {...props} />)} />
          <Route exact path='/addpost' render={(props) => (<EditPost editPost={false} showModal={true} {...props} />)} />
          <Route exact path='/addcomment/:post_id' render={(props) => (<EditComment editComment={false} showModal={true} {...props} />)} />
          <Route exact path='/editpost/:post_id' render={(props) => (<EditPost {...props} />)} />
          <Route exact path='/editpost/:post_id/:comment_id' render={(props) => (<EditPost {...props} />)} />
          <Route exact path='/:category' render={(props) => (<Posts {...props} />)} /> />
          <Route exact path='/:category/:post_id' render={(props) => (<Posts {...props} />)} />
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