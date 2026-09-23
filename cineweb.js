const formulario = document.querySelector("#form-perfil"); //Primeiro encontramos o formulário(#form-perfil)//
formulario.addEventListener("submit", (evento) => {  ///Quando o usuário enviar o formulário, execute esta função.//
    evento.preventDefault(); //impede o navegador de recarregar a página automaticamente.//

    const nome = document.querySelector("#nome").value;   //OS VALORES  NOME E IDADE //
    const idade = document.querySelector("#idade").value;

    const generosSelecionados = document.querySelectorAll(  //TODOS OS GENEROS SELECIONADOS//
        '{inpuT[ name="genero"]:checked'    //CAPTURE NOME/GENERO QUE O USUARIO MARCA//

    );
                                                     
const generos = Array.from(generosSelecionados).map( ///PAGANDO A LISTA DE GENEROS(NODELIST)//
(checkbox) => checkbox.value                          // DO HTML CONVERTENDO EM ARRAY PURO//

);
const usuario = {
    nome : nome,
    idade : idade,
    generos: generos,
};
console.log(usuario)

});


