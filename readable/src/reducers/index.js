import { combineReducers } from 'redux';
import posts from './Posts';
import comments from './Comments';

export default combineReducers({
	posts, comments
});