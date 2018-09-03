import { observable, action, computed } from 'mobx';
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

	@computed
	get formattedDate() {
		return moment.unix(this.last_modified).format('MMMM Do YYYY');
	}
}

class ProductStore {
	products = observable([]);

	@action
	addProduct(product) {
		this.products.push(new Product(product));
	}
}

export default ProductStore;
