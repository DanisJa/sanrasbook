import React, { useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
	company: '',
	website: '',
	location: '',
	status: '',
	skills: '',
	githubusername: '',
	bio: '',
	twitter: '',
	facebook: '',
	linkedin: '',
	youtube: '',
	instagram: '',
};

const ProfileForm = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
}) => {
	const [formData, setFormData] = useState(initialState);

	const creatingProfile = useMatch('/create-profile');

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		// if there is no profile, attempt to fetch one
		if (!profile) getCurrentProfile();

		// build profile data if profile is loaded
		if (!loading && profile) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}
			// the skills may be an array from our API response
			if (Array.isArray(profileData.skills))
				profileData.skills = profileData.skills.join(', ');
			// set local state with the profileData
			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		createProfile(formData, navigate, profile ? true : false);
	};

	return (
		<section className='container'>
			<h1 className='large text-primary'>
				{creatingProfile ? 'Create Your Profile' : 'Edit Your Profile'}
			</h1>
			<p className='lead'>
				<i className='fas fa-user' />
				{creatingProfile
					? ` Let's get some information to make your`
					: ' Add some changes to your profile'}
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<select name='status' value={status} onChange={onChange}>
						<option>* Select Professional Status</option>
						<option value='Developer'>Developer</option>
						<option value='Junior Developer'>Junior Developer</option>
						<option value='Senior Developer'>Senior Developer</option>
						<option value='Manager'>Manager</option>
						<option value='Student'>Student or Learning</option>
						<option value='Instructor'>Instructor or Teacher</option>
						<option value='Intern'>Intern</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>
						Select your current professional status
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={onChange}
					/>
					<small className='form-text'>Can be your own as well</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Website'
						name='website'
						value={website}
						onChange={onChange}
					/>
					<small className='form-text'>
						Leave blank if none, company is ok too
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={onChange}
					/>
					<small className='form-text'>City, Country (eg. Madrid, Spain)</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Skills'
						name='skills'
						value={skills}
						onChange={onChange}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Github Username'
						name='githubusername'
						value={githubusername}
						onChange={onChange}
					/>
					<small className='form-text'>
						Your repos will be shown on profile
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						value={bio}
						onChange={onChange}
					/>
					<small className='form-text'>
						Let others know something about yourself...
					</small>
				</div>

				<div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						{displaySocialInputs ? 'Remove' : 'Add'} Social Network Links
					</button>
					<span>Optional</span>
				</div>

				{displaySocialInputs && (
					<>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x' />
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x' />
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x' />
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x' />
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x' />
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={onChange}
							/>
						</div>
					</>
				)}

				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</section>
	);
};

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	ProfileForm
);
