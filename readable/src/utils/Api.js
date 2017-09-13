const api = "http://localhost:3001"

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'readable-mmg'
}

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers });