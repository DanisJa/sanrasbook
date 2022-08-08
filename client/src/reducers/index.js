import { combineReducers } from 'redux';
import alert from './alert';
import authReducer from './auth';
import profileReducer from './profile';

export default combineReducers({
	alert,
	auth: authReducer,
	profile: profileReducer,
});
