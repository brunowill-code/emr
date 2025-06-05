import  bcrypt  from 'bcrypt';
const saltRounds = 10;

export async function verificarPasswordFunction(password) {


    const temMinimo = password.length >= 8;
    const temMaiuscula = /[A-Z]/.test(password);
    const temMinuscula = /[a-z]/.test(password);
    const temNumero = /[0-9]/.test(password);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return temMinimo && temMaiuscula && temMinuscula && temNumero && temEspecial;
}


export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log('salt', salt);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}

