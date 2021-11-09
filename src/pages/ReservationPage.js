import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, CircularProgress, Button } from '@mui/material';
import { useHttpClient } from '../components/shared-hooks/http-hook';
import { useAuth } from '../components/shared-hooks/auth-context';
import Error from '../components/shared-UI/Error';
import CenterBox from '../components/shared-UI/CenterBox';
import { useReturnModal } from '../components/listing/hooks/return-hook';

const ReservationPage = () => {
	const [listing, setListing] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { ReturnModal, handleOpenModal, handleCloseModal } = useReturnModal();
	const { token } = useAuth();

	useEffect(() => {
		const fetchListing = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_URL}/listings/reservation`,
					'GET',
					null,
					{
						Authorization: 'Bearer ' + token,
					}
				);

				if (responseData.listing) {
					setListing(responseData.listing);
				}
			} catch (err) {}
		};
		fetchListing();
	}, [sendRequest]);
	const handleReturn = async () => {
		handleCloseModal();
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_URL}/listings/${listing._id}`,
				'PATCH',
				null,
				{
					Authorization: 'Bearer ' + token,
				}
			);
			setListing();
		} catch (err) {}
	};

	return (
		<>
			<CenterBox>
				<Error error={error} onClose={clearError} />
				{isLoading && <CircularProgress />}
				<ReturnModal onReturn={handleReturn} />
				<Typography variant='h6' paragraph>
					Your reservation
				</Typography>
				{!isLoading && !listing && (
					<Typography>You don't have any active reservation.</Typography>
				)}
				{!isLoading && listing && (
					<Stack spacing={1} alignItem='flex-start'>
						<Typography>
							{`Return By: ${listing.dropoff.slice(0, 9)}`}
						</Typography>
						<Typography>
							{`Return To: ${listing.address.street}, ${listing.address.city}, ${listing.address.state} ${listing.address.zip}`}
						</Typography>
						<Typography>Total Cost: ${listing.cost}</Typography>
						<Button
							variant='contained'
							sx={{ maxWidth: '300px' }}
							onClick={handleOpenModal}
						>
							Return to dropoff location
						</Button>
					</Stack>
				)}
			</CenterBox>
		</>
	);
};
export default ReservationPage;
