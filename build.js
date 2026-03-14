const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, 'template-cliente.html');
const DADOS_PATH = path.join(__dirname, 'clientes.json');
const DIST_DIR = path.join(__dirname, 'dist');

// Função auxiliar para criar slug do nome_negocio
function generateSlug(text) {
  return text.toString().toLowerCase()
    .normalize('NFD')               // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// Função auxiliar para converter link do Google Drive em link direto de imagem
function formatDriveUrl(url) {
  if (!url || !url.includes('drive.google.com')) return url;
  const match = url.match(/(?:\/d\/|id=)([\w-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url;
}

async function buildPages() {
  try {
    // 1. Ler o Template HTML
    const templateHTML = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    
    // 2. Ler os dados dos clientes
    const dadosClientes = JSON.parse(fs.readFileSync(DADOS_PATH, 'utf-8'));
    
    console.log(`Iniciando build para ${dadosClientes.length} cliente(s)...`);

    // 3. Processar cada cliente
    for (const cliente of dadosClientes) {
      const slug = generateSlug(cliente.nome_negocio);
      
      // Alerta de Segurança MVP (Validação por E-mail)
      if (!cliente.email_compra) {
        console.warn(`⚠️ ALERTA: Cliente "${cliente.nome_negocio}" não forneceu o E-mail de Compra!`);
      }

      let htmlModificado = templateHTML;

      // Montar a lista de serviços em HTML (Cards)
      let servicosHTML = '';
      if (cliente.servicos_lista && cliente.servicos_lista.length > 0) {
        servicosHTML = cliente.servicos_lista.map(servico => `
            <div class="service-item">
                <div class="service-icon">✦</div>
                <div class="service-desc">
                    <h4>${servico}</h4>
                    <p>Especialidade Premium</p>
                </div>
            </div>`).join('');
      } else {
        servicosHTML = '<p style="color:var(--text-muted); text-align:center;">Nenhum serviço cadastrado.</p>';
      }

      // Substituição exata das Tags
      htmlModificado = htmlModificado.replace(/\{\{NOME_NEGOCIO\}\}/g, cliente.nome_negocio);
      htmlModificado = htmlModificado.replace(/\{\{WHATSAPP\}\}/g, cliente.whatsapp);
      htmlModificado = htmlModificado.replace(/\{\{DIFERENCIAL\}\}/g, cliente.diferencial);
      htmlModificado = htmlModificado.replace(/\{\{SOBRE_MIM\}\}/g, cliente.sobre_mim);
      htmlModificado = htmlModificado.replace(/\{\{PROVA_SOCIAL\}\}/g, cliente.prova_social);
      htmlModificado = htmlModificado.replace(/\{\{CIDADE\}\}/g, cliente.cidade);
      htmlModificado = htmlModificado.replace(/\{\{COR_DESTAQUE\}\}/g, cliente.cor_destaque);
      
      // Foto com tratamento para Google Drive
      const fotoFinal = formatDriveUrl(cliente.foto_url) || "https://ui-avatars.com/api/?name=" + encodeURIComponent(cliente.nome_negocio) + "&background=random";
      htmlModificado = htmlModificado.replace(/\{\{FOTO_URL\}\}/g, fotoFinal);
      
      htmlModificado = htmlModificado.replace(/\{\{SERVICOS_CARDS\}\}/g, servicosHTML);
      
      // 5. Salvar o arquivo final do cliente
      const outputPath = path.join(DIST_DIR, `${slug}.html`);
      fs.writeFileSync(outputPath, htmlModificado, 'utf-8');
      
      console.log(`✅ Página gerada: ${slug}.html`);
    }

    // 6. Gerar a Landing Page de Vendas Principal (vendas.html -> index.html)
    const salesLP = fs.readFileSync(path.join(__dirname, 'vendas.html'), 'utf-8');
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), salesLP, 'utf-8');

    // 7. Gerar um Painel (painel.html) para o Usuário ver na pasta raiz da Vercel
    let indexHTML = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Painel LP Bios Pro</title><style>body { font-family: sans-serif; padding: 40px; background: #f3f6f4; } .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); } a { color: #1ebc59; font-weight: bold; text-decoration: none; }</style></head><body><h1>Painel de Clientes Ativos</h1>`;
    
    if (dadosClientes.length === 0) {
        indexHTML += `<p>Nenhum cliente cadastrado ainda. A sua planilha está vazia!</p>`;
    } else {
        dadosClientes.forEach(cliente => {
            const slug = generateSlug(cliente.nome_negocio);
            indexHTML += `<div class="card">
                <h3>${cliente.nome_negocio}</h3>
                <p>Link: <a href="/${slug}.html" target="_blank">/${slug}.html</a></p>
                <p>WhatsApp: ${cliente.whatsapp_display}</p>
            </div>`;
        });
    }
    indexHTML += `</body></html>`;
    fs.writeFileSync(path.join(DIST_DIR, 'painel.html'), indexHTML, 'utf-8');

    console.log('\n🚀 Build, Landing Page e Painel concluídos com sucesso!');

  } catch (erro) {
    console.error('❌ Erro durante o build:', erro.message);
  }
}

buildPages();
