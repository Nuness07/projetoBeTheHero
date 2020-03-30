const express = require('express');
const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const {celebrate, Segments, Joi } = require('celebrate');


const routes = express.Router();

//Login ultilizamos o metodo post
routes.post('/sessions', SessionController.create);

//Ongs
routes.get('/ongs', OngController.index);
// Celebrate vem antes, pq primeiro ele deve fazer a validação da rota e depois continuar
routes.post('/ongs', celebrate({
    //Validando body
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(), //Isso quer dizer que o nome deve ser ums string obrigatoria
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);


//Incidents
routes.post('/incidents', IncidentController.create);
routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,IncidentController.index);

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) ,IncidentController.delete);

//Profile
routes.get('/profile', celebrate({
    //validando headers
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//Rota raiz do node é /

//Exportar variavel de dentro de um arquivo
module.exports = routes;