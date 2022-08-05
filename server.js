const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect database
connectDB();

//Initialize middleware
app.use(express.json());

//sample request
app.get('/', (req, res) => res.send('Hello from something.js'));

//Define routes (.use(HTTP path for requests, relative path to route))
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
