import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
	return (
		<div className='dash-buttons'>
			<Link to='/edit-profile' className='btn btn-light'>
				<i className='fa-solid fa-pen-to-square'></i> Edit Profile
			</Link>
			<Link to='/add-experience' className='btn btn-light'>
				<i className='fa-solid fa-briefcase'></i> Add Experience
			</Link>
			<Link to='/add-education' className='btn btn-light'>
				<i className='fa-solid fa-graduation-cap'></i> Add Education
			</Link>
		</div>
	);
};
