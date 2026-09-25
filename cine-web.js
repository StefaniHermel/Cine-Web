import { Serie } from './modelo.js';
import { renderizarResultados } from './ui-web.js';

// Chave usada para salvar o perfil no localStorage
const CHAVE_LOCALSTORAGE = "cineWebPerfil";

// Pega o formulário que existe no html
const formulario = document.querySelector("#form-perfil");

// Pega os elementos da área de "perfil já salvo"
const perfilSalvoDiv = document.querySelector("#perfil-salvo");
const textoPerfilSalvo = document.querySelector("#texto-perfil-salvo");
const botaoTrocarPerfil = document.querySelector("#btn-trocar-perfil");

// Encontra o espaço de mensagem que já existe no HTML
const mensagem = document.querySelector("#mensagem-formulario");

// ===== RF03: salvar o perfil no localStorage =====
function salvarPerfil(usuario) {
    // localStorage só guarda texto, então convertemos o objeto para JSON
    localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(usuario));
}

// ===== RF03: carregar o perfil salvo, se existir =====
function carregarPerfil() {
    const dadosSalvos = localStorage.getItem(CHAVE_LOCALSTORAGE);

    // Se não tem nada salvo, retorna null
    if (!dadosSalvos) {
        return null;
    }

    // Converte o texto salvo de volta para objeto
    return JSON.parse(dadosSalvos);
}

// Mostra a área de "perfil salvo" e esconde o formulário
function mostrarPerfilSalvo(usuario) {
    textoPerfilSalvo.textContent = `Olá, ${usuario.nome}! Seu perfil já está salvo.`;
    perfilSalvoDiv.hidden = false;
    formulario.hidden = true;
}

// Mostra o formulário e esconde a área de "perfil salvo"
function mostrarFormulario() {
    perfilSalvoDiv.hidden = true;
    formulario.hidden = false;
}

// ===== Quando a página carrega, verifica se já existe um perfil salvo =====
const perfilExistente = carregarPerfil();

if (perfilExistente) {
    mostrarPerfilSalvo(perfilExistente);
} else {
    mostrarFormulario();
}

// Quando o usuário enviar o formulário, esta função será executada
formulario.addEventListener("submit", async function (evento) {
// Impede que a página seja recarregada automaticamente
    evento.preventDefault();

// Pega o valor digitado no campo nome
    const nome = document.querySelector("#nome").value;

// Pega o valor digitado no campo idade
    const idade = Number(document.querySelector("#idade").value);

// Pega todos os checkbox que possuem name="genero"
     const checkboxes = document.querySelectorAll('input[name="genero"]:checked');

// Transforma os checkbox selecionados em um array

        const generosFavoritos = Array.from(checkboxes).map(function (checkbox) {
        return checkbox.value;
    });

    // Cria o objeto com os dados do usuário
    const usuario = {
        nome: nome,
        idade: idade,
        generos: generosFavoritos
    };

    // RF03: salva o perfil no localStorage
    salvarPerfil(usuario);

// Mostra na página os dados que foram preenchidos
mensagem.textContent = `Olá, ${usuario.nome}! Seu perfil foi criado.`;

// Mostra o objeto no console para podermos testar
    console.log(usuario);

    // Troca a visualização: esconde o formulário e mostra o perfil salvo
    mostrarPerfilSalvo(usuario);
    await gerarRecomendacoes(usuario);
});

// ===== Botão "Trocar perfil" =====
botaoTrocarPerfil.addEventListener("click", function () {
    // Remove o perfil salvo do localStorage
    localStorage.removeItem(CHAVE_LOCALSTORAGE);

    // Limpa o formulário (nome, idade e checkboxes)
    formulario.reset();

    // Mostra o formulário de novo
    mostrarFormulario();
});

  
async function buscarCatalogo() {

    try {

        // Faz a requisição para a API
        const resposta = await fetch(
    "https://api.tvmaze.com/shows?page=0"
);

        // Verifica se a resposta deu erro
        if (!resposta.ok) {
            throw new Error("Erro ao buscar o catálogo.");
        }

        // Converte a resposta para JSON
        const catalogo = await resposta.json();

        // Mostra o catálogo no console
        console.log(catalogo);

        return catalogo;

    } catch (erro) {

        // Mostra o erro no console
        console.error("Não foi possível carregar o catálogo:", erro);
return
    }
}

// ===== Criar recomendações =====

async function gerarRecomendacoes(usuario) {

// Busca as séries da API
    const catalogo = await buscarCatalogo();

// Transforma cada série da API em um objeto da nossa classe Serie
    const series = catalogo.map(function (dadosSerie) {
    return new Serie({
        titulo: dadosSerie.name,
        generos: dadosSerie.genres,
        duracaoMinutos: dadosSerie.runtime,
        imagem: dadosSerie.image?.medium || null   
    });
});    

     // Mantém somente séries que possuem pelo menos um gênero
    // em comum com os gêneros favoritos do usuário
    const seriesCompatíveis = series.filter(function (serie) {
        return serie.generos.some(function (genero) {
            return usuario.generos.includes(genero);
        });
    });

    // Calcula a compatibilidade de cada série com o usuário
    const resultados = series.map(function (serie) {

        return serie.calcularCompatibilidade(usuario);

    });

    // Ordena da maior compatibilidade para a menor
    resultados.sort(function (a, b) {

        return b.percentual - a.percentual;

    });

    // Mostra somente as 10 melhores recomendações
    const melhoresResultados = resultados.slice(0, 10);
    console.log("TOTAL:", resultados.length);
    console.log("VOU MOSTRAR:", melhoresResultados.length);

     // Mostra os resultados na página
    renderizarResultados(melhoresResultados);
}


