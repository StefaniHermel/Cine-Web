# 🎬 CineWeb: Recomendação de Séries em Tempo Real

> Projeto Avaliativo Final - Módulo 01 - Mobile React Native T1 - M1S13

## 📖 Sobre o Projeto

O **CineWeb** é a evolução do antigo *CineMatch JS* (que rodava no terminal). Agora, o motor de recomendação ganhou uma interface web real: qualquer pessoa, em qualquer dispositivo, preenche um formulário de perfil e recebe recomendações de séries reais, buscadas em tempo real na API pública **TVMaze**. O perfil fica salvo no navegador para não precisar preencher tudo de novo.

**Problema que resolve:** Antes, só quem sabia usar o terminal conseguia acessar o recomendador. Agora, qualquer usuário com um navegador pode usar.



## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** `header`, `main`, `section`, `article`, `footer`, meta tags de SEO.
- **CSS3:** Flexbox, box model, responsividade mobile-first, media queries.
- **JavaScript (ES6+):**
  - Módulos ES (`import/export`) em `cine-web.js`, `ui.js` e `modelo.js`.
  - POO com classes `Conteudo` e `Serie` (herança e `this`).
  - Métodos de array: `filter`, `sort`, `slice`, `map`.
  - `fetch` com `async/await` e `try/catch`.
  - `localStorage` para persistir o perfil.
  - `setTimeout` para mensagens de carregamento.
  - Callbacks e closures.
- **Node.js / npm:** `live-server` para servir o projeto localmente.



## 🚀 Como Executar

1. Clone o repositório:
   
   git clone https://github.com/seu-usuario/cineweb.git

   ⚙️ Funcionalidades e Atribuições

   👤 Membro S
RF01: Estrutura HTML semântica com landmarks, <h1>, <title> e meta description.

RF02: Formulário de perfil (nome, idade, gêneros) com addEventListener, preventDefault() e validação.

RF03: Persistência do perfil com localStorage (JSON.stringify/parse), pulando o formulário se já existir.

RF04: Busca na TVMaze API com fetch, async/await, try/catch e tratamento dos estados carregando/erro/vazio.

RF05: Tratamento do catálogo com filter, sort, slice e map (limpa, ordena por rating e limita a 8 séries).

RF06: Classes Conteudo e Serie adaptadas da versão terminal, com herança e this.

RF07: Cálculo de compatibilidade (gêneros em comum / total) * 100 com classificação Alta/Média/Baixa.

RF08: Renderização dinâmica dos cards no DOM com createElement e classList.

RF14: Módulos ES separando cine-web.js, ui.js e modelo.js.

RF15: package.json com script start usando live-server.

Git/GitHub: Branches (main, develop, feature/...) e commits descritivos.

README.md: Documentação do projeto.

Entrega no AVA: Conferência e submissão dos links no prazo.

👤 Membro AA
RF09: Estilização com Flexbox e responsividade (mobile-first, media queries).

RF10: Callback exibirMensagemDeBoasVindas(nome) após o carregamento.

RF11: Closure com contador de recálculos por sessão.

RF12: Mensagem de carregamento com setTimeout.

RF13: SEO básico e acessibilidade (labels, alt, foco visível, meta tags).

README.md: Colaboração na documentação.

Vídeo de Apresentação: Gravação do vídeo de até 7 minutos demonstrando o funcionamento, explicando o objetivo, como executar, organização das tarefas, branches e melhorias futuras.

Testes Finais: Validação completa em desktop e mobile.

📱 Responsividade
Abordagem mobile-first:

Desktop: Cards em linha (Flexbox).

Mobile: Cards empilhados em coluna, formulário adaptado para toque.

Breakpoints: Media queries para telas menores.

🔮 Melhorias Futuras
Filtro por gênero nos resultados.

Ordenação por compatibilidade, nome ou avaliação.

Busca em múltiplas páginas da TVMaze API.

Publicação no GitHub Pages / Netlify.

Modo escuro com toggle.

👥 Autores
[Estefânia Hermel / Membro S] — Lógica, fetch, POO, localStorage, módulos ES, Git, README.

[Nome do Adriano Alves / Membro AA] — Estilização, responsividade, callbacks, closures, SEO, vídeo.

📄 Licença
Projeto desenvolvido para fins avaliativos no curso Desenvolvimento Mobile - React Native T1. Não possui fins comerciais.


