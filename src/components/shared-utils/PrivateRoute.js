import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../shared-hooks/auth-context';
const PrivateRoute = ({ component: Component, ...rest }) => {
	const { token } = useAuth();
	return (
		<Route
			{...rest}
			render={(props) => {
				return token ? <Component {...props} /> : <Redirect to='/auth' />;
			}}
		></Route>
	);
};

export default PrivateRoute;
