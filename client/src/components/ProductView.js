import React from 'react';
import { observer } from 'mobx-react';

const defaultImgUrl = 'https://bulma.io/images/placeholders/48x48.png';

const ProductView = observer(props => (
	//Passing a product to toggleModal popluates the form with its values
	<div
		className="product-container"
		onClick={() => props.ps.toggleModal(props.product)}
	>
		<div className="columns is-mobile">
			<div className="column is-4 product-column">
				<div>
					<figure className="image is-48x48">
						<img
							src={props.product.img || defaultImgUrl}
							alt="Product"
						/>
					</figure>
				</div>

				<p className="is-size-6 level-item">
					Parby Warker - {props.product.name}
				</p>
			</div>
			<div className="column">
				<p className="is-size-7">${props.product.price}</p>
			</div>
			<div className="column">
				<p className="is-size-7">{props.product.code}</p>
			</div>
			<div className="column">
				<p className="is-size-7">{props.product.creator}</p>
			</div>
			<div className="column">
				<p className="is-size-7">{props.product.formattedDate}</p>
			</div>
		</div>
	</div>
));

export default ProductView;
