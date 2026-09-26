import { Serie } from './modelo.js';
import { renderizarResultados, renderizarPopulares } from './ui-web.js';
// ===== RF11: Contador por closure =====
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

// ===== RF10: Função de callback =====
function exibirMensagemDeBoasVindas(nome, callback) {
    console.log(`👋 Bem-vindo(a), ${nome}!`);
    if (typeof callback === "function") {
        callback();
    }
}

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


// ============================================================
// RF03: LOCALSTORAGE
// ============================================================

function salvarPerfil(usuario) {
    localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(usuario));
}

function carregarPerfil() {
    const dadosSalvos = localStorage.getItem(CHAVE_LOCALSTORAGE);
    if (!dadosSalvos) return null;
    return JSON.parse(dadosSalvos);
}

function mostrarPerfilSalvo(usuario) {
    textoPerfilSalvo.textContent = `Olá, ${usuario.nome}! Seu perfil já está salvo.`;
    perfilSalvoDiv.hidden = false;
    formulario.hidden = true;
}

function mostrarFormulario() {
    perfilSalvoDiv.hidden = true;
    formulario.hidden = false;
}


// ============================================================
// INICIALIZAÇÃO: verifica se já existe perfil salvo
// ============================================================

const perfilExistente = carregarPerfil();

if (perfilExistente) {
    mostrarPerfilSalvo(perfilExistente);
} else {
    mostrarFormulario();
}


// ============================================================
// RF02: CAPTURA DO FORMULÁRIO
// ============================================================

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value;
    const idade = Number(document.querySelector("#idade").value);

    const checkboxes = document.querySelectorAll('input[name="genero"]:checked');
    const generosFavoritos = Array.from(checkboxes).map(function (checkbox) {
        return checkbox.value;
    });

    const usuario = {
        nome: nome,
        idade: idade,
        generos: generosFavoritos
    };

    salvarPerfil(usuario);
    const total = contarRecalculo();
console.log(`🔁 Recalculou recomendações ${total} vez(es).`);

    mensagem.textContent = `Olá, ${usuario.nome}! Seu perfil foi criado. (Recálculo nº ${total})`;
    console.log(usuario);

    mostrarPerfilSalvo(usuario);
    await gerarRecomendacoes(usuario);
});


// ============================================================
// BOTÃO "Trocar perfil"
// ============================================================

botaoTrocarPerfil.addEventListener("click", function () {
    localStorage.removeItem(CHAVE_LOCALSTORAGE);
    formulario.reset();
    mostrarFormulario();
});


// ============================================================
// RF04: BUSCAR CATÁLOGO NA API TVMAZE
// ============================================================

async function buscarCatalogo() {
    try {
        const resposta = await fetch("https://api.tvmaze.com/shows?page=0");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar o catálogo.");
        }

        const catalogo = await resposta.json();
        return catalogo;

    } catch (erro) {
        console.error("Não foi possível carregar o catálogo:", erro);
        return null;
    }
}


// ============================================================
// RF07: GERAR RECOMENDAÇÕES PERSONALIZADAS
// ============================================================

async function gerarRecomendacoes(usuario) {
    mensagem.innerHTML = `<span class="carregando"><span class="spinner"></span> Buscando as melhores séries pra você...</span>`;

    const catalogo = await buscarCatalogo();

    if (!catalogo) {
        mensagem.textContent = "Não foi possível carregar o catálogo. Tente novamente.";
        return;
    }

    const series = catalogo.map(function (dadosSerie) {
        return new Serie({
            titulo: dadosSerie.name,
            generos: dadosSerie.genres,
            duracaoMinutos: dadosSerie.runtime,
            imagem: dadosSerie.image?.medium || null
        });
    });

    const resultados = series.map(function (serie) {
        return serie.calcularCompatibilidade(usuario);
    });

    resultados.sort(function (a, b) {
        return b.percentual - a.percentual;
    });

    const melhoresResultados = resultados.slice(0, 10);

    renderizarResultados(melhoresResultados);
    mensagem.textContent = "";
}


// ============================================================
// MAIS PROCURADAS (independente do perfil)
// ============================================================

async function carregarMaisProcuradas() {
    const catalogo = await buscarCatalogo();
    if (!catalogo) return;

    const generosEmDestaque = ["Drama", "Comedy", "Action", "Horror"];

    const populares = generosEmDestaque
        .map(function (genero) {

            const seriesDoGenero = catalogo.filter(function (serie) {
                return (
                    serie.genres.includes(genero) &&
                    serie.rating &&
                    serie.rating.average
                );
            });

            seriesDoGenero.sort(function (a, b) {
                return b.rating.average - a.rating.average;
            });

            const melhorDoGenero = seriesDoGenero[0];

            if (!melhorDoGenero) return null;

            return {
                titulo: melhorDoGenero.name,
                generos: melhorDoGenero.genres,
                imagem: melhorDoGenero.image?.medium || null,
                sinopse: melhorDoGenero.summary
                    ? melhorDoGenero.summary.replace(/<[^>]*>/g, "")
                    : "Sinopse não disponível.",
                nota: melhorDoGenero.rating?.average || "Sem avaliação",
                ano: melhorDoGenero.premiered
                    ? melhorDoGenero.premiered.split("-")[0]
                    : "Não informado"
            };
        })
        .filter(Boolean);

    renderizarPopulares(populares);
    exibirMensagemDeBoasVindas("Visitante", function () {
    console.log("✅ Cards de 'Mais procuradas' carregados!");
});
}


// ============================================================
// INICIALIZAÇÃO: carrega os cards "Mais procuradas"
// ============================================================

carregarMaisProcuradas();