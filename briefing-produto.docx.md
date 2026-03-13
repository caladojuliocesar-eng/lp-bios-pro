

**BRIEFING DO PRODUTO**

**Link da Bio Profissional que Gera Clientes**

*Documento para execução técnica via Antigravity*

# **1\. O Produto**

O produto é um serviço de criação e hospedagem de páginas profissionais focadas em converter visitas do Instagram ou Google em pedidos de orçamento pelo WhatsApp.

| Campo | Descrição |
| :---- | :---- |
| Nome do produto | Link da Bio Profissional (nome provisório) |
| Proposta de valor | Transformar o link da bio em uma página que gera clientes |
| Público-alvo | Pequenos negócios e prestadores de serviço que vendem por orçamento |
| Canal principal | Instagram (link na bio), anúncios, Google |
| Ação desejada | Cliente clica no botão e entra em contato pelo WhatsApp |
| Diferencial | Não é uma lista de links genérica — é uma página pensada para converter |

| *O vilão do produto não é o Linktree especificamente — é o comportamento de 'coloquei um link lá e tá feito', sem pensar em conversão.* |
| :---- |

# **2\. Nicho Recomendado para Validação**

A estratégia é começar com um nicho específico antes de abrir para todos os segmentos. Isso facilita o marketing, acelera a indicação boca a boca e permite criar templates pré-prontos.

**Nicho prioritário: Estética e Beleza**

* Designer de sobrancelha, lash designer, nail designer, micropigmentação

* Muito ativas no Instagram, zero presença web fora do perfil

* Alta taxa de indicação dentro do nicho

* Ticket acessível — pouca resistência para pagar R$49–R$79/mês

**Nichos secundários (fase 2\)**

| Nicho | Perfil | Potencial de indicação |
| :---- | :---- | :---- |
| Prestadores de serviço | Eletricista, encanador, pintor, marido de aluguel | Alto |
| Clínicas e consultórios | Fisio, nutrição, psicologia, odontologia | Médio-alto |
| Fotógrafos e criativos | Foto, vídeo, design, social media | Médio |
| Reforma e construção | Pedreiro, azulejista, gesseiro, marceneiro | Alto |

# **3\. Modelo de Negócio**

O produto opera no modelo SaaS (software como serviço) simplificado: o cliente paga mensalmente para manter a página no ar. A receita é recorrente e previsível.

**Tabela de preços sugerida**

| Plano | O que inclui | Preço/mês |
| :---- | :---- | :---- |
| Básico | Página padrão do nicho, subdomínio do produtor | R$ 49 |
| Intermediário | Página personalizada com foto, cores e textos do cliente | R$ 79 |
| Premium | Página personalizada \+ domínio próprio do cliente configurado | R$ 127 |

| *Para o MVP: focar no plano Intermediário (R$79/mês). É onde estará a maioria dos primeiros clientes.* |
| :---- |

**Projeção de receita**

| Clientes ativos | Receita mensal (R$79) | Receita anual |
| :---- | :---- | :---- |
| 10 clientes | R$ 790/mês | R$ 9.480/ano |
| 50 clientes | R$ 3.950/mês | R$ 47.400/ano |
| 100 clientes | R$ 7.900/mês | R$ 94.800/ano |
| 200 clientes | R$ 15.800/mês | R$ 189.600/ano |

# **4\. Arquitetura do MVP (Fase de Validação)**

O MVP deve ser executado com custo zero e o máximo de manualidade possível. O objetivo não é automatizar — é validar se as pessoas pagam. Só automatizar depois de 5 a 10 clientes pagando.

**Stack do MVP — custo R$0**

| Ferramenta | Função | Custo |
| :---- | :---- | :---- |
| Google Forms | Formulário de onboarding do cliente | Grátis |
| Google Sheets | Planilha de controle de clientes | Grátis |
| Script Node.js | Gera o HTML do cliente com os dados da planilha | Grátis |
| Vercel (free tier) | Hospedagem com subdomínio (cliente.seusite.com.br) | Grátis |
| GitHub Pages | Alternativa de hospedagem gratuita | Grátis |
| Hostinger (existente) | Pasta por cliente (seusite.com.br/cliente) | Já pago |
| Asaas (free tier) | Cobrança recorrente via PIX ou boleto | Grátis até escalar |

