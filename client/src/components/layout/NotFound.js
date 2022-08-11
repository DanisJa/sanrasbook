import React from 'react';

const NotFound = () => {
	return (
		<div>
			<h1 className='x-large x-primary'>
				<i className='fa-solid fa-face-sad-cry'>
					{' '}
					<br />
					404 Error
				</i>
			</h1>
			<p className='large'>Page does not exist.</p>
		</div>
	);
};

export default NotFound;
