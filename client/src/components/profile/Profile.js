import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { useParams, Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
	const params = useParams();

	useEffect(() => {
		getProfileById(params.id);
	}, []);

	return (
		<section className='container'>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<>
					<Link to='/profiles' className='btn btn-light'>
						Back
					</Link>
					{auth.isAuthenticated &&
						!auth.loading &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit profile
							</Link>
						)}
					<div className='my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className='edu-exp-combinator'>
							<div className='profile-exp bg-primary p-2'>
								<h2 className='text-white'>Experience</h2>
								{profile.experience.length > 0 ? (
									<>
										{profile.experience.map((experience) => (
											<ProfileExperience
												key={experience._id}
												experience={experience}
											/>
										))}
									</>
								) : (
									<h4>No experience info</h4>
								)}
							</div>
							<div className='profile-edu bg-primary p-2'>
								<h2 className='text-white'>Education</h2>
								{profile.education.length > 0 ? (
									<>
										{profile.education.map((education) => (
											<ProfileEducation
												key={education._id}
												education={education}
											/>
										))}
									</>
								) : (
									<h4>No education info</h4>
								)}
							</div>
						</div>
						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername} />
						)}
					</div>
				</>
			)}
		</section>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