| *Para os primeiros 5 clientes: cobrar manualmente via PIX. Só implementar cobrança automática quando o processo de entrega estiver rodando bem.* |
| :---- |

# **5\. Fluxo Operacional do MVP**

**Passo a passo de entrega por cliente**

1. Cliente preenche o formulário de onboarding (Google Forms)

2. Dados caem automaticamente na planilha de controle (Google Sheets)

3. Script Node.js lê a linha do cliente e gera o arquivo HTML personalizado

4. HTML é subido na hospedagem (Vercel ou Hostinger)

5. Cliente recebe o link por WhatsApp e coloca na bio do Instagram

6. Cobrança mensal disparada via Asaas ou PIX manual

**Campos do formulário de onboarding**

Cada campo deve ter uma descrição explicativa embaixo (o Google Forms suporta isso nativamente com o campo 'descrição'). Isso evita idas e vindas por WhatsApp.

| Campo | Exemplo de resposta | Descrição explicativa |
| :---- | :---- | :---- |
| Nome do negócio | Studio Ana Lima | Como você quer que apareça na página — pode ser seu nome ou o nome do seu negócio |
| Serviço principal | Design de sobrancelha e lash | O que você faz? Descreva como explicaria para uma amiga |
| Cidade / bairro | São Paulo — Vila Madalena | Onde você atende? Isso aparece na página para clientes locais |
| Número do WhatsApp | 11 99999-9999 | O número que vai receber os pedidos de orçamento — com DDD |
| Frase do seu diferencial | Especialista em design natural para cabelos loiros | O que te diferencia? Uma frase curta que resume seu trabalho |
| Serviços que oferece | Sobrancelha, lash clássico, lash volume russo | Liste os principais serviços — um por linha |
| Cor preferida | Verde escuro / rose gold | Usaremos como cor de destaque da sua página — pode deixar em branco para usarmos a padrão |
| Foto de perfil | Upload de imagem | Foto sua ou do seu trabalho — usaremos como imagem principal da página |

# **6\. Lógica de Geração do HTML**

O HTML da página de cada cliente é gerado por substituição de variáveis. O template base já está pronto (desenvolvido previamente). O script Node.js lê os dados da planilha e substitui os marcadores pelos valores reais.

**Estrutura de variáveis no template**

O arquivo template.html contém marcadores no formato {{VARIAVEL}}. O script substitui cada marcador pelo valor correspondente da planilha.

| Marcador no HTML | Dado do cliente |
| :---- | :---- |
| {{NOME\_NEGOCIO}} | Nome do negócio ou profissional |
| {{SERVICO\_PRINCIPAL}} | Serviço principal descrito pelo cliente |
| {{CIDADE}} | Cidade e bairro de atendimento |
| {{WHATSAPP}} | Número completo com DDI para o link wa.me |
| {{DIFERENCIAL}} | Frase de diferencial do cliente |
| {{SERVICOS\_LISTA}} | Lista de serviços (gerada como itens HTML) |
| {{COR\_DESTAQUE}} | Cor em hexadecimal para personalização visual |
| {{FOTO\_URL}} | URL da imagem de perfil hospedada |
| {{SLUG}} | Identificador único para subdomínio ou pasta |

| *O SLUG é gerado automaticamente a partir do nome do negócio: 'Studio Ana Lima' vira 'studio-ana-lima'. Esse é o subdomínio ou o nome da pasta na hospedagem.* |
| :---- |

# **7\. Hospedagem e URLs**

**Opção A — Vercel com subdomínios (recomendado para escalar)**

* Cada cliente recebe uma URL do tipo: cliente.seudominio.com.br

* Configuração via wildcard DNS no domínio principal

* Deploy automático via GitHub Actions ou CLI do Vercel

