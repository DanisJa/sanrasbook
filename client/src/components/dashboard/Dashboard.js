import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { DashboardActions } from './DashboardActions';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return (
		<section className='container'>
			{loading && profile === null ? (
				<Spinner />
			) : (
				<>
					<h1 className='large text-primary'>Profile</h1>
					<p className='lead'>
						<i className='fas fa-user'></i> Hello, {user && user.name}!
					</p>
					{profile !== null ? (
						<>
							<DashboardActions />
							<Experience experience={profile.experience} />
							<Education education={profile.education} />

							<div className='my-2'>
								<button
									className='btn btn-danger'
									onClick={() => deleteAccount()}
								>
									<i className='fa-solid fa-ban'></i> Delete Account
								</button>
							</div>
						</>
					) : (
						<>
							<p>You don't have a profile. Create below.</p>
							<Link to='/create-profile' className='btn btn-primary my-1'>
								Create Profile
							</Link>
						</>
					)}
				</>
			)}
		</section>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
