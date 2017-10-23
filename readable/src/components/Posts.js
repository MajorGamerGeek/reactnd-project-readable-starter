import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchCategoryPosts, fetchAllPosts, sortPosts } from '../actions/Posts';
import Post from './Post';

class Posts extends Component {
  state = {
    postDetails: false,
    category: null,
    sort: 'VoteScoreAsc'
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { category, post_id } = this.props.match.params;
    
    if (post_id) {
      this.setState({ postDetails: true });
      dispatch(fetchPost(post_id));
    } else if (category) {
      this.setState({ category });
      dispatch(fetchCategoryPosts(category));
    } else {
      dispatch(fetchAllPosts());
    }
  };

  render() {
    const { posts, dispatch } = this.props;
    const { postDetails, category, sort } = this.state;
    
    return (
      <div>
        <select onChange={event => dispatch(sortPosts(event.target.value))}>
          <option value='VoteScoreAsc'>VoteScoreAsc</option>
          <option value='VoteScoreDesc'>VoteScoreDesc</option>
          <option value='TimestampAsc'>TimestampAsc</option>
          <option value='TimestampDesc'>TimestampDesc</option>
        </select>
        {category && <div className="post-category">{category} Posts</div>}
        <ol className="posts-list">
          {posts.map((post) => <Post key={post.id} post={post} postDetails={postDetails} />)}
        </ol>
      </div>
    );
  }
};

function mapStateToProps({ posts }) {
  return {
    posts
  };
};

export default connect(mapStateToProps)(Posts);