// Classe "mãe": representa qualquer conteúdo recomendável (série, filme, etc.)
export class Conteudo {
    constructor(titulo, generos) {
        this.titulo = titulo;
        this.generos = generos;
    }

    // RF07: calcula a compatibilidade entre este conteúdo e o perfil do usuário
    calcularCompatibilidade(perfilUsuario) {
        // Gêneros que o conteúdo tem em comum com o perfil do usuário
        const generosEmComum = this.generos.filter(genero =>
            perfilUsuario.generos.includes(genero)
        );

        // Gêneros do conteúdo que o usuário não marcou no perfil
        const generosNaoExplorados = this.generos.filter(genero =>
            !perfilUsuario.generos.includes(genero)
        );

        // Regra do projeto anterior: (gêneros em comum / total de gêneros do conteúdo) × 100
        const percentual = Math.round(
            (generosEmComum.length / this.generos.length) * 100
        );

        // Classificação por faixa
        let classificacao;
        if (percentual >= 70) {
            classificacao = "Alta";
        } else if (percentual >= 40) {
            classificacao = "Média";
        } else {
            classificacao = "Baixa";
        }

        return {
            titulo: this.titulo,
            percentual: percentual,
            classificacao: classificacao,
            generosEmComum: generosEmComum,
            generosNaoExplorados: generosNaoExplorados
        };
    }
}
// Classe "filha": herda de Conteudo e acrescenta o que é específico de série
export class Serie extends Conteudo {
    constructor(dadosSerie) {
        // super() chama o construtor de Conteudo, passando título e gêneros
        super(dadosSerie.titulo, dadosSerie.generos);

        // Atributos extras, específicos de Serie
        this.tipo = "Série";
        this.duracaoMinutos = dadosSerie.duracaoMinutos;
    }
}
