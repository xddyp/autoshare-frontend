import {
	CircularProgress,
	Divider,
	Typography,
	Chip,
	Alert,
	AlertTitle,
	Collapse,
	Box,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useHttpClient } from '../components/shared-hooks/http-hook';
import { useAuth } from '../components/shared-hooks/auth-context';
import CenterBox from '../components/shared-UI/CenterBox';
import AddCarForm from '../components/car/AddCarForm';
import CarsList from '../components/car/CarsList';
import Error from '../components/shared-UI/Error';

const CarsPage = () => {
	const [open, setOpen] = useState(true);
	const [loadedCars, setLoadedCars] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { token } = useAuth();

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_URL}/cars`,
					'GET',
					null,
					{
						Authorization: 'Bearer ' + token,
					}
				);
				setLoadedCars(responseData.cars);
			} catch (err) {}
		};
		fetchPlaces();
	}, [sendRequest]);
	const handleAddCar = async (car) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_URL}/cars`,
				'POST',
				JSON.stringify({
					car: car,
				}),
				{
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				}
			);
			setLoadedCars((prevCars) => [...prevCars, responseData.car]);
		} catch (err) {}
	};
	const handleList = async (car, values, status) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_URL}/cars/${car._id}`,
				'POST',
				JSON.stringify({
					end: values.end,
					price: values.price,
					pid: status.location._id,
				}),
				{
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				}
			);
			const otherCars = loadedCars.filter((c) => c._id !== car._id);
			setLoadedCars([responseData.car, ...otherCars]);
		} catch (err) {}
	};
	const handleEdit = async (car, values) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_URL}/cars/${car._id}`,
				'PATCH',
				JSON.stringify({
					end: values.end,
					price: values.price,
				}),
				{
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				}
			);
			const otherCars = loadedCars.filter((c) => c._id !== car._id);
			setLoadedCars([responseData.car, ...otherCars]);
		} catch (err) {}
	};
	const handleCancel = async (car) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_URL}/cars/${car._id}`,
				'DELETE',
				null,
				{
					Authorization: 'Bearer ' + token,
				}
			);
			const otherCars = loadedCars.filter((c) => c._id !== car._id);
			setLoadedCars([...otherCars, responseData.car]);
		} catch (err) {}
	};
	return (
		<CenterBox>
			<Error error={error} onClose={clearError} />
			{isLoading && <CircularProgress />}
			<Typography variant='h5'>Your Vehicles</Typography>
			{!isLoading && loadedCars && (
				<CarsList
					cars={loadedCars}
					onList={handleList}
					onEdit={handleEdit}
					onCancel={handleCancel}
				/>
			)}
			<Divider />

			<Typography variant='h5' paragraph>
				Have another car to connect?
			</Typography>
			<AddCarForm onSubmit={handleAddCar} />
			<Box sx={{ maxWidth: '400px' }}>
				<Collapse in={open}>
					<Alert
						severity='info'
						onClose={() => {
							setOpen(false);
						}}
					>
						<AlertTitle>Token</AlertTitle>
						Enter any text as token for testing.
					</Alert>
				</Collapse>
			</Box>
		</CenterBox>
	);
};

export default CarsPage;
