import * as API from '../utils/Api';

export const GET_COMMENT = 'GET_COMMENT';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS ';

export function getComment({ id }) {
	return {
		type: GET_COMMENT,
		id
	}
};

export function getPostComments({ postComments }) {
	return {
		type: GET_POST_COMMENTS,
		postComments
	}
};

export function fetchPostsComments() {
	return function (dispatch) {
		API.getPostComments()
			.then((response) => response.json())
			.then((postComments) => dispatch(getPostComments(postComments)));
	}
}