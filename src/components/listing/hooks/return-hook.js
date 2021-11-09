import { useState, useCallback, useRef, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export const useReturnModal = (props) => {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = useCallback(() => {
		setOpenModal(true);
	}, []);
	const handleCloseModal = useCallback(() => {
		setOpenModal(false);
	}, []);

	const ReturnModal = (props) => {
		return (
			<>
				<Dialog
					open={openModal}
					onClose={handleCloseModal}
					aria-labelledby='car-title'
					aria-describedby='car-description'
					fullWidth
				>
					<DialogTitle>Start Returning</DialogTitle>
					<DialogActions>
						<Button onClick={props.onReturn} autoFocus>
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	};

	return {
		ReturnModal,
		handleOpenModal,
		handleCloseModal,
	};
};
