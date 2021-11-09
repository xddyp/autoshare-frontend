import { Box } from '@mui/material';

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
