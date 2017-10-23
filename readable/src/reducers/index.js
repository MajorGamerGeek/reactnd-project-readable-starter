import { combineReducers } from 'redux';
import posts from './Posts';
import sort from './Sort';
import comments from './Comments';
import categories from './Categories';

export default combineReducers({
	posts, sort, comments, categories
});