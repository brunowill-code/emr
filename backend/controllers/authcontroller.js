import jwt from "jsonwebtoken";
import { getUsersWithAcess } from "../services/userService.js";
import dotenv from "dotenv";
import  bcrypt  from 'bcrypt';

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
  const validPassword = await bcrypt.compare(password, users.senha);
  if(users.email === username && validPassword){
    console.log('users.profile_completed', users.profile_completed);
    const token = jwt.sign({
      username, scopes: users.type_acess,id: users.id_usuario, profile: users.profile_completed}, SECRET_KEY ,{
      expiresIn: TOKEN_EXPIRATION,
    });
    res.json({ token });
    } else {
      console.log("credenciais incorretas");
    }
}

