const formulario = document.querySelector("#form-perfil");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const idade = Number(document.querySelector("#idade").value);

    const generosSelecionados = document.querySelectorAll(
        'input[name="genero"]:checked'
    );

    const generos = Array.from(generosSelecionados).map(
        (checkbox) => checkbox.value
    );

    const usuario = {
        nome: nome,
        idade: idade,
        generos: generos
    };

    // Salva o usuário
    localStorage.setItem("usuario", JSON.stringify(usuario));

    console.log("Usuário:", usuario);

    // Busca o catálogo
    try {
        const resposta = await fetch(
            "https://api.tvmaze.com/shows?page=1"
        );

        const catalogo = await resposta.json();

        console.log("Catálogo bruto:", catalogo);


        const catalogoTratado = catalogo
        .filter((serie) => serie.rating.average !== null)
         .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 20)
    .map((serie) => ({
        id: serie.id,
        titulo: serie.name,
        imagem: serie.image?.medium || "",
        nota: serie.rating.average || 0,
        generos: serie.genres || [],
        resumo: serie.summary || "Resumo não disponível."
    }));

console.log("Catálogo tratado:", catalogoTratado);
         
        

    } catch (erro) {
        console.error("Erro ao buscar o catálogo:", erro);
    }
});