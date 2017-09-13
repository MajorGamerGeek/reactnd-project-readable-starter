export const GET_COMMENT = 'GET_COMMENT';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS ';

export function getComment({ id }) {
	return {
		type: GET_COMMENT,
		id
	}
};

export function getPostComments({ parentId }) {
	return {
		type: GET_POST_COMMENTS,
		parentId
	}
};