import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/user/LoginForm';
import SignupForm from '../components/user/SignupForm';
import { useAuth } from '../components/shared-hooks/auth-context';
import { useHttpClient } from '../components/shared-hooks/http-hook';
import {
	Card,
	Typography,
	Button,
	Box,
	Collapse,
	Alert,
	AlertTitle,
} from '@mui/material';
import BackgroundCar from '../components/shared-UI/BackgroundCar';
import Error from '../components/shared-UI/Error';

const LoginPage = () => {
	const [open, setOpen] = useState(true);
	const { login, token } = useAuth();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [isNewUser, setIsNewUser] = useState(false);

	const handleLogin = async (values) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_URL}/users/login`,
				'POST',
				JSON.stringify({
					email: values.email,
					password: values.password,
				}),
				{
					'Content-Type': 'application/json',
				}
			);
			login(responseData.userId, responseData.token);
		} catch (err) {}
	};

	const handleSignUp = async (values) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_URL}/users/signup`,
				'POST',
				JSON.stringify({
					name: values.name,
					email: values.email,
					password: values.password,
				}),
				{
					'Content-Type': 'application/json',
				}
			);
			login(responseData.userId, responseData.token);
		} catch (err) {}
	};

	return (
		<BackgroundCar>
			<Error error={error} onClose={clearError} />
			<Card sx={{ width: 400, p: 3 }}>
				{isNewUser && (
					<>
						<Typography align='center' variant='h6'>
							Sign Up/
							<Button onClick={() => setIsNewUser(false)}>
								Already have a account
							</Button>
						</Typography>
						<SignupForm onSubmit={handleSignUp} />
					</>
				)}
				{!isNewUser && (
					<>
						<Typography align='center' variant='h6'>
							Log In/
							<Button onClick={() => setIsNewUser(true)}>
								New User Sign Up
							</Button>
						</Typography>
						<LoginForm onSubmit={handleLogin} />
					</>
				)}
			</Card>
			<Box mt={2}>
				<Collapse in={open}>
					<Alert
						severity='info'
						variant='filled'
						onClose={() => {
							setOpen(false);
						}}
					>
						<AlertTitle>Testing Account</AlertTitle>

						<ul>
							<li>Email: test@gmail.com</li>
							<li>Password: 123456</li>
						</ul>
					</Alert>
				</Collapse>
			</Box>
		</BackgroundCar>
	);
};
export default LoginPage;
