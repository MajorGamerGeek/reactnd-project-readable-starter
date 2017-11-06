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

	showPostDetails = (category, postId) => {
		const { postDetails } = this.props;

		if (!postDetails) {
			window.location = `/${category}/${postId}`;
		}
	};

	editPost = (event, postId) => {
		event.stopPropagation();
		window.location = `/editpost/${postId}`;
	};

	removePost = (event, postId) => {
		const { dispatch } = this.props;

		event.stopPropagation();
		dispatch(removePost(postId));
	};

	incrementPost = (event, post) => {
		const { dispatch } = this.props;

		event.stopPropagation();
		dispatch(incrementPost(post));
	};

	decrementPost = (event, post) => {
		const { dispatch } = this.props;

		event.stopPropagation();
		dispatch(decrementPost(post));
	};

	addComment = (event, postId) => {
		event.stopPropagation();
		window.location = `/addcomment/${postId}`;
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
			<Row className="post" onClick={() => this.showPostDetails(post.category, post.id)}>
				<Col xs={12} sm={2} md={1} className="post-voteScore">
					<Glyphicon glyph="triangle-top" className="pointer" onClick={event => this.incrementPost(event, post)} />
					<div>{post.voteScore}</div>
					<Glyphicon glyph="triangle-bottom" className="pointer" onClick={event => this.decrementPost(event, post)} />
				</Col>
				<Col xs={12} sm={8} md={10} className="vertical-align">
					<div className="post-title">{post.title}</div>
					<div className="post-timeStampAuthor">{formatDate(post.timestamp)} - {post.author}</div>
					<div className="post-commentsCount">{post.commentCount} Comments</div>
				</Col>
				{postDetails &&
					<Col xs={12} sm={8} md={10} className="post-body">
						<div>
							{post.body}
						</div>
						<ol className="posts-list">
							{this.getPostComments(post.id).map(comment => (<Comment key={comment.id} comment={comment} />))}
						</ol>
					</Col>
				}
				<Col xs={12} sm={2} md={1} className="post-editDelete vertical-align">
					<div>
						<Glyphicon glyph="plus" className="pointer" onClick={event => this.addComment(event, post.id)} />
					</div>
					<div>
						<Glyphicon glyph="pencil" className="pointer" onClick={event => this.editPost(event, post.id)} />
					</div>
					<div>
						<Glyphicon glyph="trash" className="pointer" onClick={event => this.removePost(event, post.id)} />
					</div>
				</Col>
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