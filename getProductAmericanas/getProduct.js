const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = function (url) {

    fetch(url) // Utilizando o módulo fetch para retornar o HTML da página do produto da Americanas
        .then(res => res.text())
        .then(body => {
            console.log(body)
        })
        .catch(err => {
            console.log('Ops! Ocorreu um erro.');
            console.error(err);
        });
}