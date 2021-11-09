import { useState, useEffect } from 'react';
import {
	Typography,
	Box,
	Card,
	CardContent,
	Alert,
	AlertTitle,
	Collapse,
} from '@mui/material';

import SearchListings from '../components/listing/SearchListings';
import Background from '../components/shared-UI/Background';

const SearchPage = () => {
	const [open, setOpen] = useState(true);
	return (
		<Background>
			<Card>
				<CardContent>
					<Typography variant='h5' component='div'>
						Find a Car
					</Typography>
					<SearchListings />
				</CardContent>
			</Card>
			<Box mt={2} sx={{ width: { xs: '90vw', sm: '50vw' } }}>
				<Collapse in={open}>
					<Alert
						severity='info'
						onClose={() => {
							setOpen(false);
						}}
					>
						<AlertTitle>
							For testing purpose, please enter any address in NY state or pick
							one from the following list:
						</AlertTitle>
						<ul>
							<li>205 E Houston St, New York, NY 10002</li>
							<li>5th Avenue at, Central Park S, New York, NY 10022</li>
							<li>926 Carmans Rd, Massapequa, NY 11758</li>
						</ul>
					</Alert>
				</Collapse>
			</Box>
		</Background>
	);
};
export default SearchPage;
