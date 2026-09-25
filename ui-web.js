// Guia para o nome da classe CSS de cada faixa.

const CLASSE_DA_FAIXA = {
    Alta: "alta",
    Média: "media",
    Baixa: "baixa",
};

// Cria UM card (RF08). export permite que outro arquivo use esta função com import.
export function renderizarCard(resultado) {

// Cria o <article>, a tag semântica pedida no RF01 (um por série).
    const card = document.createElement("article");

    // 🆕 IMAGEM DA SÉRIE
    // Se a série tiver imagem, cria um <img>; se não, cria um bloco cinza.
    if (resultado.imagem) {
        const img = document.createElement("img");
        img.src = resultado.imagem;
        img.alt = `Capa da série ${resultado.titulo}`;
        img.loading = "lazy"; // carrega só quando aparece na tela (performance)
        card.appendChild(img);
    } else {
        const semImagem = document.createElement("div");
        semImagem.classList.add("sem-imagem");
        semImagem.textContent = "Sem imagem";
        card.appendChild(semImagem);
    }


// classList.add coloca a classe "card-serie" no elemento (é o que o CSS vai estilizar).
    card.classList.add("card-serie");

// Título da série. Uso textContent (e não innerHTML) porque ele trata o texto
// como texto puro, sem risco de executar HTML que venha da API.
    const titulo = document.createElement("h3");
    titulo.textContent = resultado.titulo;

// Percentual de compatibilidade
    const percentual = document.createElement("p");
    percentual.textContent = `Compatibilidade: ${resultado.percentual}%`;

// Badge com a classificação. Duas classes: "badge" (estilo geral) e a da faixa (cor).
    const badge = document.createElement("span");
    badge.classList.add("badge", CLASSE_DA_FAIXA[resultado.classificacao]);
    badge.textContent = `${resultado.classificacao} afinidade`;

// Gêneros em comum. join(", ") junta o array em um texto separado por vírgula.
// Se a lista estiver vazia, mostro um traço.
    const emComum = document.createElement("p");
    emComum.textContent = `Gêneros em comum: ${resultado.generosEmComum.join(", ") || "-"}`;

// Gêneros que o usuário ainda não explorou
    const naoExplorados = document.createElement("p");
    naoExplorados.textContent = `Gêneros não explorados: ${resultado.generosNaoExplorados.join(", ") || "-"}`;

// append coloca todos os elementos dentro do card, na ordem em que aparecem
    card.append(titulo, percentual, badge, emComum, naoExplorados);

// Coloca o card pronto dentro da div criado no HTML
    document.querySelector("#resultados").appendChild(card);
    
}
;

// Desenha a lista inteira de resultados
export function renderizarResultados(resultados) {
    const lista = document.querySelector("#lista-cards");
// Limpa a lista antes de desenhar os novos resultados
    lista.innerHTML = "";
// Para cada resultado, chama renderizarCard()git add ui-web.js
    resultados.forEach(renderizarCard);
}