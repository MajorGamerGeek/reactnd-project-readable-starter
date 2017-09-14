import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/Categories';
import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();

    console.log('props', this.props);
  };

  render() {
    const { categories } = this.props;

    console.log(categories);

    return (
      <div className="categories">
        <div>
          <ol className="categories-list">
          </ol>
        </div>
      </div>
    );
  }
}

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