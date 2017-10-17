const api = "http://localhost:3001"

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'readable-mmg'
}

export const addPost = (option) =>
  fetch(`${api}/posts`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: option })
  }
);

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'DELETE',
    body: JSON.stringify(postId)
  }
);

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers });

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers });

export const updatePostVoteScore = (post, option) =>
  fetch(`${api}/posts/${post.id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: option })
  }
);

export const getCategories = () =>
  fetch(`${api}/categories`, { headers });

export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers });

export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: comment })
  }
);

export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers });

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'DELETE',
  }
);

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers });

export const updateCommentVoteScore = (comment, option) =>
  fetch(`${api}/comments/${comment.id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: option })
  }
);