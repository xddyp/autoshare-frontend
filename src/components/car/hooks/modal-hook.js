import { useState, useCallback, useRef, useEffect } from 'react';
import { useAuth } from '../../shared-hooks/auth-context';
import { useHttpClient } from '../../shared-hooks/http-hook';
import CarModal from '../UI/CarModal';
import CancelModal from '../UI/CancelModal';
import EditModal from '../UI/EditModal';
import Error from '../../shared-UI/Error';
import { CircularProgress } from '@mui/material';

export const useModal = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { token } = useAuth();
	const [car, setCar] = useState();
	const [status, setStatus] = useState();
	const [openCarModal, setOpenCarModal] = useState(false);
	const [openCancelModal, setOpenCancelModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const handleOpenCarModal = useCallback(async (car) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_URL}/cars/${car._id}/status`,
				'GET',
				null,
				{
					Authorization: 'Bearer ' + token,
				}
			);
			setStatus(responseData);
			setCar(car);
			setOpenCarModal(true);
		} catch (err) {}
	}, []);
	const handleOpenCancelModal = useCallback((car) => {
		setCar(car);
		setOpenCancelModal(true);
	}, []);
	const handleOpenEditModal = useCallback((car) => {
		setCar(car);
		setOpenEditModal(true);
	}, []);
	const handleCloseCarModal = () => {
		setCar();
		setStatus();
		setOpenCarModal(false);
	};
	const handleCloseCancelModal = () => {
		setCar();
		setOpenCancelModal(false);
	};
	const handleCloseEditModal = () => {
		setCar();
		setOpenEditModal(false);
	};

	const Modals = (props) => {
		return (
			<>
				<Error error={error} onClose={clearError} />
				{isLoading && <CircularProgress />}
				{openCarModal && (
					<CarModal
						onOpen={openCarModal}
						onClose={handleCloseCarModal}
						onSubmit={props.onList}
						status={status}
					/>
				)}
				{openCancelModal && (
					<CancelModal
						onOpen={openCancelModal}
						onClose={handleCloseCancelModal}
						onClick={props.onCancel}
					/>
				)}
				{openEditModal && (
					<EditModal
						onOpen={openEditModal}
						onClose={handleCloseEditModal}
						onSubmit={props.onEdit}
						car={car}
					/>
				)}
			</>
		);
	};

	return {
		Modals,
		car,
		status,
		handleOpenCarModal,
		handleOpenEditModal,
		handleOpenCancelModal,
	};
};
