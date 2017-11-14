import {
	GET_COMMENT,
	GET_POST_COMMENTS,
	DELETE_COMMENT,
	UP_VOTE_COMMENT,
	DOWN_VOTE_COMMENT,
	OPEN_EDIT_COMMENT_MODAL,
	CLOSE_EDIT_COMMENT_MODAL
} from '../actions/Comments';

const defaultCommentsState = {
	comments: [],
	comment: [],
	showModal: false
};

function comments(state = defaultCommentsState, action) {
	switch (action.type) {
		case GET_COMMENT:
			return {
				...state,
				comments: action.comment
			};
		case GET_POST_COMMENTS:
			return {
				...state,
				comments: action.comments
			};
		case DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(comment => comment.id !== action.comment.id)
			};
		case UP_VOTE_COMMENT:
			return {
				...state,
				comments: state.comments.map((comment) => {
					if (comment.id === action.comment.id) {
						return action.comment
					}
					return comment
				})
			};
		case DOWN_VOTE_COMMENT:
			return {
				...state,
				comments: state.comments.map((comment) => {
					if (comment.id === action.comment.id) {
						return action.comment
					}
					return comment
				})
			};
		case OPEN_EDIT_COMMENT_MODAL:
			console.log(action.comment);
			return {
				...state,
				comment: action.comment,
				showModal: true
			};
		case CLOSE_EDIT_COMMENT_MODAL:
			return {
				...state,
				showModal: false
			};
		default:
			return state;
	};
};

export default comments;