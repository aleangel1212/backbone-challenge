import React from 'react';
import { observer } from 'mobx-react';

import ProductView from './ProductView';

const ProductTable = observer(props => {
	const renderProducts = products => {
		return products.map(p => (
			<ProductView key={p.id} product={p} ps={props.ps} />
		));
	};

	return (
		<div>
			<div className="columns is-mobile pt-headers is-hidden-mobile">
				<p className="column is-4">Product</p>
				<p className="column has-text-centered">Price</p>
				<p className="column has-text-centered">Code</p>
				<p className="column has-text-centered">Created By</p>
				<p className="column has-text-centered">Last Modified</p>
			</div>
			{renderProducts(props.ps.filteredProducts)}
		</div>
	);
});

export default ProductTable;
