
exports.up = function(knex) {
   return knex.schema.createTable('ongs', function (table){
       //Primary Key
        table.string('id').primary();

        //Atributos
        table.string("nome").notNullable();
        table.string("email").notNullable();
        table.string("whatsapp").notNullable();
        table.string("city").notNullable();
        table.string("uf").notNullable();
   })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
