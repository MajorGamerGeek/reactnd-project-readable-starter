import * as PostsAPI from '../utils/Api';

export const GET_POST = 'GET_POST';
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';

export function getPost({ id }) {
	return {
		type: GET_POST,
		id
	}
};

export function getCategoryPost({ category }) {
	return {
		type: GET_CATEGORY_POSTS,
		category
	}
};

export function getAllPosts() {
	return {
		type: GET_ALL_POSTS
	}
};