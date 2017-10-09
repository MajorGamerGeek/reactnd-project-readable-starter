import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions/Posts';

class AddPost extends Component {
  incrementPost = (post) => {
    const { dispatch } = this.props;
    dispatch(incrementPost(post));
  };
}

function mapStateToProps() {
  return {
  };
};

export default connect(mapStateToProps)(AddPost);