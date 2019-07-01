const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = function (url) {

    fetch(url) // Utilizando o módulo fetch para retornar o HTML da página do produto da Americanas
        .then(res => res.text())
        .then(body => {
            const $ = cheerio.load(body); // Recebendo o body da página e usando o módulo cheerio para resgatar os valores da página
            const id = convertInt($('.TextUI-sc-1hrwx40-0.brNcBx'));
            const breadcrumb = [];
            const titulo = $('#product-name-default').text();
            const vendendor = $('.seller-name-container span').text();
            const preco = convertInt($('.main-price .sales-price')) / 100;
            const image = $('.image-gallery img')[0].attribs.src;

            $('.product-breadcrumb span').each(function(){
                breadcrumb.push(this.children[0].data);
            });

            // Montando o objeto com os dados resgatados da url
            const product = {
                id: id,
                breadcrumb : breadcrumb,
                name: titulo,
                img: image,
                seller: vendendor,
                price: preco
            };
            
            // Printando os valores no terminal
            console.log(product);            
        })
        .catch(err => {
            console.log('Ops! Ocorreu um erro.');
            console.error(err);
        });
}

//Função auxiliar para converter os valores do código e preço para inteiro e float
function convertInt(valor) {
    return parseInt(valor.text().replace(/[^\d]+/g,''));
}