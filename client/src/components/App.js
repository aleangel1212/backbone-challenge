import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ProductStore from '../stores/ProductStore';

import Navbar from './Navbar';
import AddEditModal from './AddEditModal';
import ProductTable from './ProductTable';

// Initialize Product Store for application
const ps = new ProductStore();

@observer
class App extends Component {
	componentWillMount() {
		ps.fetchProducts();
	}

	// Displays a spinner when projects are being added to the store
	renderLoader(loading) {
		if (!loading) return null;

		return <div className="loader" />;
	}

	// Renders the add/edit project modal
	renderModal(modalActive) {
		if (!modalActive) return null;

		return <AddEditModal ps={ps} />;
	}

	render() {
		return (
			<div className="container">
				<Navbar ps={ps} />
				{this.renderModal(ps.modalActive)}
				<section className="section">
					<h3 className="title is-3">Products</h3>
					<ProductTable ps={ps} />
					{this.renderLoader(ps.loading)}
				</section>
			</div>
		);
	}
}

export default App;
