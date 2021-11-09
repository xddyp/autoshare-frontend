import {
	AppBar,
	Typography,
	Hidden,
	Container,
	Stack,
	Link,
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import NavLinks from './NavLinks';
import NavMenu from './NavMenu';
import { useAuth } from '../shared-hooks/auth-context';
const links = [
	{ title: 'Home', url: '/' },
	{ title: 'Become a Host', url: '/cars' },
	{ title: 'Log In/ Sign Up', url: '/login' },
];
const privateLinks = [
	{ title: 'Home', url: '/' },
	{ title: 'Your Listings', url: '/cars' },
	{ title: 'Reservations', url: '/reservation' },
];

const Navigation = (props) => {
	const { token } = useAuth();
	return (
		<AppBar
			sx={{
				// boxShadow: 'rgb(140 152 164 / 25%) 0px 3px 6px 0px',
				background: props.bg ? 'rgba(0, 0, 0, 0.54)' : 'primar',
				width: '100%',
			}}
			position='sticky'
			elevation={0}
		>
			<Container maxWidth='lg'>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					py={2}
				>
					<Link
						component={RouterLink}
						underline='hover'
						to='/'
						variant='body1'
						activeStyle={{
							textDecoration: 'none',
						}}
					>
						<Typography variant='h5' color='white'>
							AutoShare
						</Typography>
					</Link>
					<Stack direction='row' spacing={3}>
						{!token && (
							<>
								<Hidden mdDown>
									<NavLinks links={links} />
								</Hidden>
								<Hidden mdUp>
									<NavMenu links={links} />
								</Hidden>
							</>
						)}
						{token && (
							<>
								<Hidden mdDown>
									<NavLinks links={privateLinks} />
								</Hidden>
								<Hidden mdUp>
									<NavMenu links={privateLinks} />
								</Hidden>
							</>
						)}
					</Stack>
				</Stack>
			</Container>
		</AppBar>
	);
};

export default Navigation;
