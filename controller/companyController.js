const service = require('../services/companyServices');

exports.create = async (req, res) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear empresa' });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await service.get();
    if (!data) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al buscar empresa' });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await service.update(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar empresa' });
  }
};

exports.delete = async (req, res) => {
  try {
    await service.delete();
    res.status(200).json({ message: 'Empresa eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar empresa' });
  }
};
