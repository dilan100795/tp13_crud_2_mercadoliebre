const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* 
{
  "id": 1,
  "name": "Cafetera Moulinex Dolce Gusto Edited",
  "price": 100,
  "discount": 50,
  "category": "visited",
  "description": "Cafetera Dolce Gusto Lumio. La cafetera Dolce Gusto Lumio es de variedad automática que ha llegado con un diseño radical al que nos tenía acostumbrados Dolce Gusto.En este post te contamos todo lo que necesitas saber sobre ella, desde sus características técnicas hasta la calidad de las cápsulas o price.",
  "image": "img-cafetera-moulinex.jpg"
 }
*/

const controller = {
	index: (req, res) => {
		productsVisited = products.filter(product => product.category === "visited")
		productsOferts = products.filter(product => product.category === "in-sale")
		// return res.send(productsOferts)

		res.render('index', {productsVisited, productsOferts, toThousand});
	},
	search: (req, res) => {
		res.render('result')
	},
};

module.exports = controller;
