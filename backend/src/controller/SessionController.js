const connection = require ('../database/connection');

module.exports={
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('nome')
        .first();//Retorna apenas um resultado

        if(!ong){
            return response.status(400).json({ error: 'Nenhuma ONG encontrada com esse ID'});
        }

        return response.json(ong);
    }
}