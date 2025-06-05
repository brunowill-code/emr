import 'dotenv/config.js';
import { encrypt, decrypt } from '../backend/services/cryptoService.js';



// Seu JSON
const jsonData = {
  "peso": "as",
  "altura": "as",
  "glicemia": "asd",
  "objetivo": "asdasd",
  "saturacaoO2": "asd",
  "temperatura": "asd",
  "pressaoArterial": "asd",
  "perimetroCefalico": "a",
  "frequenciaCardiaca": "asd",
  "indiceMassaCorporea": "asd",
  "perimetroPanturrilha": "asd",
  "frequenciaRespiratoria": "asd"
};

// Criptografando o JSON
const encrypted = await encrypt(jsonData);
console.log('Encrypted:', encrypted);

// Descriptografando o JSON
const decryptedJson = await decrypt(encrypted);
console.log('Decrypted:', decryptedJson);