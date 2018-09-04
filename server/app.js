const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const _ = require('lodash');

// Utilizing array instead of db for simplicity.
// Normally, here we would intialize mongoose to interface
// with MongoDB
let data = require('./initial-data.json');

const app = express();
const UPLOAD_DIR = path.join(__dirname, './uploads');

app.use(bodyParser.json());
app.use(fileUpload());

//TODO: abstract routes for each category to their own files
/* --- Product Routes --- */
app.get('/api/products', (req, res) => res.send(data));

app.post('/api/products', (req, res) => {
	// Strip unwanted data from request body
	const newProduct = _.pick(req.body, [
		'img',
		'name',
		'code',
		'price',
		'creator',
		'last_modified',
	]);

	newProduct.id = data[data.length - 1] ? data[data.length - 1].id + 1 : 0;

	data.push(newProduct);

	res.send(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
	const deletedProduct = data.find(p => p.id === parseInt(req.params.id, 10));

	data = data.filter(p => p.id !== parseInt(req.params.id, 10));

	res.send(deletedProduct);
});

app.patch('/api/products/:id', (req, res) => {
	// Strip unwanted data from request body
	let updatedProduct = _.pick(req.body, [
		'img',
		'name',
		'code',
		'price',
		'creator',
		'last_modified',
	]);

	updatedProduct = { id: parseInt(req.params.id), ...updatedProduct };

	data = data.map(
		p => (p.id === parseInt(req.params.id, 10) ? updatedProduct : p),
	);

	res.send(updatedProduct);
});

/* --- Picture Upload Routes --- */
app.post('/uploads', (req, res) => {
	const img = req.files.img;

	img.mv(path.join(UPLOAD_DIR, img.name), err => {
		res.send({
			message: 'File uploaded successfully',
			filename: '/uploads/' + img.name,
		});
	});
});

app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT || 3000);
