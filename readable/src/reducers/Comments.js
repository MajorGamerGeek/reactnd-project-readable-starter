import {
	GET_COMMENT,
	GET_POST_COMMENTS,
	DELETE_COMMENT,
	UP_VOTE_COMMENT,
	DOWN_VOTE_COMMENT
} from '../actions/Comments';

function comments(state = {}, action) {
	switch (action.type) {
		case GET_COMMENT:
			return {
				...action.comment
			}
		case GET_POST_COMMENTS:
			return [
				...action.comments
			]
		case DELETE_COMMENT:
			return [
				...state.filter(comment => comment.id !== action.comment.id)
			]
		case UP_VOTE_COMMENT:
			return [
				...state.map((comment) => {
					if (comment.id === action.comment.id) {
							return action.comment
					}
					return comment
				})
			]
		case DOWN_VOTE_COMMENT:
			return [
				...state.map((comment) => {
					if (comment.id === action.comment.id) {
							return action.comment
					}
					return comment
				})
			]
		default:
			return state;
	}
};

export default comments;