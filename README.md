# 🎬 CineWeb: Recomendação de Séries em Tempo Real

**Projeto Avaliativo Final — Módulo 01 — Desenvolvimento Mobile**

## 📖 Sobre o Projeto

O **CineWeb** é a evolução do antigo CineMatch JS, que rodava no terminal. Nesta versão, o sistema ganhou uma interface web para recomendar séries de acordo com os gêneros favoritos da pessoa usuária.

As séries são buscadas em tempo real na API pública **TVMaze**, e o perfil fica salvo no navegador para facilitar novos acessos.

O projeto resolve a limitação da versão anterior, permitindo que o recomendador seja utilizado diretamente pelo navegador.

## 🛠️ Tecnologias Utilizadas

* HTML5 semântico e SEO;
* CSS3 com Flexbox e responsividade;
* JavaScript ES6+;
* Módulos ES (`import/export`);
* Programação Orientada a Objetos;
* Classes `Conteudo` e `Serie`, com herança e `this`;
* Métodos de array: `map`, `filter`, `sort` e `slice`;
* API TVMaze com `fetch`, `async/await` e `try/catch`;
* `localStorage` e JSON;
* Callback e closure;
* `setTimeout` e Promises;
* DOM e eventos;
* Node.js, npm e `live-server`;
* Git e GitHub.

## 🚀 Como Executar

Clone o repositório:


git clone https://github.com/StefaniHermel/Cine-Web.git


Entre na pasta: 
cd Cine-Web

Instale as dependências:
npm install

Inicie o servidor:
npm start


Também é possível executar pelo **Live Server do VS Code**, abrindo o arquivo `cine-web.html`.

## 📁 Estrutura de Arquivos

* `cine-web.html` — estrutura da página, formulário, resultados e modal;
* `cine-web.css` — estilos, Flexbox e responsividade;
* `cine-web.js` — fluxo principal, formulário, API, recomendações e `localStorage`;
* `ui-web.js` — renderização dos cards, mensagens e modal;
* `modelo.js` — classes `Conteudo` e `Serie` e cálculo de compatibilidade;
* `package.json` — configuração do projeto e dependência do `live-server`;
* `README.md` — documentação do projeto.

## ⚙️ Funcionalidades e Atribuições

### S (Kanban/Trello)

Responsável pelos requisitos relacionados à lógica e estrutura principal:

* **RF01** — HTML semântico, `h1`, `title`, `meta description` e Open Graph;
* **RF02** — formulário, `addEventListener`, `preventDefault` e validação;
* **RF03** — persistência do perfil com `localStorage`, `JSON.stringify` e `JSON.parse`;
* **RF04** — busca da TVMaze API com `fetch`, `async/await`, `try/catch` e tratamento de carregamento, erro e catálogo vazio;
* **RF05** — processamento do catálogo com `map`, `filter`, `sort` e `slice`;
* **RF06** — classes `Conteudo` e `Serie`, herança e `this`;
* **RF07** — cálculo e classificação da compatibilidade;
* **RF08** — criação dinâmica dos cards no DOM;
* **RF14** — organização dos módulos ES com `import/export`;
* **RF15** — configuração do npm e `live-server`;
* organização do Git/GitHub e documentação do projeto.

### AA

Responsável pelos requisitos relacionados à interface e apresentação:

* **RF09** — estilização com CSS, Flexbox e responsividade;
* **RF10** — implementação do callback;
* **RF11** — implementação da closure para contador de recálculos;
* **RF12** — mensagem de carregamento e uso de `setTimeout`;
* **RF13** — acessibilidade e SEO;
* modal de detalhes das séries;
* colaboração na documentação;
* colaboração na gravação do vídeo;
* testes em desktop e mobile.

## 🔄 CommonJS × ESM

Na versão original do CineMatch JS foi utilizado **CommonJS**, com `require()` e `module.exports`.

No CineWeb foi adotado **ES Modules (ESM)**, utilizando `import` e `export`.

O arquivo principal é carregado no HTML como módulo:

html
<script type="module" src="cine-web.js"></script>


A separação dos módulos permite organizar as responsabilidades entre `cine-web.js`, `ui-web.js` e `modelo.js`.

## 📱 Responsividade

O projeto utiliza **Flexbox** e media queries para adaptar a interface a diferentes tamanhos de tela.

Os cards são reorganizados conforme o espaço disponível, permitindo a utilização do sistema em computadores, tablets e celulares.

## ♿ Acessibilidade e SEO

Foram utilizados:

* HTML semântico;
* `lang="pt-BR"`;
* `title` e `meta description`;
* tags Open Graph;
* `label` associado aos campos do formulário;
* textos alternativos nas imagens;
* `aria-label`;
* foco visível;
* navegação por teclado em elementos interativos;
* `role="dialog"` e `aria-modal` no modal;
* fechamento do modal pela tecla `ESC`.

## 📋 Organização e Versionamento

O projeto foi organizado utilizando **Git e GitHub**, com branches e commits descritivos.

O desenvolvimento também foi acompanhado por um **Kanban**, utilizando as etapas:

* Backlog;
* A Fazer;
* Em Andamento;
* Concluído.

## 🔮 Melhorias Futuras

* filtro por gênero;
* ordenação por compatibilidade, nome ou avaliação;
* busca em múltiplas páginas da TVMaze API;
* publicação do projeto na web;
* modo escuro com `toggle`.

## 👥 Autores

**S — Estefânia Hermel**
**AA — Adriano Alves**

## 📄 Licença

Projeto desenvolvido para fins avaliativos no curso de Desenvolvimento Mobile. Não possui fins comerciais.
