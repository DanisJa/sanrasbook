import { combineReducers } from 'redux';
import alert from './alert';
import authReducer from './auth';
import profileReducer from './profile';
import post from './post';

export default combineReducers({
	alert,
	auth: authReducer,
	profile: profileReducer,
	post: post,
});
