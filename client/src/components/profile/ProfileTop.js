import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
	profile: {
		status,
		company,
		location,
		website,
		socialmedia,
		user: { name, avatar },
	},
}) => {
	return (
		<>
			<div className='profile-grid my-1' style={{ borderRadius: 10 }}>
				<div className='profile-top bg-primary p-2'>
					<img className='round-img my-1' alt='Avatar' src={avatar} />
					<h1 className='large'>{name}</h1>
					<p className='lead'>
						{status} {company && <span> at {company}</span>}
					</p>
					<p>{location && <span>{location}</span>}</p>
					<div className='icons my-1'>
						{website && (
							<a
								href={'http://' + website}
								target='_blank'
								rel='noopener noreferrer'
							>
								<i className='fas fa-globe fa-2x'></i>
							</a>
						)}
						{socialmedia && socialmedia.twitter && (
							<a
								href={socialmedia.twitter}
								target='_blank'
								rel='noopener noreferrer'
							>
								<i className='fab fa-twitter fa-2x'></i>
							</a>
						)}
						{socialmedia && socialmedia.facebook && (
							<a
								href={socialmedia.facebook}
								target='_blank'
								rel='noopener noreferrer'
							>
								<i className='fab fa-facebook fa-2x'></i>
							</a>
						)}
						{socialmedia && socialmedia.linkedin && (
							<a
								href={socialmedia.linkedin}
								target='_blank'
								rel='noopener noreferrer'
							>
								<i className='fab fa-linkedin fa-2x'></i>
							</a>
						)}
						{socialmedia && socialmedia.youtube && (
							<a
								href={socialmedia.youtube}
								target='_blank'
								rel='noopener noreferrer'
							>
								<i className='fab fa-youtube fa-2x'></i>
							</a>
						)}
						{socialmedia && socialmedia.instagram && (
							<a
								href={socialmedia.instagram}
								target='_blank'
								rel='noopener noreferrer'
							>
								<i className='fab fa-instagram fa-2x'></i>
							</a>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
