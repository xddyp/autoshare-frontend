import { Formik, Form, FastField } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
	Button,
	LinearProgress,
	Stack,
	DialogActions,
	DialogContent,
} from '@mui/material';

import * as yup from 'yup';
import {
	DatePickerFormik,
	TextFieldFormik,
} from '../shared-utils/TextFieldFormik';

const AddListing = (props) => {
	const handleSubmit = async (values) => {
		await props.onSubmit(values);
	};
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Formik
				initialValues={props.yupInit}
				validationSchema={yup.object().shape({
					end: yup.date().nullable().required('Required'),
					price: yup.number().required('Required'),
				})}
				onSubmit={handleSubmit}
				validateOnChange={false}
			>
				{({ isSubmitting }) => (
					<Form>
						<DialogContent>
							{props.children}
							<Stack spacing={2} direction='row'>
								<FastField
									component={DatePickerFormik}
									name='end'
									label='Available Until'
									required
									minDate={Date.now()}
								/>
								<FastField
									component={TextFieldFormik}
									name='price'
									label='Price $/Day'
									required
								/>
							</Stack>
						</DialogContent>
						{isSubmitting && <LinearProgress />}
						<DialogActions>
							<Button color='success' disabled={isSubmitting} type='submit'>
								List this car
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</LocalizationProvider>
	);
};
export default AddListing;
