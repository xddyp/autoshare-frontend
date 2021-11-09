import { Stack } from '@mui/material';

const CenterBox = (props) => {
	return (
		<Stack my={2} spacing={2}>
			{props.children}
		</Stack>
	);
};

export default CenterBox;
