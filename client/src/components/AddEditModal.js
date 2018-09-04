import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class AddEditModal extends Component {
	handleSubmit(e) {
		e.preventDefault();

		const { name, price, code, creator } = this.refs;

		const product = {
			...this.props.ps.editProduct,
			name: name.value,
			price: price.value,
			code: code.value,
			creator: creator.value,
			last_modified: Math.round(new Date().getTime() / 1000),
		};

		if (this.props.ps.editProduct.update)
			this.props.ps.editProduct.update(product);
		else this.props.ps.addProduct(product);

		this.props.ps.toggleModal();
	}

	render() {
		const { ps } = this.props;
		const { modalActive, editProduct } = ps;

		if (!modalActive) return null;

		return (
			<div className="modal is-active">
				<div
					className="modal-background"
					onClick={() => ps.toggleModal()}
				/>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">
							{editProduct.name ? 'Edit' : 'Add'} Product
						</p>
						<button
							className="delete"
							aria-label="close"
							onClick={() => ps.toggleModal()}
						/>
					</header>
					<section className="modal-card-body">
						<form onSubmit={this.handleSubmit.bind(this)}>
							<div className="field">
								<label className="label">Name</label>
								<div className="control">
									<input
										className="input"
										type="text"
										placeholder="e.g Goofy Glasses"
										ref="name"
										defaultValue={editProduct.name}
									/>
								</div>
							</div>

							<div className="field">
								<label className="label">Price</label>
								<div className="control">
									<input
										className="input"
										type="text"
										placeholder="e.g. 100.50"
										ref="price"
										defaultValue={editProduct.price}
									/>
								</div>
							</div>

							<div className="field">
								<label className="label">Code</label>
								<div className="control">
									<input
										className="input"
										type="text"
										placeholder="e.g. PWE328"
										ref="code"
										defaultValue={editProduct.code}
									/>
								</div>
							</div>

							<div className="field">
								<label className="label">Creator</label>
								<div className="control">
									<input
										className="input"
										type="text"
										placeholder="e.g Theon Greyjoy"
										ref="creator"
										defaultValue={editProduct.creator}
									/>
								</div>
							</div>

							<div className="field is-grouped">
								<div className="control">
									<button
										className="button is-success"
										type="submit"
										onClick={this.handleSubmit.bind(this)}
									>
										Submit
									</button>
								</div>
								<div className="control">
									<button
										className="button"
										onClick={() => ps.toggleModal()}
									>
										Cancel
									</button>
								</div>
							</div>
						</form>
					</section>
				</div>
			</div>
		);
	}
}

export default AddEditModal;
