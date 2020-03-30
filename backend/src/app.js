const express = require('express');//Express é um pacote
const cors = require('cors');
const routes = require('./routes');//Como routes é um arquivo usamos o ./
const { errors } = require('celebrate')
const app = express();

app.use(cors());
app.use(express.json())//Indicar que estou recebendo JSON
app.use(routes);
app.use(errors());

/*
  1-Rotas: O conjunto completo -> http://localhost:3333/users
  2-Recursos(Geralmente esta associado a uma tabela no DB): 
  è o caminho da rota -> /users
*/

/*
    Métodos HTTP

    1-GET:Buscar/Listar uma informação no back-end
    2-POST: Criar uma nova informação no back-end
    3-PUT: Alterar uma informação no back-end
    4-DELETE: Deletar uma informação no back-end
*/

/**
 * Tipos de parâmetros
 * 
 * Query Params:Parametros nomeados enviamos dentro da url após um "?"
 * Servem para filtros, paginação e outras coisas(.query)
 * 
 * Route Params:Ultilizados para identificar recursos
 * EX: /users/:id, /users/1 vai buscar apenas o usuario com id 1(.params)
 * 
 * Request Body: Corpo da requisição, ultilziado para criar ou alterar
 * recursos(.body)
 */

 /**
  * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
  * NoSQL: MongoDB, CouchDB, etc...
  */

  /**
   * Instalação do banco de dados:
   * 1°Opção: Driver: SELECT * FROM users
   * 2°Opção> Query Builder: table('users').select('*').where()
   */


module.exports = app;



//A porta que iremos usar no browser para acessar a aplicação
//Porque não usar a porta 8080? Pq ela pode dar problemas em alguns SOs