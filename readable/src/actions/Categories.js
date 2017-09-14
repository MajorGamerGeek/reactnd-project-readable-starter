import * as API from '../utils/Api';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export function getCategories(categories) {
	return {
		type: GET_CATEGORIES,
		categories
	}
};

export function fetchCategories() {
	return function (dispatch) {
		API.getCategories()
			.then((response) => response.json())
			.then((categories) => dispatch(getCategories(categories)));
	}
};