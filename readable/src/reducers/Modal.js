import {
	OPEN_MODAL,
	CLOSE_MODAL
} from '../actions/Modal';

function modal(state = { postToEdit: {}, showModal: false }, action) {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				postToEdit: action.post,
				showModal: true
			};
		case CLOSE_MODAL:
			return {
				...state,
				postToEdit: {},
				showModal: false
			};
		default:
			return state;
	}
};

export default modal;