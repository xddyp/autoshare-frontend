import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import mui components
import { CircularProgress, Box, Container } from '@mui/material';

// import local components
import PrivateRoute from './components/shared-utils/PrivateRoute';
import { useAuth } from './components/shared-hooks/auth-context';
import Navigation from './components/shared/Navigation';

// import pages using React.lazy
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const CarsPage = React.lazy(() => import('./pages/CarsPage'));
const ListingsPage = React.lazy(() => import('./pages/ListingsPage'));
const ReservationPage = React.lazy(() => import('./pages/ReservationPage'));

function App() {
	const { token } = useAuth();
	let routes;
	if (token) {
		routes = (
			<Switch>
				<Route path='/' exact component={SearchPage} />
				<PrivateRoute path='/reservation' exact component={ReservationPage} />
				<PrivateRoute path='/cars' exact component={CarsPage} />
				<Route path='/search/:address/:dropoff' component={ListingsPage} />
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/' exact component={SearchPage} />
				<Route path='/login' exact component={LoginPage} />
				<Route path='/search/:address/:dropoff' component={ListingsPage} />
				<Redirect to='/login' />
			</Switch>
		);
	}
	return (
		<>
			<Navigation />
			<Suspense fallback={<CircularProgress />}>
				<Container maxWidth='lg'>
					<main>{routes}</main>
				</Container>
			</Suspense>
		</>
	);
}

export default App;
