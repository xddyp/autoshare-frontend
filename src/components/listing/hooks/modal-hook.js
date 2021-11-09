import { useState, useCallback, useRef, useEffect } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText,
} from '@mui/material';

export const useModal = (props) => {
	const [openModal, setOpenModal] = useState(false);
	const [listing, setListing] = useState();
	const handleOpenModal = useCallback((listing) => {
		setListing(listing);
		setOpenModal(true);
	}, []);
	const handleCloseModal = useCallback(() => {
		setListing();
		setOpenModal(false);
	}, []);

	const Modal = (props) => {
		return (
			<>
				{listing && (
					<Dialog
						open={openModal}
						onClose={handleCloseModal}
						aria-labelledby='car-title'
						aria-describedby='car-description'
						fullWidth
					>
						<DialogTitle>Reservation Details</DialogTitle>
						<DialogContent>
							<DialogContentText color='success.light'>
								{`The car will arrive in ${
									Math.floor(listing.dist.calculated / 600) + 10
								} minutes.`}
							</DialogContentText>
							<DialogContentText>
								{`Return By: ${props.reservation.dropoff.slice(0, 10)}`}
							</DialogContentText>
							<DialogContentText>
								{`Return To: ${listing.address.street}, ${listing.address.city}, ${listing.address.state} ${listing.address.zip}`}
							</DialogContentText>
							<DialogContentText>
								Total Cost: ${props.reservation.days * listing.price}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={props.onReserve.bind(null, listing._id)}
								autoFocus
								color='success'
							>
								Confirm
							</Button>
						</DialogActions>
					</Dialog>
				)}
			</>
		);
	};

	return {
		Modal,
		handleOpenModal,
		handleCloseModal,
	};
};
