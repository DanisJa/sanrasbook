import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
	education: { school, degree, fieldofstudy, current, from, to, description },
}) => {
	return (
		<div>
			<h1 className='text-primary'>{school}</h1>
			<p>
				<strong className='text-primary'>Degree: </strong>
				{degree}
			</p>
			<p>
				<strong className='text-primary'>Field of study: </strong>{' '}
				{fieldofstudy}
			</p>
			<p>
				<strong className='text-primary'>Date: </strong>
				<Moment format='YYYY/MM/DD'>{from}</Moment> -
				{!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
			</p>
		</div>
	);
};

ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired,
};

export default ProfileEducation;
