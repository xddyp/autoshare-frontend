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
const CarCard = (props) => {
	return (
		<Card sx={{ height: '100%' }}>
			<CardActionArea onClick={props.onList} sx={{ height: '100%' }}>
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
								<Typography color='text.secondary'>Not Listed</Typography>
							</Stack>
						</CardContent>
					</div>
					{/* <CardActions> */}
					{/* <Button color='primary' variant='text' component='p'>
							Click to Connect & List
						</Button> */}
					{/* </CardActions> */}
				</Stack>
			</CardActionArea>
		</Card>
	);
};
export default CarCard;
