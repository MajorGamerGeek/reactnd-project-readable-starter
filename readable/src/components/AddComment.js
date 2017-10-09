import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/Comments';

class AddComment extends Component {
  incrementPost = (post) => {
    const { dispatch } = this.props;
    dispatch(incrementPost(post));
  };
}

function mapStateToProps() {
  return {
  };
};

export default connect(mapStateToProps)(AddComment);