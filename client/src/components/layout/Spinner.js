import spinner from './spinner.gif';

const spinning = () => {
	return (
		<>
			<img
				src={spinner}
				style={{ width: '200px', margin: 'auto', display: 'block' }}
				alt='Loading...'
			/>
		</>
	);
};

export default spinning;
