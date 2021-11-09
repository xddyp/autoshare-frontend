import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import theme from './components/shared-UI/theme';

import App from './App';
import { AuthContextProvider } from './components/shared-hooks/auth-context';

ReactDOM.render(
	<AuthContextProvider>
		<Router>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Router>
	</AuthContextProvider>,
	document.getElementById('root')
);
