const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const sortingString = require('./sortingString');
const { emailValidate, checkingEmail } = require('./middleware/checkingEmail');
const { passwordValidate, checkingPassword } = require('./middleware/checkingPassword');
const validToken = require('./middleware/validToken');
const validNames = require('./middleware/validNames');
const validAges = require('./middleware/validAges');
const talkExists = require('./middleware/talkExists');
const dateFormate = require('./middleware/dateFormate');
const rating = require('./middleware/rating');

const arquivo = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;

const readArchive = async (fileName) => {
  const archiveJson = await fs.readFile(fileName, 'utf-8');
  return JSON.parse(archiveJson);
};

// Redireciona para /talker
app.get('/talker', async (_req, res) => {
  const palestrantes = await readArchive(arquivo);

  return res.status(200).json(palestrantes);
});

// Pega os palestrinhas e vê se encontra
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const palestrantes = await readArchive(arquivo);
  const palestrante = palestrantes.find((acc) => acc.id === Number(id));

  if (!palestrante) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(palestrante);
});

// Recebe dados e retorna o tokenzinho pro login
  app.post('/login', 
  checkingEmail, 
  emailValidate, 
  passwordValidate,
  checkingPassword,
  (_req, res) => {
    const tokenGerado = sortingString(16);
  return res.status(200).json({ token: tokenGerado });
});

// Recebe os dados, bate com as validações e retorna rota
  app.post('/talker',
  validToken,
  validNames,
  validAges,
  talkExists,
  dateFormate,
  rating,
  async (req, res) => {
      const { name, age, talk } = req.body;
      const palestrantes = await readArchive(arquivo);
      const newTalker = {
        id: palestrantes.length + 1,
        name,
        age,
        talk,
      };
      const newList = [...palestrantes, newTalker];
      await fs.writeFile(arquivo, JSON.stringify(newList));
      return res.status(201).json(newTalker);
});

app.put('/talker/:id',
  validToken,
  validNames,
  validAges,
  talkExists,
  dateFormate,
  rating,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const palestrantes = await readArchive(arquivo);
    const searchId = palestrantes.findIndex((acc) => (acc.id === Number(id)));

    palestrantes[searchId] = {
      id: Number(id),
      name,
      age,
      talk,
    };

    await fs.writeFile(arquivo, JSON.stringify(palestrantes));

    return res.status(200).json(palestrantes[searchId]);
});

app.delete('/talker/:id', 
  validToken,
  async (req, res) => {
    const { id } = req.params;
    const palestrantes = await readArchive(arquivo);
    const searchId = palestrantes.findIndex((acc) => (acc.id === Number(id)));
    palestrantes.splice(searchId, 1);
    await fs.writeFile(arquivo, JSON.stringify(palestrantes));
    return res.status(204).end();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});