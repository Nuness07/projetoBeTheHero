const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        //Colchetes em volta  faz com que retorne apenas um resultado
        const [count] = await connection('incidents').count();//Contar quantos estão cadastrados na tabela

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)//Limitar a apenas 5 registros por vez
            .offset((page - 1) * 5)//Vai listar 5 acada pagina


            .select([
                'incidents.*',
                'ongs.nome',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        //Retornar no header da requisição o total de casos cadastrados
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },


    async create(request, response) {
        //Fazendo a requisição para o browser
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)//Buscar o incidente que o id for igual ao da ong conectada
            .select('ong_id')//Selecionar apenas a coluna desse id
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operação não permitida.' });
            //Status 401 é de não autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
        //O status 204 serve para retornar uma resposta ao front sem conteudo
    }
};