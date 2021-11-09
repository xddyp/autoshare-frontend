import { Grid, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import CarCard from './UI/CarCard';
import ListedCarCard from './UI/ListedCarCard';
import { useModal } from './hooks/modal-hook';
import { useTab } from './hooks/tab-hook';
const CarsList = (props) => {
	const {
		Modals,
		car,
		status,
		handleOpenCarModal,
		handleOpenEditModal,
		handleOpenCancelModal,
	} = useModal();
	const { TabPanel, BasicTabs, value } = useTab();
	const handleList = async (values) => {
		await props.onList(car, values, status);
	};
	const handleCancel = async () => {
		await props.onCancel(car);
	};
	const handleEdit = async (values) => {
		await props.onEdit(car, values);
	};

	return (
		<>
			<Modals onList={handleList} onCancel={handleCancel} onEdit={handleEdit} />
			{props.cars.length == 0 && (
				<Typography>No vehicle is connected.</Typography>
			)}
			{props.cars.length !== 0 && (
				<>
					<BasicTabs />
					<TabPanel index={0}>
						<Grid container spacing={1}>
							{props.cars
								.filter((car) => car.current)
								.map((car) => (
									<Grid item xs={12} sm={6} md={4} key={car._id}>
										<ListedCarCard
											car={car}
											onCancel={handleOpenCancelModal.bind(null, car)}
											onEdit={handleOpenEditModal.bind(null, car)}
										/>
									</Grid>
								))}
						</Grid>
					</TabPanel>
					<TabPanel index={1}>
						<Grid container spacing={1}>
							{props.cars
								.filter((car) => !car.current)
								.map((car) => (
									<Grid item xs={12} sm={6} md={4} key={car._id}>
										<CarCard
											car={car}
											onList={handleOpenCarModal.bind(null, car)}
										/>
									</Grid>
								))}
						</Grid>
					</TabPanel>
				</>
			)}
		</>
	);
};
export default CarsList;
