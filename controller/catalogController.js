const service = require('../services/catalogServices');

exports.create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear categoria ' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al buscar categoria' });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar la categoria' });
  }
};

exports.delete = async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar la categoria' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const data = await service.addProduct(
      req.params.catalogId,
      req.body
    );
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al agregar el producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await service.updateProduct(
      req.params.catalogId,
      req.params.productId,
      req.body
    );
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await service.deleteProduct(
      req.params.catalogId,
      req.params.productId
    );
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};
