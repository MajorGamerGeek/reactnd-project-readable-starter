import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { incrementComment, decrementComment, removeComment } from '../actions/Comments';
import { formatDate } from '../utils/FormatDate';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  incrementComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(incrementComment(comment));
  };

  decrementComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(decrementComment(comment));
  };
  
  editComment = (event, postId, commentId) => {
		event.stopPropagation();
		window.location = `/editpost/${postId}/${commentId}`;
  };
  
  removeComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(removeComment(comment));
  }

  render() {
    const { comment } = this.props;

    console.log(comment);

    return (
      <Row className="comment">
        <Col xs={12} sm={2} md={1} className="comment-voteScore">
          <Glyphicon glyph="triangle-top" className="pointer" onClick={event => this.incrementComment(comment)} />
          <div>{comment.voteScore}</div>
          <Glyphicon glyph="triangle-bottom" className="pointer" onClick={event => this.decrementComment(comment)} />
        </Col>
        <Col xs={12} sm={8} md={10}>
          <div className="comment-body">{comment.body}</div>
          <div className="comment-timeStampAuthor">{formatDate(comment.timestamp)} - {comment.author}</div>
        </Col>
        <Col xs={12} sm={2} md={1}>
          <div>
            <Glyphicon glyph="pencil" className="pointer" onClick={event => this.editComment(event, comment.parentId, comment.id)} />
          </div>
          <div>
            <Glyphicon glyph="trash" className="pointer" onClick={event => this.removeComment(comment)} />
          </div>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  };
};

export default connect(mapStateToProps)(Comment);