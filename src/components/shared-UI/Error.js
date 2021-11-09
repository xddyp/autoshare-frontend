import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogContentText,
} from '@mui/material';

const Error = (props) => {
	return (
		<Dialog
			open={!!props.error}
			onClose={props.onClose}
			aria-labelledby='error-title'
			aria-describedby='error-description'
		>
			<DialogTitle>Error</DialogTitle>
			<DialogContent>
				<DialogContentText>{props.error}</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default Error;
