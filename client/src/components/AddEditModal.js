import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';

@observer
class AddEditModal extends Component {
	state = {
		isUploading: false,
		img: this.props.ps.editProduct.img,
	};

	handleSubmit(e) {
		e.preventDefault();

		const { name, price, code, creator } = this.refs;

		const product = {
			...this.props.ps.editProduct,
			name: name.value,
			price: price.value,
			code: code.value,
			creator: creator.value,
			img: this.state.img,
			last_modified: Math.round(new Date().getTime() / 1000),
		};

		if (this.props.ps.editProduct.update)
			this.props.ps.editProduct.update(product);
		else this.props.ps.addProduct(product);

		this.props.ps.toggleModal();
	}

	handleFile(e) {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('img', file);

		this.setState({ isUploading: true });

		axios
			.post('/uploads', formData)
			.then(({ data }) =>
				this.setState({ img: data.filename, isUploading: false }),
			);
	}

	deleteImage() {
		this.setState({ img: null });
	}

	renderDelete() {
		if (!this.props.ps.editProduct.update) return null;

		return (
			<div className="level-right">
				<button
					className="button level-item is-danger"
					onClick={() => {
						this.props.ps.deleteProduct(this.props.ps.editProduct);
						this.props.ps.toggleModal();
					}}
				>
					Delete
				</button>
			</div>
		);
	}

	renderLoader(isUploading) {
		if (isUploading)
			return (
				<div className="control">
					<div className="box image-box">
						<div className="loader" />
					</div>
				</div>
			);

		return (
			<div className="control">
				<input
					className="file-input"
					type="file"
					ref="file"
					onChange={this.handleFile.bind(this)}
				/>
				<div
					className="box image-box"
					onClick={() => {
						this.refs.file.click();
					}}
				>
					<span className="icon is-large has-text-primary">
						<i className="fa fa-lg fa-plus" />
					</span>
					<span className="file-label has-text-grey-dark">
						Add Image
					</span>
				</div>
			</div>
		);
	}

	renderImage(img) {
		if (!img) return this.renderLoader(this.state.isUploading);

		return (
			<div className="control">
				<div
					className="box image-box"
					style={{ backgroundImage: `url(${img})` }}
				>
					<a className="delete" onClick={() => this.deleteImage()} />
				</div>
			</div>
		);
	}

	render() {
		const { ps } = this.props;
		const { editProduct } = ps;

		return (
			<div className="modal is-active">
				<div
					className="modal-background"
					onClick={() => ps.toggleModal()}
				/>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">
							{editProduct.update ? 'Edit' : 'Add'} Product
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

							<div className="field is-grouped is-grouped-multiline">
								{this.renderImage(this.state.img)}
							</div>

							<div className="level">
								<div className="level-left">
									<button
										className="button level-item is-success"
										type="submit"
										onClick={this.handleSubmit.bind(this)}
									>
										Submit
									</button>

									<button
										className="button level-item is-text"
										onClick={() => ps.toggleModal()}
									>
										Cancel
									</button>
								</div>
								{this.renderDelete()}
							</div>
						</form>
					</section>
				</div>
			</div>
		);
	}
}

export default AddEditModal;
