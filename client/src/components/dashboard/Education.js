import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td className='hide-sm'>
				<Moment format='YYYY/MM/DD'>{edu.from}</Moment>
				<br />
				<i class='fa-solid fa-arrow-down'></i>
				<br />
				{edu.to === null ? (
					' Now'
				) : (
					<Moment format='YYYY/MM/DD'>{edu.to}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => deleteEducation(edu._id)}
					className='btn btn-danger'
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<>
			<h2 className='my-2'>Education</h2>
			{educations.length !== 0 ? (
				<table className='table'>
					<thead>
						<tr>
							<th>School</th>
							<th className='hide-sm'>Degree</th>
							<th className='hide-sm'>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{educations}</tbody>
				</table>
			) : (
				<>
					<h3 className='my-3'>You don't have any education info.</h3>
				</>
			)}
		</>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
