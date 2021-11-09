import { useState, useCallback, useRef, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';

export const useTab = () => {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const TabPanel = (props) => {
		// const { children, value, index, ...other } = props;
		return (
			<div
				role='tabpanel'
				hidden={value !== props.index}
				id={`simple-tabpanel-${props.index}`}
				aria-labelledby={`simple-tab-${props.index}`}
				// {...other}
			>
				{value === props.index && props.children}
			</div>
		);
	};
	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
	};

	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	function BasicTabs() {
		return (
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='basic tabs example'
					textColor='secondary'
					indicatorColor='secondary'
				>
					<Tab label='Active Listing' {...a11yProps(0)} />
					<Tab label='Inactive Vehicles' {...a11yProps(1)} />
				</Tabs>
			</Box>
		);
	}

	return {
		TabPanel,
		BasicTabs,
		value,
	};
};
