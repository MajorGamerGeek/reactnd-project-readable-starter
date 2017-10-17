import {
	ADD_POST,
	DELETE_POST,
	GET_POST,
	GET_CATEGORY_POSTS,
	GET_ALL_POSTS,
	UP_VOTE_POST,
	DOWN_VOTE_POST
} from '../actions/Posts';

function posts(state = [], action) {
	switch (action.type) {
		case ADD_POST:
		console.log(action);
		return {
			posts: action.post
		}
		case DELETE_POST:
		console.log(action);
		console.log(state);
		console.log(action.post);

		return [
			...state.filter((post) => post.id !== action.post.id)
		]
		case GET_POST:
			return [
				...[action.posts]
		]
		case GET_ALL_POSTS:
			return [
				...action.posts.filter(post => post.deleted === false).sort((a, b) => {return b.voteScore - a.voteScore})
		]
		case GET_CATEGORY_POSTS:
			return [
				...action.posts.filter(post => post.deleted === false)
		]
		case UP_VOTE_POST:
			return [
				...state.map((post) => {
					if (post.id === action.posts.id) {
							return action.posts
					}
					return post
				})
		]
		case DOWN_VOTE_POST:
		return [
			...state.map((post) => {
				if (post.id === action.posts.id) {
						return action.posts
				}
				return post
			})
		]
		default:
			return state;
	}
};

export default posts;