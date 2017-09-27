import * as API from '../utils/Api';

export const GET_POST = 'GET_POST';
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const UP_VOTE_POST = ' UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

export function getPost({ id }) {
	return {
		type: GET_POST,
		id
	}
};

export function getCategoryPosts(posts) {
	return {
		type: GET_CATEGORY_POSTS,
		posts
	}
};

export function getAllPosts(posts) {
	return {
		type: GET_ALL_POSTS,
		posts
	}
};

export function upVotePost(post) {
	return {
		type: UP_VOTE_POST,
		post
	}
};

export function downVotePost(post) {
	return {
		type: DOWN_VOTE_POST,
		post
	}
};

export function fetchAllPosts() {
	return function (dispatch) {
		API.getAllPosts()
			.then((response) => response.json())
			.then((posts) => dispatch(getAllPosts(posts)));
	}
};

export function fetchCategoryPosts(category) {
	console.log(category);
	return function (dispatch) {
		API.getCategoryPosts(category)
		.then((response) => response.json())
		.then((posts) => dispatch(getCategoryPosts(posts)));
	};
};

export function incrementPost(post) {
	return function (dispatch) {
		API.updatePostVoteScore(post, 'upVote')
		.then((response) => response.json())
		.then((post) => dispatch(upVotePost(post)));
	};
};

export function decrementPost(post) {
	return function (dispatch) {
		API.updatePostVoteScore(post, 'downVote')
		.then((response) => response.json())
		.then((post) => dispatch(downVotePost(post)));
	};
};