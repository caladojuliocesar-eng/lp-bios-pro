const axios = require('axios');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// ⚠️ COLETA O LINK AQUI QUANDO A PLANILHA DO GOOGLE FOR PUBLICADA
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJv-AMsusQeYvlxpjC8Vg_mQfWEC_pwNoLINlP7kw_sX06rrBun2hmYDHvWHXtveSd2X0tgTLdvMHG/pub?output=csv";
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
                    nome_negocio: row['1. Nome do seu Negócio (Ex: Padaria Doce Sabor)'] || "",
                    servico_principal: row['2. Qual é o seu Serviço Principal? (Aquele que mais te define)'] || "",
                    cidade: row['3. Cidade e Bairro onde o negócio está localizado (Ex: São Paulo, Vila Olímpia)'] || "",
                    whatsapp: (row['4. Número de Contato do WhatsApp (Inclua DDD, Ex: 11987654321)'] || "").replace(/\D/g, ''),
                    whatsapp_display: row['4. Número de Contato do WhatsApp (Inclua DDD, Ex: 11987654321)'] || "",
                    diferencial: row['5. Frase que define o seu Diferencial (Sua proposta de valor única em uma frase curta)'] || "",
                    servicos_lista: ((row['6. Quais outros Serviços você oferece?'] || "") + "," + (row["6.1 Se 'Outros' foi selecionado ou se preferir listar, separe os serviços adicionais por vírgulas."] || "")).split(',').map(s => s.trim()).filter(s => s),
                    cor_destaque: row['7. Cor Preferida ou Cor da Marca (No formato de código HEX, Ex: #1ebc59)'] || "#1ebc59",
                    foto_url: row['8. Upload de Imagem de Referência/Logo'] || row['8.1 Se não for possível fazer o upload, forneça o link do Google Drive para a imagem de referência/logo.'] || ""
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
