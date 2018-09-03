const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');

let data = require('./initial-data.json');

const app = express();

app.use(bodyParser.json());

app.get('/api/products', (req, res) => res.send(data));

app.post('/api/products', (req, res) => {
	const newProduct = _.pick(req.body, [
		'name',
		'code',
		'price',
		'creator',
		'last_modified',
	]);

	newProduct.id = data[data.length - 1].id + 1;

	data.push(newProduct);

	res.send(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
	const deletedProduct = data.find(p => p.id === parseInt(req.params.id, 10));

	data = data.filter(p => p.id !== req.params.id);

	res.send(deletedProduct);
});

app.patch('/api/products/:id', (req, res) => {
	let updatedProduct = _.pick(req.body, [
		'name',
		'code',
		'price',
		'creator',
		'last_modified',
	]);

	updatedProduct = { id: req.params.id, ...updatedProduct };

	data = data.map(
		p => (p.id === parseInt(req.params.id, 10) ? updatedProduct : p),
	);

	res.send(updatedProduct);
});

app.listen(process.env.PORT || 3000);
