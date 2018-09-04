import { observable, action, computed } from 'mobx';
import axios from 'axios';
import moment from 'moment';

// Each product in the Product Store is initialized as a product
// allowing us to update a product individually without having to
// re-render the entire product list
class Product {
	id;

	@observable
	name;

	@observable
	code;

	@observable
	price;

	@observable
	creator;

	@observable
	last_modified;

	@observable
	img;

	constructor(product) {
		Object.keys(product).forEach(key => (this[key] = product[key]));
	}

	// Updates a single instance of a product
	@action
	update(newData) {
		axios.patch(`/api/products/${newData.id}`, newData).then(({ data }) => {
			Object.keys(data).forEach(key => (this[key] = data[key]));
		});
	}

	// Used to display the date on the Product View
	@computed
	get formattedDate() {
		return moment.unix(this.last_modified).format('MMMM Do YYYY');
	}
}

// The main store for the application. Contains all product data in the products array
class ProductStore {
	@observable
	products = [];

	@observable
	loading = false;

	@observable
	formData = null;

	@observable
	modalActive = false;

	@observable
	filter = '';

	editProduct = {};

	@action
	fetchProducts() {
		this.loading = true;
		axios.get('/api/products').then(({ data }) => {
			data.forEach(p => this.products.push(new Product(p)));
			this.loading = false;
		});
	}

	@action
	addProduct(product) {
		this.loading = true;
		axios.post('/api/products', product).then(({ data }) => {
			this.products.push(new Product(data));
			this.loading = false;
		});
	}

	@action
	deleteProduct(product) {
		this.loading = true;
		axios.delete(`/api/products/${product.id}`).then(({ data }) => {
			this.products = this.products.filter(p => p.id !== data.id);
			this.loading = false;
		});
	}

	@action
	toggleModal(product) {
		this.modalActive = !this.modalActive;
		this.editProduct = product || {};
	}

	@action
	search(term) {
		this.filter = term;
	}

	@computed
	get filteredProducts() {
		const filter = this.filter.toLowerCase();

		return this.products.filter(
			p =>
				p.name.toLowerCase().startsWith(filter) ||
				p.code.toLowerCase().startsWith(filter) ||
				p.creator.toLowerCase().startsWith(filter),
		);
	}
}

export default ProductStore;
