import { NavLink as RouterLink } from 'react-router-dom';
import { Stack, Link, Button } from '@mui/material';
import { useAuth } from '../shared-hooks/auth-context';
const NavLinks = (props) => {
	const { logout, token } = useAuth();
	const handleLogout = async () => {
		try {
			await logout();
		} catch (e) {}
	};
	return (
		<Stack
			direction='row'
			justifyContent='flex-end'
			alignItems='center'
			spacing={3}
		>
			{props.links.map((link) => (
				<Link
					component={RouterLink}
					underline='hover'
					to={link.url}
					variant='body1'
					color='white'
					key={link.title}
					activeStyle={{
						textDecoration: 'underline',
						textDecorationColor: 'white',
					}}
					exact
				>
					{link.title}
				</Link>
			))}
			{token && (
				<Button variant='outlined' onClick={handleLogout} color='secondary'>
					Log Out
				</Button>
			)}
		</Stack>
	);
};

export default NavLinks;
