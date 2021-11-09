import { Formik, Form, FastField } from 'formik';
import { Button, LinearProgress, Stack } from '@mui/material';
import * as yup from 'yup';
import { TextFieldFormik } from '../shared-utils/TextFieldFormik';

const SignupForm = (props) => {
	const handleSubmit = async (values) => {
		await props.onSubmit(values);
	};
	return (
		<Formik
			initialValues={{ name: '', email: '', password: '' }}
			validationSchema={yup.object().shape({
				name: yup.string().required(),
				email: yup.string().required(),
				password: yup.string().required(),
			})}
			onSubmit={handleSubmit}
			validateOnChange={false}
		>
			{({ isSubmitting }) => (
				<Form>
					<Stack spacing={2}>
						<FastField
							component={TextFieldFormik}
							name='name'
							type='text'
							label='Name'
							required
						/>
						<FastField
							component={TextFieldFormik}
							name='email'
							type='text'
							label='Email'
							required
						/>
						<FastField
							component={TextFieldFormik}
							name='password'
							type='text'
							label='Password'
							required
						/>
						{isSubmitting && <LinearProgress />}
						<Button
							fullWidth
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							type='submit'
						>
							Submit
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

export default SignupForm;
