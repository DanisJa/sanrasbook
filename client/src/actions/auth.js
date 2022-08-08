import axios from 'axios';
import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOG_OUT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load user
const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register user
const registerUser =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = { name, email, password };
		try {
			const res = await axios.post('api/users', body, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

// Login User
const loginUser = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = { email, password };
	try {
		const res = await axios.post('api/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout / Clear state
const logout = () => (dispatch) => {
	dispatch({ type: LOG_OUT });
};

export { registerUser, loadUser, loginUser, logout };
