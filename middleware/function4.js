// Função de verificar tokens válidos
function validToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.lenght !== 16) return res.status(401).json({ message: 'Token inválido' });
    next();
  }
  
  module.exports = validToken;