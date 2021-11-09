import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { useHttpClient } from '../components/shared-hooks/http-hook';
import { useAuth } from '../components/shared-hooks/auth-context';
import { useModal } from '../components/listing/hooks/modal-hook';
import ListingCard from '../components/listing/UI/ListingCard';
import Error from '../components/shared-UI/Error';
import CenterBox from '../components/shared-UI/CenterBox';

const ListingsPage = () => {
	let { address, dropoff } = useParams();
	const [loadedListings, setLoadedListings] = useState();
	const [reservation, setReservation] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { Modal, handleOpenModal, handleCloseModal } = useModal();
	const { token } = useAuth();
	const history = useHistory();
	useEffect(() => {
		const fetchListings = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_URL}/listings/${address}/${dropoff}`
				);
				setLoadedListings(responseData.listings);
				setReservation(responseData.reservation);
			} catch (err) {}
		};
		fetchListings();
	}, [sendRequest]);
	const handleReserve = async (lid) => {
		handleCloseModal();
		if (!token) {
			history.replace('/login');
		} else {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_URL}/listings/${lid}`,
					'POST',
					JSON.stringify({
						reservation: reservation,
					}),
					{
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					}
				);
				history.replace('/reservation');
			} catch (err) {}
		}
	};

	return (
		<>
			<CenterBox>
				{error && <Error error={error} onClose={clearError} />}
				{reservation && (
					<Modal reservation={reservation} onReserve={handleReserve} />
				)}
				{isLoading && <CircularProgress />}
				<Typography variant='h5'>Vehicles Near You</Typography>
				{!isLoading && loadedListings && loadedListings.length === 0 && (
					<Typography>No vehicle is available</Typography>
				)}
				<Grid container spacing={2}>
					{!isLoading &&
						loadedListings &&
						loadedListings.length !== 0 &&
						loadedListings.map((listing) => (
							<Grid item xs={12} sm={6} md={4} key={listing._id}>
								<ListingCard
									listing={listing}
									onOpen={handleOpenModal.bind(null, listing)}
								/>
							</Grid>
						))}
				</Grid>
			</CenterBox>
		</>
	);
};
export default ListingsPage;
