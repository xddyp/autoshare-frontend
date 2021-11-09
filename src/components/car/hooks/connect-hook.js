import { useState, useCallback } from 'react';
import { useHttpClient } from '../../shared-hooks/http-hook';
import { useAuth } from '../../shared-hooks/auth-context';
import {
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	Avatar,
	Stack,
	Typography,
	CircularProgress,
} from '@mui/material';
import Error from '../../shared-UI/Error';

export const useConnectModal = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { token } = useAuth();
	const [openModal, setOpenModal] = useState(false);
	const [car, setCar] = useState();
	const handleOpenModal = useCallback(
		async (values, { setSubmitting, resetForm }) => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_URL}/cars/token`,
					'POST',
					JSON.stringify({
						token: values.token,
					}),
					{
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					}
				);
				setCar(responseData.car);
				setOpenModal(true);
				resetForm();
				setSubmitting(false);
			} catch (err) {}
		},
		[]
	);
	const handleCloseModal = useCallback(() => {
		setOpenModal(false);
	}, []);

	const ConnectModal = (props) => {
		return (
			<>
				<Error error={error} onClose={clearError} />
				{isLoading && <CircularProgress />}
				{!isLoading && (
					<Dialog
						open={openModal}
						onClose={handleCloseModal}
						aria-labelledby='car-title'
						aria-describedby='car-description'
						fullWidth
					>
						<DialogTitle>Vehicle Information</DialogTitle>
						{car && (
							<DialogContent>
								<Stack
									direction='row'
									justifyContent='flex-start'
									alignItems='center'
									spacing={3}
								>
									<Avatar
										alt='vehicle'
										src={car.url}
										sx={{ width: 56, height: 56 }}
									/>
									<Typography>
										{car.year} {car.model}
									</Typography>
								</Stack>
							</DialogContent>
						)}
						<DialogActions>
							<Button onClick={props.onConnect.bind(null, car)} autoFocus>
								Connect
							</Button>
						</DialogActions>
					</Dialog>
				)}
			</>
		);
	};

	return {
		ConnectModal,
		handleOpenModal,
		handleCloseModal,
	};
};
