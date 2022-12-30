const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const guardar = (dato) => fs.writeFileSync(productsFilePath,JSON.stringify(dato,null,4),'utf-8');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// let discounts = toThousand(products.price - (products.price * products.discount / 100));
		// let prices = toThousand(products.price)
		res.render('products', {products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = +req.params.id;
		let product = products.find(product => product.id === id);
		let discounts = toThousand(Math.round(product.price - (product.price * product.discount/100)));
		let prices = toThousand(product.price);
		res.render('detail', {product, discounts, prices, toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let id = +req.params.id;

		let image = req.file 
		const {name,price,discount,category,description} = req.body;

		let newProduct = {
			id: products[products.length - 1].id + 1,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description,
			image: image == null ? "default-image.png" : image.filename 
		};
		products.push(newProduct);
		guardar(products)

		res.redirect(`/products/${newProduct.id}`);
	},

	// Update - Form to edit
	edit: (req, res) => {
	const id = +req.params.id
	let productToEdit = products.find(productToEdit => productToEdit.id === id);

		res.render('product-edit-form', {productToEdit, toThousand})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = +req.params.id;
		const {name,price,discount,category,description} = req.body;

		let product = products.find(product => product.id === id)

		let productToEdit = products.forEach(productToEdit => {
			if (productToEdit.id === id) {
			productToEdit.name = name;
			productToEdit.price = price;
			productToEdit.discount = discount;
			productToEdit.category = category;
			productToEdit.description = description;
			}
		});
		
		guardar(products);
			return res.redirect(`/products/detail/${product.id}`);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = +req.params.id;

		let productDestroyer = products.filter(product => product.id !== id);
		guardar(productDestroyer);

		res.redirect('/products');
	}
};

module.exports = controller;