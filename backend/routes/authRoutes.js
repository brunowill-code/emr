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
import { getAtendimento,iniciarAtendimento } from "../controllers/atendimentocontroller.js"

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

//rota para marcar consulta

router.post('/marcar-consulta',authenticateToken, marcarConsulta);

//rota para pegar o agendamento filtrado pelo usuário

router.get('/agendamentos-pacientes', authenticateToken, agendamentoByPacientes);

router.post('/solicitar-atendimento', authenticateToken, solicitarAtendimento);

router.get('/get-solicitacoes' ,authenticateToken, getSolicitacao );

router.get('/get-all-solicitacoes', authenticateToken, getAllSolicitacoes);

router.patch('/rejeitar-solicitacao', authenticateToken, rejeitarSolicitacao);

router.patch('/aceitar-solicitacao', authenticateToken, aceitarSolicitacao);

router.get('/get-atendimento', authenticateToken, getAtendimento);

router.post('/iniciar-atendimento', authenticateToken , iniciarAtendimento);

export default router;