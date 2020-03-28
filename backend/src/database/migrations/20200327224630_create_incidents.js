
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        //Primary Key
        table.increments();

        //Atributos
        table.string("title").notNullable();
        table.string("description").notNullable();
        table.decimal("value").notNullable();
        table.string("ong_id").notNullable();

        //Foreign Key
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents')
};
