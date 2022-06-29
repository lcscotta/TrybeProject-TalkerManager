// Função de gerar os negócios aleatórios nas strings
function sortingString(numchar) {
    let token = '';
    const stringCha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < numchar; i += 1) {
      const random = parseInt((Math.random() * 36), 0);
      token = `${token}${(stringCha[random])}`;
    }
    return token;
  }
  module.exports = sortingString; 