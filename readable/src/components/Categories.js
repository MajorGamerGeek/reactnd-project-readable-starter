import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/Categories';
import '../App.css';

class Categories extends Component {
  componentDidMount() {
    this.props.fetchCategories();

    console.log('props', this.props);
  };

  render() {
    const { categories } = this.props;
    
    return (
      <div className="categories">
        {categories && categories.map(category => (
          <div key={category.path}>
            <div className="category-name">{category.name}</div>
            <div className="category-path">{category.path}</div>
          </div>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);