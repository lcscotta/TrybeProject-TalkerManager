const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const readArchive = async (fileName) => {
  const archiveJson = await fs.readArchive(fileName, 'utf-8');
  return JSON.parse(archiveJson);
};

// Função de gerar os negócios aleatórios nas strings
function createToken(numchar) {
  let token = '';
  const stringSorted = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < numchar; i += 1) {
    const random = parseInt((Math.random() * 36), 0);
    token = `${token}${(stringSorted[random])}`;
  }

  return token;
}

createToken(16);

module.exports = createToken;

app.get('/talker', async (_req, res) => {
  const palestrantes = await readArchive('./talker.json');

  return res.status(200).json(palestrantes);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const palestrantes = await readArchive('./talker.json');
  const palestrante = palestrantes.find((acc) => acc.id === Number(id));

  if (!palestrante) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(palestrante);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});