import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => (
	<Router>
		<Navbar />
		<Routes>
			<Route exact path='/' element={<Landing />} />
			<Route
				exact
				path='/register'
				element={
					<section className='container'>
						<Register />
					</section>
				}
			/>
			<Route
				exact
				path='/login'
				element={
					<section className='container'>
						<Login />
					</section>
				}
			/>
		</Routes>
	</Router>
);

export default App;
