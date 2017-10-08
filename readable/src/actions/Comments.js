import * as API from '../utils/Api';

export const GET_COMMENT = 'GET_COMMENT';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_COMMENTS = 'ADD_COMMENT';

export function getComment({ id }) {
	return {
		type: GET_COMMENT,
		id
	}
};

export function getPostComments( post, comments) {
	return {
		type: GET_POST_COMMENTS,
		post,
		comments
	}
};

export function fetchPostComments(post) {
	return function (dispatch) {
		API.getPostComments(post.id)
			.then((response) => response.json())
			.then((postComments) => dispatch(getPostComments(post, postComments)));
	}
}