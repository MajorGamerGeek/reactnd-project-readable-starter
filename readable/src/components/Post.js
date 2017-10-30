import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { removePost, incrementPost, decrementPost } from '../actions/Posts';
import { fetchPostComments } from '../actions/Comments';
import Comment from './Comment';
import { formatDate } from '../utils/FormatDate';

class Post extends Component {
	componentDidMount() {
		const { postDetails } = this.props;

		if (postDetails) {
			const { dispatch, post } = this.props;
			dispatch(fetchPostComments(post.id));
		}
	};

	removePost = (postId) => {
		const { dispatch } = this.props;
		dispatch(removePost(postId));
	};

	incrementPost = (post) => {
		const { dispatch } = this.props;
		dispatch(incrementPost(post));
	};

	decrementPost = (post) => {
		const { dispatch } = this.props;
		dispatch(decrementPost(post));
	};

	getPostComments = (postId) => {
		const { comments } = this.props;
		let postComments = [];

		if (Array.isArray(comments)) {
			postComments = comments.map((comment) => {
				if (comment.parentId === postId) {
					return comment;
				}
				return [];
			});
		}

		return postComments;
	};

	static propTypes = {
		post: PropTypes.object.isRequired,
		postDetails: PropTypes.bool.isRequired
	}

	render() {
		const { post, postDetails } = this.props;
		console.log(post);
		return (
			<Row className="post">
				<Col xs={12} lg={3}>
					<Glyphicon glyph="chevron-up" onClick={event => this.incrementPost(post)} />
					<div className="post-voteScore">{post.voteScore}</div>
					<Glyphicon glyph="chevron-down" onClick={event => this.decrementPost(post)} />
				</Col>
				<Col xs={12} lg={11} className="post-title">{post.title}</Col>
				<Col xs={12} lg={11} className="post-timeStampAuthor">{formatDate(post.timestamp)} - {post.author}</Col>
				<Col className="post-commentsCount">{post.commentCount} Comments</Col>
				{postDetails ?
					<div>
						<Col xs={12} lg={11} className="post-body">{post.body}</Col>
						<ol className="posts-list">
							{this.getPostComments(post.id).map(comment => (<Comment key={comment.id} comment={comment} />))}
						</ol>
					</div>
					: <a href={`/${post.category}/${post.id}`}>Detail View</a>}
				<a href={`/EditPost/${post.id}`}>Edit Post</a>
				<div onClick={event => this.removePost(post.id)}>Delete Post</div>
			</Row>
		)
	}
}

function mapStateToProps({ posts, comments }) {
	return {
		posts,
		comments
	};
};

export default connect(mapStateToProps)(Post);