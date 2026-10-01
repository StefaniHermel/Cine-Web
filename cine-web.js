import { Serie } from './modelo.js';

import {
    renderizarResultados,
    renderizarPopulares,
    exibirContador,
    exibirMensagemDeBoasVindas as mostrarMensagemNaTela
} from './ui-web.js';

// ============================================================
// CONSTANTES E ELEMENTOS DO HTML
// ============================================================

// Chave usada para salvar o perfil no localStorage
const CHAVE_LOCALSTORAGE = "cineWebPerfil";

// Pega o formulário que existe no HTML
const formulario = document.querySelector("#form-perfil");

// Pega os elementos da área de "perfil já salvo"
const perfilSalvoDiv = document.querySelector("#perfil-salvo");
const textoPerfilSalvo = document.querySelector("#texto-perfil-salvo");
const botaoTrocarPerfil = document.querySelector("#btn-trocar-perfil");

// Encontra o espaço de mensagem que existe no HTML
const mensagem = document.querySelector("#mensagem-formulario");

// ============================================================
// RF11: CONTADOR POR CLOSURE
// ============================================================

// Cada vez que essa função é chamada, ela incrementa um contador
// interno. O contador só pode ser acessado por dentro dessa função.

function criarContador() {
    let contador = 0;

    return function () {
        contador++;
        return contador;
    };
}

const contarRecalculo = criarContador();

// ============================================================
// RF12: PEQUENO ATRASO PROPOSITAL USANDO SETTIMEOUT
// ============================================================

// Transforma setTimeout numa Promise, para poder usar com await

function esperar(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

// ============================================================
// RF10: FUNÇÃO DE CALLBACK
// ============================================================

function exibirMensagemDeBoasVindas(nome, callback) {
    console.log(`👋 Bem-vindo(a), ${nome}!`);

    mostrarMensagemNaTela(nome);

    if (typeof callback === "function") {
        callback();
    }
}

// ============================================================
// RF03: LOCALSTORAGE
// ============================================================

function salvarPerfil(usuario) {
    localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(usuario));
}

function carregarPerfil() {
    const dadosSalvos = localStorage.getItem(CHAVE_LOCALSTORAGE);

    if (!dadosSalvos) {
        return null;
    }

    return JSON.parse(dadosSalvos);
}

function mostrarPerfilSalvo(usuario) {
    textoPerfilSalvo.textContent =
        `Olá, ${usuario.nome}! Seu perfil já está salvo.`;

    perfilSalvoDiv.hidden = false;
    formulario.hidden = true;
}

function mostrarFormulario() {
    perfilSalvoDiv.hidden = true;
    formulario.hidden = false;
}

// ============================================================
// RF04: BUSCAR CATÁLOGO NA API TVMAZE
// ============================================================

async function buscarCatalogo() {
    try {
        const resposta = await fetch(
            "https://api.tvmaze.com/shows?page=0"
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar o catálogo.");
        }

        const catalogo = await resposta.json();

        // Verifica se a resposta é realmente um array
        if (!Array.isArray(catalogo)) {
            throw new Error("A API devolveu um formato inesperado.");
        }

        // Verifica se o catálogo está vazio
        if (catalogo.length === 0) {
            throw new Error("O catálogo está vazio.");
        }

        return catalogo;

    } catch (erro) {
        console.error("Não foi possível carregar o catálogo:", erro);
        throw erro;
    }
}

// ============================================================
// RF07: GERAR RECOMENDAÇÕES PERSONALIZADAS
// ============================================================

async function gerarRecomendacoes(usuario) {

    mensagem.innerHTML = `
        <span class="carregando">
            <span class="spinner"></span>
            Buscando as melhores séries pra você...
        </span>
    `;

    try {
        const catalogo = await buscarCatalogo();

        // Pequeno atraso proposital para demonstrar o carregamento
        await esperar(600);

        if (catalogo.length === 0) {
            mensagem.textContent =
                "O catálogo está vazio no momento.";
            return;
        }

        // Transforma os dados da API em objetos da classe Serie
        const series = catalogo.map(function (dadosSerie) {
            return new Serie({
                titulo: dadosSerie.name,
                generos: dadosSerie.genres,
                duracaoMinutos: dadosSerie.runtime,

                imagem:
                    dadosSerie.image?.original ||
                    dadosSerie.image?.medium ||
                    null,

                nota:
                    dadosSerie.rating?.average ||
                    "Sem avaliação",

                ano:
                    dadosSerie.premiered
                        ? dadosSerie.premiered.split("-")[0]
                        : "Não informado",

                sinopse:
                    dadosSerie.summary
                        ? dadosSerie.summary.replace(/<[^>]*>/g, "")
                        : "Sinopse não disponível."
            });
        });

        // Calcula a compatibilidade de cada série
        const resultados = series.map(function (serie) {
            return serie.calcularCompatibilidade(usuario);
        });

        // Ordena do maior percentual para o menor
        resultados.sort(function (a, b) {
            return b.percentual - a.percentual;
        });

        // Pega somente as 10 melhores recomendações
        const melhoresResultados = resultados.slice(0, 10);

        // Mostra os resultados na tela
        renderizarResultados(melhoresResultados);

        // RF11: closure conta e a tela mostra o número
        exibirContador(contarRecalculo());
        
        mensagem.textContent = "";

        // RF10: CALLBACK
        exibirMensagemDeBoasVindas(
            usuario.nome,
            function () {
                console.log(
                    "✅ Recomendações personalizadas exibidas!"
                );
            }
        );

    } catch (erro) {
        console.error(
            "Erro ao gerar recomendações:",
            erro
        );

        mensagem.textContent =
            "Não foi possível carregar o catálogo. Tente novamente.";
    }
}

