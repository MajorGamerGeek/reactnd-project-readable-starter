import { combineReducers } from 'redux';
import categories from './Categories';
import comments from './Comments';
import modal from './Modal';
import posts from './Posts';
import sort from './Sort';


export default combineReducers({
	categories, comments, modal, posts, sort
});