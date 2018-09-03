const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// const UserRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

// app.use('/users', UserRoutes);

app.get('/api/ping', function(req, res) {
	return res.send('hello');
});

app.listen(process.env.PORT || 3000);
