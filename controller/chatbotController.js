const chatbotService = require('../services/chatbotServices');

exports.ask = async (req, res) => {
  try {
    console.log('Body recibido:', req.body);

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'La pregunta es obligatoria' });
    }

    const answer = await chatbotService.process(question);

    return res.status(200).json({
      message: 'Respuesta generada correctamente',
      data: answer
    });
    

  } catch (err) {
    console.error('ERROR:', err);

    return res
      .status(500)
      .json({ message: 'Error al procesar la pregunta' });
  }
};
