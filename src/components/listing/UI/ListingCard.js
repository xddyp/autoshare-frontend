import {
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
	Typography,
	Stack,
} from '@mui/material';

const ListingCard = (props) => {
	return (
		<Card>
			<CardActionArea onClick={props.onOpen}>
				<CardMedia component='img' height='140' image={props.listing.car.url} />
				<CardContent>
					<Typography variant='h5'>
						{props.listing.car.year} {props.listing.car.model}
					</Typography>
					<Stack spacing={1} alignItems='flex-end'>
						<Typography variant='body1' color='success.light'>
							Arrive in {Math.floor(props.listing.dist.calculated / 600) + 10}{' '}
							minutes
						</Typography>
						<Typography variant='body1'>$ {props.listing.price}/day</Typography>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
export default ListingCard;
