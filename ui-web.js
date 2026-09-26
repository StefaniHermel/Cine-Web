// ============================================================
// ui-web.js
// Responsável por TUDO que aparece na tela:
// - Renderizar os cards de recomendação
// - Renderizar os cards populares ("Mais procuradas")
// - Abrir/fechar o modal de detalhes
// ============================================================


// ===== Guia para o nome da classe CSS de cada faixa =====
const CLASSE_DA_FAIXA = {
    Alta: "alta",
    Média: "media",
    Baixa: "baixa",
};


// ============================================================
// CARDS DE RECOMENDAÇÃO PERSONALIZADA
// ============================================================

// Cria UM card de resultado (RF08)
export function renderizarCard(resultado) {
    const card = document.createElement("article");

    // Imagem da série (ou bloco "sem imagem")
    if (resultado.imagem) {
        const img = document.createElement("img");
        img.src = resultado.imagem;
        img.alt = `Capa da série ${resultado.titulo}`;
        img.loading = "lazy";
        card.appendChild(img);
    } else {
        const semImagem = document.createElement("div");
        semImagem.classList.add("sem-imagem");
        semImagem.textContent = "Sem imagem";
        card.appendChild(semImagem);
    }

    card.classList.add("card-serie");

    // Título
    const titulo = document.createElement("h3");
    titulo.textContent = resultado.titulo;

    // Percentual de compatibilidade
    const percentual = document.createElement("p");
    percentual.textContent = `Compatibilidade: ${resultado.percentual}%`;

    // Badge com a classificação
    const badge = document.createElement("span");
    badge.classList.add("badge", CLASSE_DA_FAIXA[resultado.classificacao]);
    badge.textContent = `${resultado.classificacao} afinidade`;

    // Gêneros em comum
    const emComum = document.createElement("p");
    emComum.textContent = `Gêneros em comum: ${
        resultado.generosEmComum.join(", ") || "-"
    }`;

    // Gêneros não explorados
    const naoExplorados = document.createElement("p");
    naoExplorados.textContent = `Gêneros não explorados: ${
        resultado.generosNaoExplorados.join(", ") || "-"
    }`;

    card.append(titulo, percentual, badge, emComum, naoExplorados);

    document.querySelector("#lista-cards").appendChild(card);
}


// Desenha a lista inteira de resultados personalizados
export function renderizarResultados(resultados) {
    const lista = document.querySelector("#lista-cards");
    if (!lista) return;
    lista.innerHTML = "";
    resultados.forEach(renderizarCard);
}


// ============================================================
// CARDS POPULARES ("Mais procuradas")
// ============================================================

// Cria UM card popular
export function renderizarCardPopular(serie) {
    const card = document.createElement("article");
    card.classList.add("card-serie", "card-popular");
    card.style.cursor = "pointer";

    // Imagem (ou bloco "sem imagem")
    if (serie.imagem) {
        const img = document.createElement("img");
        img.src = serie.imagem;
        img.alt = `Capa da série ${serie.titulo}`;
        img.loading = "lazy";
        card.appendChild(img);
    } else {
        const semImagem = document.createElement("div");
        semImagem.classList.add("sem-imagem");
        semImagem.textContent = "Sem imagem";
        card.appendChild(semImagem);
    }

    // Título
    const titulo = document.createElement("h3");
    titulo.textContent = serie.titulo;

    // Gêneros
    const generos = document.createElement("p");
    generos.textContent = serie.generos.join(", ") || "-";

    card.append(titulo, generos);

    // Abre o modal ao clicar
    card.addEventListener("click", function () {
        abrirDetalhes(serie);
    });

    document.querySelector("#lista-populares").appendChild(card);
}


// Desenha a lista inteira de populares
export function renderizarPopulares(series) {
    const lista = document.querySelector("#lista-populares");
    if (!lista) return;
    lista.innerHTML = "";
    series.forEach(renderizarCardPopular);
}


// ============================================================
// MODAL DE DETALHES
// ============================================================

// Abre o modal preenchendo com os dados da série
export function abrirDetalhes(serie) {
    const modal = document.getElementById("modal-serie");
    if (!modal) return;

    document.getElementById("modal-imagem").src = serie.imagem || "";
    document.getElementById("modal-imagem").alt = `Capa da série ${serie.titulo}`;
    document.getElementById("modal-titulo").textContent = serie.titulo;
    document.getElementById("modal-avaliacao").textContent =
        `⭐ Nota: ${serie.nota || "Sem avaliação"} • 📅 Ano: ${
            serie.ano || "Não informado"
        }`;
    document.getElementById("modal-generos").textContent =
        `Gêneros: ${(serie.generos || []).join(", ") || "Não informado"}`;
    document.getElementById("modal-sinopse").textContent =
        serie.sinopse || "Sinopse não disponível.";

    // Aviso de idioma da sinopse (TVMaze retorna em inglês)
    const aviso = document.getElementById("modal-aviso");
    if (aviso) {
        aviso.hidden = false;
    }

    setTimeout(function () {
    modal.hidden = false;
}, 100);

}
// Fecha o modal
export function fecharDetalhes() {
    const modal = document.getElementById("modal-serie");
    if (modal) modal.hidden = true;
}


// ============================================================
// EVENTOS DO MODAL (roda UMA vez ao carregar a página)
// ============================================================

const modalEl = document.getElementById("modal-serie");
const botaoFecharEl = document.getElementById("modal-fechar");

// Clicar no ✕ fecha
if (botaoFecharEl) {
    botaoFecharEl.addEventListener("click", fecharDetalhes);
}

// Clicar fora da caixa (no fundo escuro) fecha
if (modalEl) {
    modalEl.addEventListener("click", function (evento) {
        if (evento.target === modalEl) fecharDetalhes();
    });

    // Apertar a tecla ESC fecha (acessibilidade)
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !modalEl.hidden) {
            fecharDetalhes();
        }
    });
}

