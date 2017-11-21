
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import { fetchCategories } from '../actions/Categories';
import { openModal } from '../actions/Modal';
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
            <NavItem onClick={() => this.props.openModal({})}>Create Post</NavItem>
          </Nav>
        </div>
        <Switch>
          <Route exact path='/' render={(props) => (<Posts {...props} />)} />
          <Route exact path='/addpost' render={(props) => (<ModalDialog editPost={false} showModal={true} {...props} />)} />
          <Route exact path='/editpost/:post_id' render={(props) => (<ModalDialog {...props} />)} />
          <Route exact path='/editpost/:post_id/:comment_id' render={(props) => (<ModalDialog {...props} />)} />
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
    fetchCategories: () => dispatch(fetchCategories()),
    openModal: (post) => dispatch(openModal(post))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);