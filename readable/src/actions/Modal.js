export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function openModal(post) {
	return {
		type: OPEN_MODAL,
		post
	}
};

export function closeModal() {
	return {
		type: CLOSE_MODAL
	}
};