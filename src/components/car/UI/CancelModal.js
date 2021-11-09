import {
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText,
} from '@mui/material';

const CancelModal = (props) => {
	return (
		<Dialog
			open={props.onOpen}
			onClose={props.onClose}
			aria-labelledby='car-title'
			aria-describedby='car-description'
			fullWidth
		>
			<DialogContent>
				<DialogContentText>Cancel the listing?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClick}>Confirm</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CancelModal;
