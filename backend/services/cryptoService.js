// encryptionService.js
import crypto from "crypto";
const AES_KEY = Buffer.from(process.env.AES_SECRET_KEY, 'hex'); // 32 bytes
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;


// Função de Criptografia
export async function encrypt(jsonData){
    // Converte o objeto JSON em uma string
    const text = JSON.stringify(jsonData);
    
    // Gera um IV aleatório de 16 bytes
    const iv = crypto.randomBytes(IV_LENGTH);
    
    // Cria o objeto de criptografia
    const cipher = crypto.createCipheriv(ALGORITHM, AES_KEY, iv);
    
    // Criptografa a string
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    // Retorna o resultado criptografado com IV em base64
    const result = {
      iv: iv.toString('base64'),
      data: encrypted
    };
    
    return Buffer.from(JSON.stringify(result)).toString('base64');
  }

  export async function decrypt(encryptedText){
    if (!encryptedText) return '';

    const json = JSON.parse(Buffer.from(encryptedText, 'base64').toString('utf-8'));
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(AES_KEY),
        Buffer.from(json.iv, 'base64')
    );

    let decrypted = decipher.update(json.data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

