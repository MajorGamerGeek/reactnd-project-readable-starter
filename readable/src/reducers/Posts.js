import {
	ADD_POST,
	DELETE_POST,
	GET_POST,
	GET_CATEGORY_POSTS,
	GET_ALL_POSTS,
	UP_VOTE_POST,
	DOWN_VOTE_POST,
	OPEN_EDIT_POST_MODAL,
	CLOSE_EDIT_POST_MODAL
} from '../actions/Posts';

const defaultPostsState = {
	posts: [],
	showModal: false
};

function posts(state = defaultPostsState, action) {
	switch (action.type) {
		case ADD_POST:
			console.log(action);
			return {
				...state,
				posts: [action.post]
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.post.id)
			};
		case GET_POST:
			return {
				...state,
				posts: [action.post]
			};
		case GET_ALL_POSTS:
			return {
				...state,
				posts: action.posts.filter(post => post.deleted === false)
			};
		case GET_CATEGORY_POSTS:
			return {
				...state,
				posts: action.posts.filter(post => post.deleted === false)
			};
		case UP_VOTE_POST:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post.id === action.posts.id) {
						return action.posts
					}
					return post;
				})
			};
		case DOWN_VOTE_POST:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post.id === action.posts.id) {
						return action.posts
					}
					return post;
				})
			};
		case OPEN_EDIT_POST_MODAL:
			return {
				...state,
				posts: [action.post],
				showModal: true
			};
		case CLOSE_EDIT_POST_MODAL:
			return {
				...state,
				showModal: false
			};
		default:
			return state;
	};
};

export default posts;