import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { DashboardActions } from './DashboardActions';
import { Link } from 'react-router-dom';

const Dashboard = ({
	getCurrentProfile,
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
					<h1 className='large text-primary'>Dashboard</h1>
					<p className='lead'>
						<i className='fas fa-user'></i> Welcome {user && user.name}
					</p>
					{profile !== null ? (
						<>
							<DashboardActions />
						</>
					) : (
						<>
							<p>You have not yet set up a profile, please add some info</p>
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
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);