// ============================================================
// RF02: CAPTURA E VALIDAÇÃO DO FORMULÁRIO
// ============================================================

formulario.addEventListener("submit", async function (evento) {

    // Impede o recarregamento da página
    evento.preventDefault();

    // Captura os dados do formulário
    const nome = document.querySelector("#nome").value;

    const idade = Number(
        document.querySelector("#idade").value
    );

    const checkboxes = document.querySelectorAll(
        'input[name="genero"]:checked'
    );

    // Pega os gêneros selecionados
    const generosFavoritos = Array.from(checkboxes).map(
        function (checkbox) {
            return checkbox.value;
        }
    );

    // Validação dos dados
    if (nome.trim() === "") {
        mensagem.textContent =
            "Por favor, informe seu nome.";
        return;
    }

    if (idade <= 0) {
        mensagem.textContent =
            "Por favor, informe uma idade válida.";
        return;
    }

    if (generosFavoritos.length === 0) {
        mensagem.textContent =
            "Selecione pelo menos um gênero favorito.";
        return;
    }

    // Cria o objeto usuário
    const usuario = {
        nome: nome,
        idade: idade,
        generos: generosFavoritos
    };

    // Salva o perfil
    salvarPerfil(usuario);

   
    console.log(usuario);

    // Mostra o perfil salvo
    mostrarPerfilSalvo(usuario);

    // Gera as recomendações
    await gerarRecomendacoes(usuario);
});

// ============================================================
// BOTÃO "TROCAR PERFIL"
// ============================================================

botaoTrocarPerfil.addEventListener("click", function () {

    // Remove o perfil salvo
    localStorage.removeItem(CHAVE_LOCALSTORAGE);

    // Limpa o formulário
    formulario.reset();

    // Mostra novamente o formulário
    mostrarFormulario();
});

// ============================================================
// MAIS PROCURADAS
// ============================================================

// Mostra séries populares independentemente do perfil

async function carregarMaisProcuradas() {

    try {
        const catalogo = await buscarCatalogo();

        if (catalogo.length === 0) {
            return;
        }

        // Gêneros que serão usados na seção
        const generosEmDestaque = [
            "Drama",
            "Comedy",
            "Action",
            "Horror"
        ];

        // Procura a série mais bem avaliada de cada gênero
        const populares = generosEmDestaque

            .map(function (genero) {

                const seriesDoGenero = catalogo.filter(
                    function (serie) {

                        return (
                            serie.genres.includes(genero) &&
                            serie.rating &&
                            serie.rating.average
                        );
                    }
                );

                // Ordena pela maior nota
                seriesDoGenero.sort(function (a, b) {
                    return b.rating.average - a.rating.average;
                });

                // Pega a melhor série daquele gênero
                const melhorDoGenero =
                    seriesDoGenero[0];

                if (!melhorDoGenero) {
                    return null;
                }

                // Dados usados para criar o card
                return {
                    titulo: melhorDoGenero.name,

                    generos: melhorDoGenero.genres,

                    imagem:
                        melhorDoGenero.image?.medium ||
                        null,

                    sinopse:
                        melhorDoGenero.summary
                            ? melhorDoGenero.summary.replace(
                                /<[^>]*>/g,
                                ""
                            )
                            : "Sinopse não disponível.",

                    nota:
                        melhorDoGenero.rating?.average ||
                        "Sem avaliação",

                    ano:
                        melhorDoGenero.premiered
                            ? melhorDoGenero.premiered.split("-")[0]
                            : "Não informado"
                };
            })

            // Remove valores null
            .filter(Boolean);

        // Mostra os cards na tela
        renderizarPopulares(populares);

    } catch (erro) {

        console.error(
            "Não foi possível carregar as mais procuradas:",
            erro
        );
    }
}

// ============================================================
// INICIALIZAÇÃO DA PÁGINA
// ============================================================

// Verifica se já existe um perfil salvo
const perfilExistente = carregarPerfil();

if (perfilExistente) {

    // Mostra o perfil salvo
    mostrarPerfilSalvo(perfilExistente);

    // Gera novamente as recomendações
    gerarRecomendacoes(perfilExistente);

} else {

    // Se não existir perfil, mostra o formulário
    mostrarFormulario();
}

// Carrega os cards "Mais procuradas"
carregarMaisProcuradas();