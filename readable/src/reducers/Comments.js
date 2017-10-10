import {
	GET_COMMENT,
	GET_POST_COMMENTS,
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
			return {
				...action.comments
		}
		case UP_VOTE_COMMENT:
			console.log(state);
			console.log(action);
			var actionID;

			for (const key in state) {
				actionID = [key]
			}
			console.log(actionID);
			return [
				...action.comments.map((comment) => {
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