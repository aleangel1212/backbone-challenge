import React from 'react';

const renderProducts = products => {
	return products.map(p => (
		<div key={p.id} className="product-container">
			<div className="columns is-mobile">
				<div className="column is-4 product-column">
					<div>
						<figure className="image is-48x48">
							<img
								src="https://bulma.io/images/placeholders/48x48.png"
								alt="Product"
							/>
						</figure>
					</div>

					<p className="is-size-6 level-item">
						Parby Warker - {p.name}
					</p>
				</div>
				<div className="column">
					<p className="is-size-7">${p.price}</p>
				</div>
				<div className="column">
					<p className="is-size-7">{p.code}</p>
				</div>
				<div className="column">
					<p className="is-size-7">{p.creator}</p>
				</div>
				<div className="column">
					<p className="is-size-7">{p.formattedDate}</p>
				</div>
			</div>
		</div>
	));
};

const ProductTable = props => (
	<div>
		<div className="columns is-mobile pt-headers">
			<p className="column is-size-8 is-uppercase has-text-weight-bold has-text-grey is-4">
				Product
			</p>
			<p className="column has-text-centered">Price</p>
			<p className="column has-text-centered">Code</p>
			<p className="column has-text-centered">Created By</p>
			<p className="column has-text-centered">Last Modified</p>
		</div>
		{renderProducts(props.products)}
	</div>
);

export default ProductTable;
