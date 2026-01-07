const Catalog = require('../model/catalogModel');

class CatalogService {
  async create(data) {
    return await Catalog.create(data);
  }

  async getAll() {
    return await Catalog.find();
  }

  async update(id, data) {
    return await Catalog.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Catalog.findByIdAndDelete(id);
  }

  async addProduct(catalogId, productData) {
    return await Catalog.findByIdAndUpdate(
      catalogId,
      { $push: { products: productData } },
      { new: true }
    );
  }

  async updateProduct(catalogId, productId, data) {
    return await Catalog.findOneAndUpdate(
      { _id: catalogId, 'products._id': productId },
      {
        $set: Object.keys(data).reduce((acc, key) => {
          acc[`products.$.${key}`] = data[key];
          return acc;
        }, {})
      },
      { new: true }
    );
  }

  async deleteProduct(catalogId, productId) {
    return await Catalog.findByIdAndUpdate(
      catalogId,
      { $pull: { products: { _id: productId } } },
      { new: true }
    );
  }
}

module.exports = new CatalogService();
