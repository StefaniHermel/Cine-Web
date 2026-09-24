// Pega o formulário que existe no index.html
const formulario = document.querySelector("#form-perfil");

// Quando o usuário enviar o formulário, esta função será executada
formulario.addEventListener("submit", function (evento) {
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

    // Encontra o espaço de mensagem que já existe no HTML
const mensagem = document.querySelector("#mensagem-formulario");

// Mostra na página os dados que foram preenchidos
mensagem.textContent = `Olá, ${usuario.nome}! Seu perfil foi criado.`;
// Mostra o objeto no console para podermos testar
    console.log(usuario);
});
    