import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';
import { useNavigate } from 'react-router-dom';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Create/update profile
export const createProfile =
	(formData, navigate, edit = false) =>
	async (dispatch) => {
		try {
			const res = await axios.post('/api/profile', formData);

			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});

			dispatch(
				setAlert(edit ? 'Profile updated' : 'Profile created', 'success')
			);

			if (!edit) {
				navigate('/dashboard');
			}
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	};

// Add experience
export const addExperience = (formData, navigate) => async (dispatch) => {
	try {
		const res = await axios.put('/api/profile/experience', formData);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience added', 'success'));

		navigate('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add education
export const addEducation = (formData, navigate) => async (dispatch) => {
	try {
		const res = await axios.put('/api/profile/education', formData);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education added', 'success'));

		navigate('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
