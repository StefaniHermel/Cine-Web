🎬 CineWeb: Recomendação de Séries em Tempo Real
Projeto Avaliativo Final - Módulo 01 - Mobile React Native T1 - M1S13

📖 Sobre o Projeto
O CineWeb é a evolução do antigo CineMatch JS, que rodava no terminal. Agora o motor de recomendação ganhou uma interface web real: qualquer pessoa, em qualquer dispositivo, preenche um formulário de perfil e recebe recomendações de séries reais, buscadas em tempo real na API pública TVMaze. O perfil fica salvo no navegador para não precisar preencher tudo de novo. O problema que resolve é que, antes, só quem sabia usar o terminal conseguia acessar o recomendador; agora, qualquer usuário com um navegador pode usar.

🛠️ Tecnologias Utilizadas
HTML5 semântico com header, main, section, article, footer e meta tags de SEO. CSS3 com Flexbox, Grid, box model, responsividade mobile-first e media queries. JavaScript ES6+ com módulos ES (import/export), POO com classes Conteudo e Serie (herança e this), métodos de array (filter, sort, slice, map), fetch com async/await e try/catch, localStorage para persistir o perfil, setTimeout para animações e mensagens de carregamento, callbacks e closures. Node.js com npm e live-server para servir o projeto localmente.

🚀 Como Executar
Clone o repositório com git clone https://github.com/seu-usuario/cineweb.git, entre na pasta do projeto com cd cineweb, instale as dependências com npm install, inicie o servidor local com npm start e abra o navegador em http://127.0.0.1:8080. Também é possível rodar pela extensão Live Server do VS Code, clicando com o botão direito no cine-web.html e escolhendo Open with Live Server.

📁 Estrutura de Arquivos
A pasta do projeto contém cine-web.html (estrutura da página com formulário, resultados e modal), cine-web.css (estilos e responsividade), cine-web.js (orquestração do formulário, fetch, cálculo e localStorage), ui-web.js (renderização dos cards e do modal), modelo.js (classes Conteudo e Serie), package.json (scripts e dependências do live-server) e README.md (este arquivo).

⚙️ Funcionalidades e Atribuições
A Estefânia Hermel ficou responsável pelos RF01 a RF08, que incluem: RF01, estrutura HTML semântica com landmarks, h1, title e meta description; RF02, formulário de perfil com nome, idade e gêneros, usando addEventListener, preventDefault e validação; RF03, persistência do perfil com localStorage usando JSON.stringify e JSON.parse, pulando o formulário se já existir; RF04, busca na TVMaze API com fetch, async/await, try/catch e tratamento dos estados carregando, erro e vazio; RF05, tratamento do catálogo com filter, sort, slice e map; RF06, classes Conteudo e Serie adaptadas da versão terminal, com herança e this; RF07, cálculo de compatibilidade (gêneros em comum dividido pelo total, multiplicado por 100) com classificação Alta, Média ou Baixa; RF08, renderização dinâmica dos cards no DOM com createElement e classList. Também ficou com os RF14 e RF15 (módulos ES separando cine-web.js, ui-web.js e modelo.js, e package.json com script start usando live-server), com o Git/GitHub (branches main, develop e feature, além de commits descritivos) e com a documentação no README.

O Adriano Alves ficou responsável pelos RF09 a RF13, que incluem: RF09, estilização com Flexbox, Grid e responsividade mobile-first com media queries; RF10, callback exibirMensagemDeBoasVindas(nome) após o carregamento; RF11, closure com contador de recálculos por sessão; RF12, mensagem de carregamento com setTimeout; RF13, SEO básico e acessibilidade com labels, alt, foco visível, meta tags e aria-label. Também ficou com o modal de detalhes (janela sobreposta com sinopse, nota, ano e gêneros das séries em destaque), com a colaboração na documentação, com a gravação do vídeo de apresentação de até 7 minutos e com os testes finais em desktop e mobile.

🔄 CommonJS vs ESM
No projeto original do terminal usávamos CommonJS com require() e module.exports, o padrão histórico do Node.js com carregamento síncrono. Nesta versão web adotamos o padrão ESM (ES Modules), que usa import e export, tem carregamento assíncrono e é nativo dos navegadores modernos. Para usar ESM, o HTML carrega o script com script type module e src apontando para cine-web.js.

📱 Responsividade
A abordagem é mobile-first. No desktop, os cards das recomendações ficam em grade de até 5 colunas com Grid e as Mais Procuradas em 5 colunas. No tablet, a grade tem menos colunas. No mobile, os cards ficam empilhados, o formulário é adaptado para toque e as Mais Procuradas têm rolagem horizontal. Os breakpoints usam media queries para telas menores que 400px, 600px, 700px, 900px e 950px.

♿ Acessibilidade e SEO
A página tem title e meta description descritivos, tags Open Graph, label for em cada campo do formulário, alt em todas as imagens das séries, aria-label no botão de fechar o modal e no botão Trocar perfil, role dialog e aria-modal true no modal, fechamento do modal com a tecla ESC e foco visível em campos e botões.

🔮 Melhorias Futuras
Filtro por gênero na tela de resultados, ordenação por compatibilidade, nome ou avaliação, busca em múltiplas páginas da TVMaze API, publicação no GitHub Pages ou Netlify e modo escuro com toggle.

👥 Autores
Estefânia Hermel e Adriano Alves.

📄 Licença
Projeto desenvolvido para fins avaliativos no curso Desenvolvimento Mobile - React Native T1. Não possui fins comerciais.

