import {
	GET_POST,
	GET_CATEGORY_POSTS,
	GET_ALL_POSTS
} from '../actions/Posts'

function posts(state = {}, action) {
	let posts;

	switch (action.type) {
		case GET_ALL_POSTS:
			posts = {};
			
			return {
				...state,
				posts
			}
		default:
			return state;
	}
};

export default posts;