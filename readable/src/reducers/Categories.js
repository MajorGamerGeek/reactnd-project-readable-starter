import {
  GET_CATEGORIES
} from '../actions/Categories';

function categories(state = [], action) {
	switch (action.type) {
		case GET_CATEGORIES:
			return [
				...state,
				...action.categories.categories
			]
		default:
			return state;
	}
};

export default categories;