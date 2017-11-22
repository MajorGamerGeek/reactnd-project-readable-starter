
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import { fetchCategories } from '../actions/Categories';
import Post from './Post';
import Posts from './Posts';
import ModalDialog from './ModalDialog';
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  };

  render() {
    const { categories } = this.props;
    
    return (
      <div className="App">
        <ModalDialog {...this.props} />
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
          <Route exact path='/:category' render={(props) => (<Posts {...props} />)} /> />
          <Route exact path='/:category/:post_id' render={(props) => (<Post {...props} postDetails={true} />)} />
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