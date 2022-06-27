// Função de ver se foi preenchido
function checkingPassword(req, res, next) {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  return next();
}

// Função de validar a senha
function passwordValidate(password) {
  const { password } = req.body;
  if (password.length < 5) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
}
  module.exports = { passwordValidate, checkingPassword };