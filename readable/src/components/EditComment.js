import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment, editComment } from '../actions/Comments';

class EditComment extends Component {
  incrementPost = (post) => {
    const { dispatch } = this.props;
    dispatch(incrementPost(post));
  };



}

function mapStateToProps() {
  return {

  };
};

export default connect(mapStateToProps)(EditComment);