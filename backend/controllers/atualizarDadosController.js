import { addProfissionalService,getIdProfissionalDeSaude ,completeProfileService  } from "../services/atualizarDadosService.js";
import db from "../config/database.js";

export const atualizarDados = async (req, res) => {
    const type_acess = req.user.scopes;
    const user_id = req.user.id;
    const updates = req.body;

    // Lista de campos permitidos
    const camposPermitidos = {
        medico: ["crm", "especialidade"],
        usuario: ["nome_usuario", "email", "senha", "cpf"]
    };

    if (type_acess === 'medico') {
        const getIdProfissional = await getIdProfissionalDeSaude(user_id);
        console.log(getIdProfissional);
        if(getIdProfissional.length === 0){
            console.log('num existe');
            const addProfissional = await addProfissionalService(user_id,updates.crm, updates.especialidade);
            console.log(addProfissional);
            const completeProfile = await completeProfileService(user_id);
            console.log(completeProfile);

        } else {
            console.log('existe');
        }

    } else {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
};