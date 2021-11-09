import {
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText,
} from '@mui/material';
import AddListing from '../AddListing';

const CarModal = (props) => {
	return (
		<Dialog
			open={props.onOpen}
			onClose={props.onClose}
			aria-labelledby='car-title'
			aria-describedby='car-description'
			fullWidth
		>
			<DialogTitle color='success.main'>Your car is connected</DialogTitle>
			<AddListing onSubmit={props.onSubmit} yupInit={{ end: null, price: '' }}>
				<DialogContentText>
					{`Location: ${props.status.location.address.street}, ${props.status.location.address.city}, ${props.status.location.address.state} ${props.status.location.address.zip}`}
				</DialogContentText>
				<DialogContentText>Charging: {props.status.battery}%</DialogContentText>
			</AddListing>
		</Dialog>
	);
};

export default CarModal;
