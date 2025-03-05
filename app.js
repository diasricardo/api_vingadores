import express from 'express';
import cors from 'cors';
import fs from 'fs'; // Usando fs para ler o arquivo JSON

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rota que lê o JSON e retorna apenas as identidades secretas dos membros
app.get('/api/vingadores/identidades', (req, res) => {
  try {
    // Lê o arquivo JSON de forma síncrona
    const data = fs.readFileSync('vingadores.json', 'utf8');
    const vingadores = JSON.parse(data); // Converte o conteúdo em JSON

    // Extrai apenas as identidades secretas dos membros
    const identidadesSecretas = vingadores.membros.map(membro => membro.identidadeSecreta);

    res.json({ identidadesSecretas }); // Retorna as identidades secretas
  } catch (err) {
    // Se ocorrer um erro, retorna uma mensagem de erro
    res.status(500).json({ erro: 'Erro ao ler o arquivo JSON' });
  }
});

// Rota que lê o JSON e retorna todas as informações dos membros
app.get('/api/vingadores', (req, res) => {
  try {
    // Lê o arquivo JSON de forma síncrona
    const data = fs.readFileSync('vingadores.json', 'utf8');
    const vingadores = JSON.parse(data); // Converte o conteúdo em JSON

    res.json(vingadores); // Retorna todas as informações dos Vingadores
  } catch (err) {
    // Se ocorrer um erro, retorna uma mensagem de erro
    res.status(500).json({ erro: 'Erro ao ler o arquivo JSON' });
  }
});

// Nova Rota que retorna idade e poderes dos membros
app.get('/api/vingadores/idade-e-poderes', (req, res) => {
    try {
      const data = fs.readFileSync('vingadores.json', 'utf8');
      const vingadores = JSON.parse(data);
  
      const idadeEPoderes = vingadores.membros.map(membro => ({
        nome: membro.nome,
        idade: membro.idade,
        poderes: membro.poderes
      }));
  
      res.json({ idadeEPoderes });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao ler o arquivo JSON' });
    }
  });

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
