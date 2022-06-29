function validTalk(req, res, next) {
    const { talk } = req.body;
    if (talk === undefined || Object.keys(talk).length === 0) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    if (talk.watchedAt === undefined) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (talk.rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    next();
  }
  
  module.exports = validTalk; 