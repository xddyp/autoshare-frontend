import { Box } from '@mui/material';

import header from '../../assets/car5.png';

const Background = (props) => {
	return (
		<Box
			sx={{
				// width: '100vw',
				height: '100%',
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				backgroundImage: `url(${header})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{props.children}
		</Box>
	);
};
export default Background;
