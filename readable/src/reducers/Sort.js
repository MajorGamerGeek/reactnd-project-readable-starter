import {
	SORT_BY
} from '../actions/Sort';

function sort(state = "VoteScoreAsc", action) {
	switch (action.type) {
    case SORT_BY:
      return action.sortBy;
		default:
			return state;
	}
};

export default sort;