import {
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
	Typography,
	Button,
	Stack,
	CardActions,
	Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
const ListedCarCard = (props) => {
	return (
		<Card
			sx={{
				border: props.car.current.rented ? '1px solid #f57c00' : 'None',
				height: '100%',
			}}
		>
			<Stack justifyContent='space-between' sx={{ height: '100%' }}>
				<div>
					<CardMedia
						component='img'
						height='140'
						image={props.car.url}
						alt={props.car.id}
					/>

					<CardContent>
						<Stack spacing={1}>
							<Stack
								direction='row'
								justifyContent='space-between'
								alignItems='flex-end'
							>
								<Typography variant='h5'>
									{props.car.year} {props.car.model}
								</Typography>
							</Stack>
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
								{!props.car.current.rented && (
									<Typography color='text.primary'>
										Listed until {props.car.current.end.slice(0, 10)}
									</Typography>
								)}
								{props.car.current.rented && (
									<Typography>
										Rented until {props.car.current.dropoff.slice(0, 10)}
									</Typography>
								)}
								<Typography color='text.primary'>
									${props.car.current.price}/Day
								</Typography>
							</Box>
						</Stack>
					</CardContent>
				</div>
				<CardActions>
					{!props.car.current.rented && (
						<>
							<Button onClick={props.onEdit} color='secondary'>
								Edit Listing
							</Button>
							<Button onClick={props.onCancel} color='secondary'>
								Cancel
							</Button>
						</>
					)}
					{/* {props.car.current.rented && (
						<>
							<Button onClick={props.onEdit} color='primary' disabled>
								Edit Listing
							</Button>
							<Button onClick={props.onCancel} color='primary' disabled>
								Cancel
							</Button>
						</>
					)} */}
				</CardActions>
			</Stack>
		</Card>
	);
};
export default ListedCarCard;
