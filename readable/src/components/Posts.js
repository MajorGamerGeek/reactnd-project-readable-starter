import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchCategoryPosts, fetchAllPosts } from '../actions/Posts';
import { sortBy } from '../actions/Sort';
import Post from './Post';

class Posts extends Component {
  state = {
    postDetails: false,
    category: null
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

  sortPosts = (posts, sort) => posts.sort((a, b) => {
    switch (sort) {
      case 'VoteScoreAsc':
        return a.voteScore - b.voteScore;
      case 'VoteScoreDesc':
        return b.voteScore - a.voteScore;
      case 'TimestampAsc':
        return a.timestamp - b.timestamp;
      case 'TimeStampDesc':
        return b.timestamp - a.timestamp;
      default: 
        return 1;
    }
  });

  render() {
    const { posts, dispatch, sort } = this.props;
    const { postDetails, category } = this.state;
    
    return (
      <div>
        <select onChange={event => dispatch(sortBy(event.target.value))}>
          <option value='VoteScoreAsc'>VoteScoreAsc</option>
          <option value='VoteScoreDesc'>VoteScoreDesc</option>
          <option value='TimestampAsc'>TimestampAsc</option>
          <option value='TimestampDesc'>TimestampDesc</option>
        </select>
        {category && <div className="post-category">{category} Posts</div>}
        <ol className="posts-list">
          {this.sortPosts(posts, sort).map((post) => <Post key={post.id} post={post} postDetails={postDetails} />)}
        </ol>
      </div>
    );
  }
};

function mapStateToProps({ posts, sort }) {
  return {
    posts,
    sort
  };
};

export default connect(mapStateToProps)(Posts);