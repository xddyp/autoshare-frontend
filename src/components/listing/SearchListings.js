import { Formik, Form, FastField } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LinearProgress, Stack, IconButton } from '@mui/material';

import {
	TextFieldFormik,
	DatePickerFormik,
} from '../shared-utils/TextFieldFormik';
import SearchIcon from '@mui/icons-material/Search';

const SearchListings = () => {
	const history = useHistory();
	const handleSubmit = async (values) => {
		history.replace(
			`/search/${encodeURIComponent(values.address)}/${encodeURIComponent(
				values.dropoff
			)}`
		);
		// resetForm();
		// setSubmitting(false);
	};
	const tomorrow = new Date();
	tomorrow.setHours(0, 0, 0, 0);
	tomorrow.setDate(tomorrow.getDate() + 1);
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Formik
				initialValues={{
					address: '205 E Houston St, New York, NY 10002',
					dropoff: tomorrow,
				}}
				validationSchema={yup.object().shape({
					address: yup.string().required('Required'),
					dropoff: yup.date().nullable().required('Required'),
				})}
				onSubmit={handleSubmit}
				validateOnChange={false}
			>
				{({ isSubmitting }) => (
					<Form>
						<Stack
							direction='column'
							spacing={1}
							sx={{ width: { xs: '90vw', sm: '50vw' } }}
						>
							<FastField
								component={TextFieldFormik}
								name='address'
								type='text'
								label='Pick-Up Address'
							/>
							<FastField
								component={DatePickerFormik}
								name='dropoff'
								label='Drop-Off Date'
								minDate={tomorrow}
							/>
							<IconButton
								disabled={isSubmitting}
								type='submit'
								color='primary'
								size='large'
								sx={{ backgroundColor: 'primary' }}
							>
								<SearchIcon />
							</IconButton>
							{isSubmitting && <LinearProgress />}
						</Stack>
					</Form>
				)}
			</Formik>
		</LocalizationProvider>
	);
};
export default SearchListings;
