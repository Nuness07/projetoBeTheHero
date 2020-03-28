const crypto = require('crypto');//Um pacote do node que consegue gerar números aleatórios
const connection = require('../database/connection');//Importando o arquivo da conexão com o banco

module.exports = {
    //Listagem das Ongs
    async index(request, response) {
        const ongs = await connection('ongs').select('*');//Selecionar tudo da tabela ongs
        return response.json(ongs);
    },

    //Cadastro de ongs na tabela
    async create(request, response) {
        //Fazendo o request do json no browser
        const { nome, email, whatsapp, city, uf } = request.body;

        //Gerando Id aleatório usando o pacote do node crypto
        const id = crypto.randomBytes(4).toString('HEX');

        //Inserindo dados da ong
        /**
         * Await serve para o node aguardar a finalização do bloco de código
         * para só depois continuar, é necessario ter o async
         */
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
}