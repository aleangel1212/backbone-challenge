import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ProductStore from '../stores/ProductStore';

import Navbar from './Navbar';
import ProductTable from './ProductTable';

const ps = new ProductStore();

@observer
class App extends Component {
	componentWillMount() {
		ps.addProduct({
			id: 1,
			name: 'Turtoise Frame',
			code: 'PW1689',
			price: 99.0,
			creator: 'Jon Snow',
			last_modified: 1538359384,
		});
	}

	render() {
		return (
			<div className="container">
				<Navbar />
				<section className="section">
					<h3 className="title is-3">Products</h3>
					<ProductTable products={ps.products} />
				</section>
			</div>
		);
	}
}

export default App;
