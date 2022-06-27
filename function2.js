// Função se o campo foi preenchido
function checkingEmail(req, res, next) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  return next();
}
// Função de validar e-mails
function emailValidate(req, res, next) {
  const { email } = req.body;
    const regex = /\S+@\S+.com/;
    const testerEmail = regex.test(email);
    if (testerEmail) return next();
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  module.exports = { emailValidate, checkingEmail };