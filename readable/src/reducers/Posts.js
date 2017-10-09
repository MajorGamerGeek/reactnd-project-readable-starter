import {
	ADD_POST,
	DELETE_POST,
	GET_POST,
	GET_CATEGORY_POSTS,
	GET_ALL_POSTS,
	UP_VOTE_POST,
	DOWN_VOTE_POST
} from '../actions/Posts';

function posts(state = { posts: [] }, action) {
	switch (action.type) {
		case ADD_POST:
		console.log(action);
		return {
			...state,
			posts: action.post
		}
		case DELETE_POST:
		console.log(action);
		return {
			...state,
			posts: action.post
		}
		case GET_POST:
		return {
			...state,
			posts: [action.posts].filter(post => post.deleted === false)
		}
		case GET_ALL_POSTS:
			return {
				...state,
				posts: action.posts.filter(post => post.deleted === false)
			}
		case GET_CATEGORY_POSTS:
			return {
				...state,
				posts: action.posts.filter(post => post.deleted === false)
			}
		case UP_VOTE_POST:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post.id === action.post.id) {
							return action.post
					}
					return post
				})
			}
		case DOWN_VOTE_POST:
			return {
				...state,
				posts: state.posts.map((post) => {
					if (post.id === action.post.id) {
							return action.post
					}
					return post
				})
			}
		default:
			return state;
	}
};

export default posts;