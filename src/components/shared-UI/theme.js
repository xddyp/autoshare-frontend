import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
	palette: {
		primary: {
			main: '#004d40',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#f57c00',
			contrastText: '#ffffff',
		},
	},
});
theme = responsiveFontSizes(theme);

export default theme;
