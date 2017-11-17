import * as API from '../utils/Api';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_COMMENT = 'GET_COMMENT';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';
export const OPEN_EDIT_COMMENT_MODAL = 'OPEN_EDIT_COMMENT_MODAL';
export const CLOSE_EDIT_COMMENT_MODAL = 'CLOSE_EDIT_COMMENT_MODAL';

export function addComment(comment) {
	return {
		type: ADD_COMMENT,
		comment
	}
};

export function editComment(comment) {
	return {
		type: EDIT_COMMENT,
		comment
	}
};

export function deleteComment(comment) {
	return {
		type: DELETE_COMMENT,
		comment
	}
};

export function getComment({ id }) {
	return {
		type: GET_COMMENT,
		id
	}
};

export function getPostComments(comments) {
	return {
		type: GET_POST_COMMENTS,
		comments
	}
};

export function upVoteComment(comment) {
	return {
		type: UP_VOTE_COMMENT,
		comment
	}
};

export function downVoteComment(comment) {
	return {
		type: DOWN_VOTE_COMMENT,
		comment
	}
};

export function openEditCommentModal(comment) {
	return {
		type: OPEN_EDIT_COMMENT_MODAL,
		comment
	}
};

export function closeEditCommentModal() {
	return {
		type: CLOSE_EDIT_COMMENT_MODAL
	}
};

export function fetchPostComments(postId) {
	return function (dispatch) {
		API.getPostComments(postId)
			.then((response) => response.json())
			.then((postComments) => dispatch(getPostComments(postComments)));
	}
};

export function newComment(comment) {
	return function (dispatch) {
		API.addComment(comment)
		.then((response) => response.json())
		.then((comment) => dispatch(addComment(comment)));
	}
};

export function updateComment(comment) {
	return function (dispatch) {
		API.editComment(comment)
		.then((response) => response.json())
		.then((comment) => dispatch(editComment(comment)));
	}
};

export function removeComment(comment) {
	return function (dispatch) {
		API.deleteComment(comment.id)
			.then((response) => response.json())
			.then((comment) => dispatch(deleteComment(comment)));
	}
};

export function incrementComment(comment) {
	return function (dispatch) {
		API.updateCommentVoteScore(comment, 'upVote')
		.then((response) => response.json())
		.then((comment) => dispatch(upVoteComment(comment)));
	};
};

export function decrementComment(comment) {
	return function (dispatch) {
		API.updateCommentVoteScore(comment, 'downVote')
		.then((response) => response.json())
		.then((comment) => dispatch(downVoteComment(comment)));
	};
};