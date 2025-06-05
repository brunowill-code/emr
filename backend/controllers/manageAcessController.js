import { getUsersWithoutAcessService , giveAcessService, addPacientesService } from '../services/manageAcessService.js'

export const getUsersWithoutAcess = async(req,res) =>{
    const type_acess = req.user.scopes;

    if(type_acess === 'admin' || type_acess === 'super_user'){
        console.log('usuario autorizado');
        const users = await getUsersWithoutAcessService();
        console.log(users);
        return res.json(users)
    }
    else{
        return res.status(401).json({ message: 'Usuário não autorizado.'});
    }
}
const acessos = {
    'Medico': 4,
    'Tecnico': 3,
    'Paciente': 2,
    'Admin': 1,
};

export const giveAcess = async (req, res) => {
    const acesso = req.user.scopes;

    if (acesso === 'admin' || acesso ==='super_user') {
        const { id_usuario, type_acess } = req.body;
        console.log('Usuário autorizado:', id_usuario, type_acess);

        const id_acesso = acessos[type_acess];
        console.log('id de acesso paciente', id_acesso);
        const give = await giveAcessService(id_usuario,id_acesso);
        if(id_acesso === 2){
            console.log('Adicionando a tabela pacientes');
            const addPacientes = await addPacientesService(id_usuario)
            
        }
        return res.json();

    }else {
        return res.status(401).json({ message: 'Usuário sem acesso' });
    }

};