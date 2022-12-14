import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState('');

	return (
		<form
			id='post-form'
			className='form my-1'
			onSubmit={(e) => {
				e.preventDefault();
				addComment(postId, { text });
				setText('');
			}}
		>
			<textarea
				name='text'
				cols='30'
				rows='5'
				placeholder='Share your thoughts...'
				value={text}
				onChange={(e) => setText(e.target.value)}
				required
			></textarea>
			<input type='submit' className='btn btn-dark my-1' value='Submit' />
		</form>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
