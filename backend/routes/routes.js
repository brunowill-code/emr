import express from "express";
import { login } from "../controllers/authcontroller.js";
import { authenticateToken } from "../middlewares/authMiddleware.js"
import { 
  getSolicitacao,
  agenda,
  desmarcarConsulta,
  confirmarPresenca, 
  agendaLivre, 
  marcarConsulta, 
  agendamentoByPacientes, 
  solicitarAtendimento,
  getAllSolicitacoes,
  rejeitarSolicitacao,
  aceitarSolicitacao,
} from "../controllers/agendamentocontroller.js";
import { getAtendimento,iniciarAtendimento,finalizarConsulta, getHistorico ,salvarAtestados, salvarExames,salvarPrescricao, getArquivos } from "../controllers/atendimentocontroller.js"
import { registrar } from '../controllers/registrarController.js'
import { getUsersWithoutAcess, giveAcess } from '../controllers/manageAcessController.js'
import { atualizarDados } from '../controllers/atualizarDadosController.js'

const router = express.Router();

// Rota de login
router.post('/login', login);

router.get('/', (req, res) => {
  res.send('Servidor rodando...');
});

//rota de verificação de token
router.get('/verify-token', authenticateToken, (req, res) => {
    console.log("Token verificado com sucesso!");
    res.json({ valid: true, user: req.user });
  });

//rota para tabela de agendamentos
router.get('/agenda',authenticateToken, agenda);

//rota para a tabela de marcar novo atendimento
router.post('/agenda-livre',authenticateToken, agendaLivre)

//rota para desmarcar consulta
router.post('/desmarcar-consulta',authenticateToken, desmarcarConsulta);

//rota para confirmar presença
router.post('/confirmar-presenca',authenticateToken, confirmarPresenca);

//rota para marcar consult
router.post('/marcar-consulta',authenticateToken, marcarConsulta);

//rota para pegar o agendamento filtrado pelo usuário
router.get('/agendamentos-pacientes', authenticateToken, agendamentoByPacientes);

//rota para paciente solicitar atendimento
router.post('/solicitar-atendimento', authenticateToken, solicitarAtendimento);

//rota para paciente acessar as solicitações dele
router.get('/get-solicitacoes' ,authenticateToken, getSolicitacao );

//rota para acessar todas solicitações
router.get('/get-all-solicitacoes', authenticateToken, getAllSolicitacoes);

//rota para rejeitar Solicitação
router.patch('/rejeitar-solicitacao', authenticateToken, rejeitarSolicitacao);

//rota para aceitar solicitação
router.patch('/aceitar-solicitacao', authenticateToken, aceitarSolicitacao);

//rota para pegar atendimento após presença
router.get('/get-atendimento', authenticateToken, getAtendimento);

//rota para iniciar atendimento
router.post('/iniciar-atendimento', authenticateToken , iniciarAtendimento);

//rota para pegar histórico
router.get('/consultas-prontuario',authenticateToken, getHistorico);

//rota para salvar atestato
router.post('/salvar-atestados',authenticateToken, salvarAtestados);

//rota para salvar exames
router.post('/salvar-exames',authenticateToken, salvarExames);

//rora para salvar prescricao
router.post('/salvar-prescricao',authenticateToken, salvarPrescricao);


//rota para pegar arquivos
router.get('/get-arquivos-consultas', authenticateToken , getArquivos);


//rota para finalizar prontuario
router.post('/finalizar-consulta', authenticateToken, finalizarConsulta);
//rota para registrar usuario
router.post('/registrar' , registrar);

//rota para adm pegar usuarios sem acesso
router.get('/get-users-without-acess', authenticateToken , getUsersWithoutAcess);
//rota para adm dar acesso a usuario
router.post('/give-acess',authenticateToken, giveAcess);

//rota para usuario editar seu perfil
router.patch('/atualizar-dados', authenticateToken, atualizarDados);
export default router;