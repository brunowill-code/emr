import jwt from "jsonwebtoken";
import { getUsersWithAcess } from "../services/userService.js";
import dotenv from "dotenv";


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'chave_secreta';
const TOKEN_EXPIRATION = 30000;



export const login = async (req,res) => {
    const { username, password } = req.body;
      const users = await getUsersWithAcess(username);
      console.log(users);
      console.log(username, password);
      if(!users){
        console.error("Usuário não encontrado");
        return res.status(401).json({ message: "Usuário não encontrado" });
      }
        if(users.nome_usuario === username && users.senha === password){
          const token = jwt.sign({username, scopes: users.type_acess,id: users.id_usuario}, SECRET_KEY ,{
            expiresIn: TOKEN_EXPIRATION,
          });
          res.json({ token });
        } else {
          console.log("credenciais incorretas");
        }
}

