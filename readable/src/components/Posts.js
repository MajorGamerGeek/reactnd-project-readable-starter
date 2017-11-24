import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, FormControl, Row } from 'react-bootstrap';
import { fetchCategoryPosts, fetchAllPosts } from '../actions/Posts';
import { openModal } from '../actions/Modal';
import { sortBy } from '../actions/Sort';
import Post from './Post';

class Posts extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;

    if (category) {
      this.props.fetchCategoryPosts(category);
    } else {
      this.props.fetchAllPosts();
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
    const { posts, sort, sortBy } = this.props;

    return (
      <div>
        <Row>
          <Col xs={4}>
            <FormControl id='category' componentClass='select' onChange={event => sortBy(event.target.value)}>
              <option value='VoteScoreAsc'>VoteScoreAsc</option>
              <option value='VoteScoreDesc'>VoteScoreDesc</option>
              <option value='TimestampAsc'>TimestampAsc</option>
              <option value='TimestampDesc'>TimestampDesc</option>
            </FormControl>
          </Col>
          <Col xs={4}>
            <Button bsStyle="primary" onClick={() => this.props.openModal({})}>Create Post</Button>
          </Col>
        </Row>
        {this.sortPosts(posts, sort).map((post) => <Post key={post.id} postItem={post} postDetails={false} />)}
      </div>
    );
  }
};

function mapStateToProps({ posts, sort, }) {
  return {
    posts: posts.posts,
    sort
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category)),
    openModal: (post) => dispatch(openModal(post)),
    sortBy: (sortByValue) => dispatch(sortBy(sortByValue))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);