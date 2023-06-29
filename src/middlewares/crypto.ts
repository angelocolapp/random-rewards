import bcrypt from 'bcrypt';

const saltRounds = 10; // Define o número de rounds (iterações) para a geração do salt

// Função para criptografar uma senha
export async function encryptPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds); // Gera um hash da senha usando bcrypt
  return hashedPassword; // Retorna a senha criptografada
}

// Função para comparar uma senha com uma senha criptografada
export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword); // Compara a senha com a senha criptografada usando bcrypt
  return isMatch; // Retorna um valor booleano indicando se as senhas correspondem
}
