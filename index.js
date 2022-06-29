const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const sortingString = require('./middleware/function1');
const { emailValidate, checkingEmail } = require('./middleware/function2');
const { passwordValidate, checkingPassword } = require('./middleware/function3');
const validToken = require('./middleware/function4');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const readArchive = async (fileName) => {
  const archiveJson = await fs.readArchive(fileName, 'utf-8');
  return JSON.parse(archiveJson);
};

// Redireciona para /talker
app.get('/talker', async (_req, res) => {
  const palestrantes = await readArchive('./talker.json');

  return res.status(200).json(palestrantes);
});

// Pega os palestrinhas e vê se encontra
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const palestrantes = await readArchive('./talker.json');
  const palestrante = palestrantes.find((acc) => acc.id === Number(id));

  if (!palestrante) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(palestrante);
});

// Recebe dados e retorna o tokenzinho
  app.post('/login', 
  checkingEmail, 
  emailValidate, 
  passwordValidate,
  checkingPassword,
  (_req, res) => {
    const tokenGerado = sortingString(16);
  return res.status(200).json({ token: tokenGerado });
});

app.post('/talker', validToken, () => {
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});