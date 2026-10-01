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

**Pré-requisitos**: ter **Node.js** e **npm** instalados.

Clone o repositório:


git clone https://github.com/StefaniHermel/Cine-Web.git


Entre na pasta:
cd Cine-Web

Instale as dependências:
npm install

Inicie o servidor:
npm start

O navegador abre automaticamente em `http://127.0.0.1:8080`.

> ⚠️ O projeto usa **módulos ES** (`import/export`), então **não funciona abrindo o `index.html` direto pelo `file://`** — precisa ser servido por um servidor HTTP. O `live-server` já resolve isso.

Também é possível executar pelo **Live Server do VS Code**, abrindo o arquivo `index.html`.

## 📁 Estrutura de Arquivos

* `index.html` — estrutura da página, formulário, resultados e modal;
* `cine-web.css` — estilos, Flexbox e responsividade;
* `cine-web.js` — fluxo principal, formulário, API, recomendações e `localStorage`;
* `ui-web.js` — renderização dos cards, mensagens e modal;
* `modelo.js` — classes `Conteudo` e `Serie` e cálculo de compatibilidade;
* `package.json` — configuração do projeto e dependência do `live-server`;
* `README.md` — documentação do projeto.

**Nota sobre nomenclatura**: o arquivo HTML principal se chama `index.html` (padrão sugerido). Os demais arquivos seguem nomes próprios do projeto (`cine-web.css`, `cine-web.js`, `ui-web.js`), mantendo a mesma responsabilidade descrita no Projeto.

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


// CommonJS (usado no projeto anterior)
const { Serie } = require('./modelo.js');
module.exports = { Conteudo };


No CineWeb foi adotado **ES Modules (ESM)**, utilizando `import` e `export`.


// ESM (usado aqui)
import { Serie } from './modelo.js';
export class Conteudo { /* ... */ }


O arquivo principal é carregado no HTML como módulo:

<script type="module" src="cine-web.js"></script>


A separação dos módulos permite organizar as responsabilidades entre `cine-web.js`, `ui-web.js` e `modelo.js`.

### Principais diferenças

| Aspecto | CommonJS | ESM |
|---|---|---|
| Sintaxe | `require` / `module.exports` | `import` / `export` |
| Ambiente típico | Node.js tradicional | Navegador moderno + Node.js |
| Carregamento | Síncrono | Assíncrono |
| Hoisting | Não | Sim (imports são içados) |
| `this` no topo | `module.exports` | `undefined` |

## 📱 Responsividade

O projeto utiliza **Flexbox** e media queries para adaptar a interface a diferentes tamanhos de tela.

Os cards são reorganizados conforme o espaço disponível, permitindo a utilização do sistema em computadores, tablets e celulares.

## ♿ Acessibilidade e SEO

Foram utilizados:

* HTML semântico (`header`, `main`, `section`, `article`, `footer`);
* `lang="pt-BR"`;
* `title` e `meta description`;
* tags Open Graph;
* `label` associado aos campos do formulário;
* textos alternativos nas imagens;
* `aria-label`;
* `aria-live="polite"` na mensagem do formulário;
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

* filtro por gênero sem refazer o formulário;
* ordenação por compatibilidade, nome ou avaliação;
* busca em múltiplas páginas da TVMaze API;
* publicação do projeto (GitHub Pages / Netlify / Vercel);
* modo escuro com `toggle`.

## 🎥 Vídeo de Demonstração

📺 [Assista ao vídeo de apresentação](COLAR_LINK_AQUI)

## 📋 Kanban

🗂️ [Quadro do projeto no Trello](COLAR_LINK_AQUI)

## 👥 Autores

**S — Estefânia Hermel**
**AA — Adriano Alves**

## 📄 Licença

Projeto desenvolvido **originalmente** para fins avaliativos no curso de Desenvolvimento Mobile (Módulo 01). Todo o código foi escrito pela dupla, com apoio apenas de documentação oficial, material de aula e IA como ferramenta de estudo. Não possui fins comerciais.