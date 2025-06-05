async function checkDoctorAccess(req, res, next) {
    // Verifique req.user.role === 'doctor'
    // Verifique se pode acessar req.params.consultaId
    // Se sim, chame next(); senão, retorne 403
  }
  
  module.exports = checkDoctorAccess;