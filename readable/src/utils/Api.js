const api = "http://localhost:3001"

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'readable-mmg'
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers });

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers });

export const updatePostVoteScore = (post, option) =>
  fetch(`${api}/posts/${post.id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: option })
  }
);

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers });