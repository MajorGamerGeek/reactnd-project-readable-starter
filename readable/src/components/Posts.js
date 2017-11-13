import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
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
    const { dispatch, posts, sort } = this.props;
    const { postDetails, category } = this.state;

    console.log(posts);
    console.log(sort);

    return (
      <Grid>
        <Row>
          {postDetails === false &&
            <select onChange={event => dispatch(sortBy(event.target.value))}>
              <option value='VoteScoreAsc'>VoteScoreAsc</option>
              <option value='VoteScoreDesc'>VoteScoreDesc</option>
              <option value='TimestampAsc'>TimestampAsc</option>
              <option value='TimestampDesc'>TimestampDesc</option>
            </select>
          }
        </Row>
        <Row>
          {category && <div className="post-category">{category} Posts</div>}
        </Row>
        {this.sortPosts(posts, sort).map((post) => <Post key={post.id} post={post} postDetails={postDetails} />)}
      </Grid>
    );
  }
};

function mapStateToProps({ posts, sort }) {
  return {
    posts: posts.posts,
    sort
  };
};

export default connect(mapStateToProps)(Posts);