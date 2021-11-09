import { Battery20Rounded } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText,
} from '@mui/material';
import AddListing from '../AddListing';

const EditModal = (props) => {
	const battery = Math.floor(Math.random() * (100 - 90) + 90);
	return (
		<Dialog
			open={props.onOpen}
			onClose={props.onClose}
			aria-labelledby='edit-title'
			aria-describedby='edit-description'
			fullWidth
		>
			<DialogTitle>Your car is connected</DialogTitle>
			<AddListing
				onSubmit={props.onSubmit}
				yupInit={{ end: props.car.current.end, price: props.car.current.price }}
			>
				<DialogContentText>
					{`Location: ${props.car.current.address.street}, ${props.car.current.address.city}, ${props.car.current.address.state} ${props.car.current.address.zip}`}
				</DialogContentText>
				<DialogContentText>Charging: {battery}%</DialogContentText>
			</AddListing>
		</Dialog>
	);
};

export default EditModal;
