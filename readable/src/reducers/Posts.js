import {
	GET_POST,
	GET_CATEGORY_POSTS,
	GET_ALL_POSTS
} from '../actions/Posts';

function posts(state = [], action) {
	switch (action.type) {
		case GET_ALL_POSTS:
			return [
				...state,
				...action.posts
			]
		default:
			return state;
	}
};

export default posts;