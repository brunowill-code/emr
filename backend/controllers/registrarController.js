import { hashPassword , verificarPasswordFunction } from '../functions/registerFunctions.js';
import { registrarUsuario } from '../services/registerService.js';



export const registrar = async (req, res) => {
    const user = req.body;
    console.log(user.senha);
    const verificarPassword = await verificarPasswordFunction(user.senha);
    if (!verificarPassword) {
        return res.status(400).json({ erro: 'Senha fraca. A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.' });
    }
    const hashNoPassword = await hashPassword(user.senha);
    console.log(hashNoPassword);
    const cadastrar = await registrarUsuario(user, hashNoPassword);
    return res.status(200).json('Usuário cadastrado no sistema')
}