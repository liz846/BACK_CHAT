const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  uses: String,
  applications: String,
  presentation: String,
  lineaPre: String,
  lineaEco: String,
  propietys: String,
  recomUses: String,
  aromas:String,
  nameSeg: String,
  decripSeg: String,
  usesSeg:String,
  advantagesSeg:String
});

const CatalogSchema = new mongoose.Schema({
  categoryName: String,
  description: String,
  orderPosition: Number,
  products: [ProductSchema]
});

module.exports = mongoose.model('Catalog', CatalogSchema);
