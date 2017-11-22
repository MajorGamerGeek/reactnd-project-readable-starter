import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { fetchPost, fetchAllPosts, removePost, incrementPost, decrementPost } from '../actions/Posts';
import { openModal } from '../actions/Modal';
import { fetchPostComments } from '../actions/Comments';
import Comment from './Comment';
import { formatDate } from '../utils/FormatDate';

class Post extends Component {
	constructor(props) {
		super(props);
		this.editPost = this.editPost.bind(this);
	}

	componentDidMount() {
		const { post, postDetails } = this.props;

		if (!post) {
			const { post_id } = this.props.match.params;
      this.props.fetchPost(post_id);
    }

		if (postDetails) {
			const { fetchPostComments, post } = this.props;
			fetchPostComments(post.id);
		}
	};

	showPostDetails = (category, postId) => {
		const { postDetails } = this.props;

		if (!postDetails) {
			window.location = `/${category}/${postId}`;
		}
	};

	editPost = (event, post) => {
		event.stopPropagation();
		this.props.openModal(post);
	};

	removePost = (event, postId) => {
		event.stopPropagation();
		this.props.removePost(postId);
	};

	incrementPost = (event, post) => {
		event.stopPropagation();
		this.props.incrementPost(post);
	};

	decrementPost = (event, post) => {
		event.stopPropagation();
		this.props.decrementPost(post);
	};

	addComment = (event, postId) => {
		event.stopPropagation();
		window.location = `/addcomment/${postId}`;
	};

	getPostComments = (postId) => {
		let { comments } = this.props;
		let postComments = [];

		if (Array.isArray(comments)) {
			postComments = comments.filter((comment) => (comment.parentId === postId));
		}

		return postComments;
	};

	static propTypes = {
		post: PropTypes.object,
		postDetails: PropTypes.bool.isRequired
	}

	render() {
		const { post, postDetails } = this.props;
		console.log(postDetails);
		console.log(post);
		return (
			<div>
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
							<Glyphicon glyph="pencil" className="pointer" onClick={event => this.editPost(event, post)} />
						</div>
						<div>
							<Glyphicon glyph="trash" className="pointer" onClick={event => this.removePost(event, post.id)} />
						</div>
						{postDetails && (
							<div>
								<Glyphicon glyph="plus" className="pointer" onClick={event => this.addComment(event, post.id)} />
							</div>
						)}
					</Col>
				</Row>
			</div>
		)
	}
}

function mapStateToProps({ comments, posts }) {
	return {
		comments: comments.comments,
		posts: posts.posts
	};
};

function mapDispatchToProps(dispatch) {
  return {
		fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
		fetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
    incrementPost: (post) => dispatch(incrementPost(post)),
    decrementPost: (post) => dispatch(decrementPost(post)),
    openModal: (post) => dispatch(openModal(post)),
		removePost: (postId) => dispatch(removePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);