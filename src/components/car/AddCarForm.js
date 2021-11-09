import { Formik, Form, FastField } from 'formik';
import { Button, LinearProgress, Stack } from '@mui/material';
import * as yup from 'yup';
import { TextFieldFormik } from '../shared-utils/TextFieldFormik';
import { useConnectModal } from './hooks/connect-hook';

const AddCarForm = (props) => {
	const { ConnectModal, handleOpenModal, handleCloseModal } = useConnectModal();
	const handleConnect = (car) => {
		props.onSubmit(car);
		handleCloseModal();
	};
	return (
		<>
			<ConnectModal onConnect={handleConnect} />
			<Formik
				initialValues={{ token: 'token placeholder' }}
				validationSchema={yup.object().shape({
					token: yup.string().required(),
				})}
				onSubmit={handleOpenModal}
				validateOnChange={false}
			>
				{({ isSubmitting }) => (
					<Form>
						<Stack spacing={2} direction='row'>
							<FastField
								component={TextFieldFormik}
								name='token'
								type='text'
								label='Access Token'
								required
							/>
							{isSubmitting && <LinearProgress />}
							<Button
								variant='contained'
								color='primary'
								disabled={isSubmitting}
								type='submit'
							>
								Connect this car
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</>
	);
};
export default AddCarForm;
