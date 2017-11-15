import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { incrementComment, decrementComment, removeComment, openEditCommentModal } from '../actions/Comments';
import { formatDate } from '../utils/FormatDate';
import EditComment from './EditComment';

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
  
  editComment = (event, comment) => {
      const { dispatch } = this.props;
      
      console.log(comment);

      event.stopPropagation();
      dispatch(openEditCommentModal(comment));
  };
  
  removeComment = (comment) => {
    const { dispatch } = this.props;
    dispatch(removeComment(comment));
  }

  render() {
    const { comment, showModal } = this.props;

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
            <Glyphicon glyph="pencil" className="pointer" onClick={event => this.editComment(event, comment)} />
          </div>
          <div>
            <Glyphicon glyph="trash" className="pointer" onClick={event => this.removeComment(comment)} />
          </div>
        </Col>
        {showModal && <EditComment showModal={showModal} commentToEdit={comment} editComment={true} />}
      </Row>
    )
  }
}

function mapStateToProps({ comments }) {
  return {
    showModal: comments.showModal,
		comments: comments.comments
  };
};

export default connect(mapStateToProps)(Comment);