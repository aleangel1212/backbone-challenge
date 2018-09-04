import { observable, action, computed } from 'mobx';
import axios from 'axios';
import moment from 'moment';

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

	constructor(product) {
		Object.keys(product).forEach(key => (this[key] = product[key]));
	}

	@action
	update(newData) {
		axios.patch(`/api/products/${newData.id}`, newData).then(({ data }) => {
			Object.keys(data).forEach(key => (this[key] = data[key]));
		});
	}

	@computed
	get formattedDate() {
		return moment.unix(this.last_modified).format('MMMM Do YYYY');
	}
}

class ProductStore {
	@observable
	products = [];

	@observable
	loading = false;

	@observable
	formData = null;

	@observable
	modalActive = false;

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
	toggleModal(product) {
		this.modalActive = !this.modalActive;
		this.editProduct = product || {};
	}
}

export default ProductStore;
