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
				<Col xs={12} sm={2} md={1} className="post-voteScore">
					<Glyphicon glyph="triangle-top" onClick={event => this.incrementPost(post)} />
					<div>{post.voteScore}</div>
					<Glyphicon glyph="triangle-bottom" onClick={event => this.decrementPost(post)} />
				</Col>
				<Col xs={12} sm={8} md={10} className="vertical-align">
					<div className="post-title">{post.title}</div>
					<div className="post-timeStampAuthor">{formatDate(post.timestamp)} - {post.author}</div>
					<div className="post-commentsCount">{post.commentCount} Comments</div>
				</Col>
				{postDetails &&
					<div>
						<Col xs={12} sm={9} md={10} className="post-body">{post.body}</Col>
						<ol className="posts-list">
							{this.getPostComments(post.id).map(comment => (<Comment key={comment.id} comment={comment} />))}
						</ol>
					</div>
				}
				<Col xs={12} sm={2} md={1} className="post-editDelete vertical-align">
					<div>
						<a href={`/EditPost/${post.id}`}><Glyphicon glyph="pencil" /></a>
					</div>
					<div>
						<Glyphicon glyph="trash" onClick={event => this.removePost(post.id)} />
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