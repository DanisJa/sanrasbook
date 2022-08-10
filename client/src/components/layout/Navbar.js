import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { loading, isAuthenticated }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to='/profiles'>
					<i className='fa-solid fa-users'></i>
					<span className='hide-sm'> People</span>
				</Link>
			</li>
			<li>
				<Link to='/posts'>
					<i className='fa-solid fa-comment'></i>
					<span className='hide-sm'> Posts</span>
				</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user' />
					<span className='hide-sm'> Dashboard</span>
				</Link>
			</li>
			<li>
				<Link onClick={logout} to='/login' className='log-out-btn'>
					<i className='fas fa-sign-out-alt'></i>
					<span className='hide-sm'> Logout</span>
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'>
					<i className='fa-solid fa-users'></i> People
				</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/' className='main-link'>
					<i className='fa-solid fa-laptop-code'></i> SanrasBook
				</Link>
			</h1>
			{!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
