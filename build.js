const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, 'landing-page-bio.html');
const DADOS_PATH = path.join(__dirname, 'clientes.json');
const DIST_DIR = path.join(__dirname, 'dist');

// Função auxiliar para criar slug do nome_negocio
function generateSlug(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
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
      let htmlModificado = templateHTML;

      // Montar a lista de serviços em HTML
      let servicosHTML = '';
      if (cliente.servicos_lista && cliente.servicos_lista.length > 0) {
        servicosHTML = cliente.servicos_lista.map(servico => 
          `<li><span class="ico">✓</span> ${servico}</li>`
        ).join('\n          ');
      }

      // 4. Substituições Customizadas - Você pode adicionar as variáveis no template original se desejar
      // Aqui estamos substituindo algumas informações genéricas no template que não usam {{TAG}} ainda:
      // Nota: o .replace() básico substitui apenas a PRIMEIRA ocorrência.
      // Substituindo todas ocorrências do numero de whatsapp (ex. link do zap e botão)
      htmlModificado = htmlModificado.replace(/SEUNUMERO/g, cliente.whatsapp);
      
      // Vamos adicionar as substituições dinâmicas de cores
      // Você pode ajustar o estilo original do template também
      if (cliente.cor_destaque) {
        // Substituindo a variável root
        htmlModificado = htmlModificado.replace(/--verde: #1ebc59;/g, `--verde: ${cliente.cor_destaque};`);
        htmlModificado = htmlModificado.replace(/--destaque: #1aaa50;/g, `--destaque: ${cliente.cor_destaque};`);
        htmlModificado = htmlModificado.replace(/background: #1ebc59;/g, `background: ${cliente.cor_destaque};`);
        htmlModificado = htmlModificado.replace(/color: #1aaa50;/g, `color: ${cliente.cor_destaque};`);
        htmlModificado = htmlModificado.replace(/#1ebc59/g, cliente.cor_destaque);
      }

      // Injetando Título e Hero
      htmlModificado = htmlModificado.replace(/<span class="destaque">pedidos de orçamento<\/span>/g, `<span class="destaque">${cliente.servico_principal}</span>`);
      htmlModificado = htmlModificado.replace(/<title>.*?<\/title>/g, `<title>${cliente.nome_negocio} | Contato</title>`);
      
      // Injetando Diferencial no subtítulo
      htmlModificado = htmlModificado.replace(/Criamos uma página simples e profissional que transforma quem visita seu perfil em clientes que entram em contato pelo WhatsApp./g, cliente.diferencial);
      
      // 5. Salvar o arquivo final do cliente
      const outputPath = path.join(DIST_DIR, `${slug}.html`);
      fs.writeFileSync(outputPath, htmlModificado, 'utf-8');
      
      console.log(`✅ Página gerada: ${slug}.html`);
    }

    console.log('\n🚀 Build concluído com sucesso!');

  } catch (erro) {
    console.error('❌ Erro durante o build:', erro.message);
  }
}

buildPages();