* Plano gratuito suporta bem os primeiros clientes

**Opção B — Hostinger com pastas (recomendado para o MVP imediato)**

* Cada cliente recebe uma URL do tipo: seudominio.com.br/cliente

* Subir o arquivo HTML manualmente via FTP ou painel da Hostinger

* Mais simples para começar — zero configuração extra

* Migrar para subdomínios quando tiver 10+ clientes

**Opção C — GitHub Pages (gratuito, sem domínio próprio)**

* URL no formato: seuperfil.github.io/cliente

* Bom para validação inicial sem nenhum custo

* Menos profissional para apresentar ao cliente — usar só na fase de teste

# **8\. Ordem de Execução Técnica**

Construir na seguinte ordem. Não pular etapas — cada uma valida a anterior.

| Etapa | O que construir | Quando fazer |
| :---- | :---- | :---- |
| 1 | Script Node.js de geração do HTML a partir de variáveis | Primeiro — é o núcleo do produto |
| 2 | Formulário de onboarding no Google Forms com campos e descrições | Logo depois do script |
| 3 | Planilha de controle no Google Sheets conectada ao Forms | Automático via Forms |
| 4 | Subir primeiro cliente manualmente na Hostinger | Ao fechar primeiro cliente |
| 5 | Configurar Asaas para cobrança recorrente | Ao fechar segundo ou terceiro cliente |
| 6 | Automatizar deploy via Vercel \+ GitHub Actions | Com 10+ clientes |
| 7 | Sistema de subdomínios automáticos | Com 20+ clientes |

# **9\. Ativo Principal — A Página**

A landing page já está desenvolvida e é o principal ativo do produto. Ela foi construída com foco em conversão para WhatsApp, linguagem simples para pequenos empresários, e design profissional em tema claro.

**Características técnicas da página**

* HTML puro com CSS inline — sem dependências externas

* Responsiva para mobile e desktop

* Botão flutuante de WhatsApp fixo em toda a página

* Variáveis no formato {{MARCADOR}} prontas para substituição

* Seções: Hero, Problema, Comparação, Solução, Como Funciona, Benefícios, Para Quem, Autoridade, Oferta, CTA Final

**Arquivo a entregar ao Antigravity**

Entregar o arquivo landing-page-bio.html junto com este briefing. Esse HTML é o template base que o script vai usar para gerar as páginas de cada cliente.

| *Importante: a página não menciona 'Linktree' diretamente. O vilão é o comportamento genérico — 'link solto, sem estratégia'. Isso amplia o alcance do produto para qualquer tipo de link atual do cliente.* |
| :---- |

# **10\. Instruções para o Antigravity**

Levar este documento e o arquivo HTML para o Antigravity e seguir a ordem de construção abaixo. Pedir uma peça de cada vez — não tentar fazer tudo num único prompt.

**Prompt sugerido para começar**

| Contexto: Estou construindo um produto SaaS simples: uma página profissional que transforma visitas do Instagram em pedidos de orçamento no WhatsApp. Cada cliente recebe uma página personalizada hospedada num subdomínio ou pasta. O que eu já tenho: • Um arquivo HTML completo da página (template-base) • A lógica de variáveis definida ({{NOME\_NEGOCIO}}, {{WHATSAPP}}, etc.) O que preciso agora: Um script Node.js que leia uma linha de uma planilha Google Sheets (via CSV exportado), substitua as variáveis no template HTML, e salve um novo arquivo HTML com o nome do slug do cliente. |
| :---- |

**Próximas peças (pedir em sequência)**

7. Script Node.js de geração do HTML

8. Formulário Google Forms com todos os campos e descrições

9. Integração Forms → Sheets automática

10. Script de upload para Hostinger via FTP

11. Configuração de subdomínios no Vercel

12. Sistema de cobrança recorrente com Asaas

13. Painel simples para visualizar clientes ativos

*Briefing gerado em sessão de planejamento com Claude (Anthropic)*

Documento confidencial — uso interno