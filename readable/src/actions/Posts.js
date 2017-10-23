import * as API from '../utils/Api';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_POST = 'GET_POST';
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const UP_VOTE_POST = ' UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

export function addPost(posts) {
	return {
		type: ADD_POST,
		posts
	}
};

export function editPost(posts) {
	return {
		type: EDIT_POST,
		posts
	}
};

export function deletePost(post) {
	return {
		type: DELETE_POST,
		post
	}
};

export function getPost(posts) {
	return {
		type: GET_POST,
		posts
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

export function sortPosts(params) {
	console.log(params);
	return {
		type: SORT_POSTS,
		params
	}
};


export function upVotePost(posts) {
	return {
		type: UP_VOTE_POST,
		posts
	}
};

export function downVotePost(posts) {
	return {
		type: DOWN_VOTE_POST,
		posts
	}
};

export function fetchPost(postId) {
	return function (dispatch) {
		API.getPost(postId)
			.then((response) => response.json())
			.then((posts) => dispatch(getPost(posts)));
	}
};

export function removePost(postId) {
	return function (dispatch) {
		API.deletePost(postId)
			.then((response) => response.json())
			.then((post) => dispatch(deletePost(post)));
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
		.then((posts) => dispatch(upVotePost(posts)));
	};
};

export function decrementPost(post) {
	return function (dispatch) {
		API.updatePostVoteScore(post, 'downVote')
		.then((response) => response.json())
		.then((posts) => dispatch(downVotePost(posts)));
	};
};