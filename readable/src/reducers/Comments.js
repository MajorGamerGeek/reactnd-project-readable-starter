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
	comments: []
};

function comments(state = defaultCommentsState, action) {
	switch (action.type) {
		case GET_COMMENT:
			action.comment.map(comment => (comment.showModal = false));
			return {
				...state,
				comments: action.comment
			};
		case GET_POST_COMMENTS:
			action.comments.map(comment => (comment.showModal = false));
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
			return {
				...state,
				comments: state.comments.map((comment) => {
					if (comment.id === action.comment.id) {
						comment.showModal = true;
					}
					return comment;
				}) 
			};
		case CLOSE_EDIT_COMMENT_MODAL:
			return {
				...state,
				comments: state.comments.map((comment) => {
					comment.showModal = false;
					return comment;
				})
			};
		default:
			return state;
	}
};

export default comments;