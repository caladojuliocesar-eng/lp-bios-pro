const axios = require('axios');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// ⚠️ COLETA O LINK AQUI QUANDO A PLANILHA DO GOOGLE FOR PUBLICADA
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxKXBBQSUJ2ikHNZLVSeeUVKiwmmdNOWUMqEOlqhPCWN8JWelMqyb5Ke6qCZogL6Don3M_YNftJm0v/pub?output=csv";
const DADOS_PATH = path.join(__dirname, 'clientes.json');

async function sincronizarPlanilha() {
    console.log("📥 Baixando dados da Planilha Google...");
    
    if (GOOGLE_SHEETS_CSV_URL === "SUA_URL_AQUI") {
      console.error("❌ ERRO: A URL da planilha ainda não foi configurada no script sync.js!");
      return;
    }

    try {
        const response = await axios({
            method: 'get',
            url: GOOGLE_SHEETS_CSV_URL,
            responseType: 'stream'
        });

        const clientes = [];

        response.data
            .pipe(csv())
            .on('data', (row) => {
                // Formatação dos dados que chegam da planilha para o formato do script
                const clienteFormatado = {
                    nome_negocio: row['1. Nome do Profissional ou do Negócio'] || "",
                    cidade: row['7. Cidade e Bairro'] || "",
                    whatsapp: (row['2. WhatsApp de Atendimento (com DDD)'] || "").replace(/\D/g, ''),
                    whatsapp_display: row['2. WhatsApp de Atendimento (com DDD)'] || "",
                    diferencial: row['3. Qual sua principal promessa ou diferencial? (Em 1 frase curta)'] || "",
                    sobre_mim: row['4. Mini-Biografia: Escreva um parágrafo curto sobre sua trajetória ou sua marca'] || "",
                    prova_social: row["5. Prova Social: Me diga um número que gera autoridade (Ex: 'Mais de 500 meninas transformadas', '5 anos no mercado')"] || "",
                    servicos_lista: (row['6. Escreva seus top 3 Serviços Principais (Separe EXATAMENTE com vírgula)'] || "").split(',').map(s => s.trim()).filter(s => s),
                    cor_destaque: row['8. Cor que representa sua marca (Apenas Código Hexadecimal. Ex: #fa4283)'] || "#1ebc59",
                    foto_url: row['9. Link da sua foto (Link Público do Google Drive)'] || ""
                };
                
                // Ignora linhas vazias (sem nome do negocio)
                if (clienteFormatado.nome_negocio) {
                    clientes.push(clienteFormatado);
                }
            })
            .on('end', () => {
                fs.writeFileSync(DADOS_PATH, JSON.stringify(clientes, null, 2), 'utf-8');
                console.log(`✅ ${clientes.length} clientes sincronizados com sucesso no arquivo clientes.json!`);
                console.log(`👉 Agora você já pode rodar: node build.js`);
            })
            .on('error', (error) => {
                console.error("❌ Erro ao converter CSV:", error.message);
            });

    } catch (error) {
        console.error("❌ Erro ao acessar a Planilha Google:", error.message);
    }
}

sincronizarPlanilha();
