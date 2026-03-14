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
                // Função auxiliar para achar a chave (coluna) que contém determinado texto (case-insensitive)
                const getVal = (prefix) => {
                    const key = Object.keys(row).find(k => k.toLowerCase().includes(prefix.toLowerCase()));
                    return key ? row[key] : "";
                };

                // Formatação dos dados que chegam da planilha para o formato do script
                const clienteFormatado = {
                    nome_negocio: getVal('1. Nome') || "",
                    cidade: getVal('7. Cidade') || "",
                    whatsapp: (getVal('2. WhatsApp') || "").replace(/\D/g, ''),
                    whatsapp_display: getVal('2. WhatsApp') || "",
                    diferencial: getVal('3. Qual sua principal') || "",
                    sobre_mim: getVal('4. Mini-Biografia') || "",
                    prova_social: getVal('5. Prova Social') || "",
                    servicos_lista: (getVal('6. Escreva seus top') || "").split(',').map(s => s.trim()).filter(s => s),
                    cor_destaque: (getVal('8. Cor que representa') || "#1ebc59").startsWith('#') ? getVal('8. Cor que representa') : '#' + getVal('8. Cor que representa'),
                    foto_url: getVal('9. Link da sua foto') || "",
                    // Campo de segurança principal
                    email_compra: getVal('E-mail') || ""
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
