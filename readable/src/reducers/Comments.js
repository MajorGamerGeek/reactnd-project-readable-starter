import {
	GET_COMMENT,
	GET_POST_COMMENTS
} from '../actions/Comments';

function comments(state = [], action) {
	switch (action.type) {
		case GET_POST_COMMENTS:
			return [
				...state,
				...action.comments
			]
		default:
			return state;
	}
};

export default comments;