import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
	experience: { company, title, location, current, from, to, description },
}) => {
	return (
		<div>
			<h1 className='text-primary'>{company}</h1>
			<p>
				<strong className='text-primary'>Position: </strong>
				{title}
			</p>
			<p>
				<strong className='text-primary'>Description: </strong> {description}
			</p>
			<p>
				<strong className='text-primary'>Date: </strong>
				<Moment format='YYYY/MM/DD'>{from}</Moment> -
				{!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
			</p>
		</div>
	);
};

ProfileExperience.propTypes = {
	experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
