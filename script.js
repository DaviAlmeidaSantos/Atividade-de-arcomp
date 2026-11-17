// 13 linhas e 13 colunas. As palavras mudam de posição em cada partida.
const tamanho = 13;
let tabuleiro = [];

// As dicas continuam iguais, mas as posições são definidas pelo jogo.
const palavras = [
    { texto: "DUALCORE", dica: "Processador que possui dois núcleos de execução.", encontrada: false },
    { texto: "QUADCORE", dica: "Processador que possui quatro núcleos de execução.", encontrada: false },
    { texto: "DATABUS", dica: "Caminho eletrônico por onde circulam informações entre componentes do computador.", encontrada: false },
    { texto: "EEPROM", dica: "Permite apagar e regravar dados eletricamente, sem retirar o componente do circuito.", encontrada: false },
    { texto: "FLASH", dica: "Tecnologia de memória presente em pen drives e unidades SSD.", encontrada: false },
    { texto: "CACHE", dica: "Guarda cópias de dados frequentemente acessados para acelerar o processamento.", encontrada: false },
    { texto: "CPU", dica: "Componente principal responsável por interpretar e executar instruções do computador.", encontrada: false },
    { texto: "ULA", dica: "Parte do processador que realiza cálculos matemáticos e comparações lógicas.", encontrada: false },
    { texto: "RAM", dica: "Mantém informações usadas em tarefas atuais, mas perde tudo quando falta energia.", encontrada: false },
    { texto: "ROM", dica: "Guarda instruções essenciais à inicialização e normalmente funciona apenas para leitura.", encontrada: false },
    { texto: "DMA", dica: "Permite transferir informações entre periféricos e memória com pouca intervenção do processador.", encontrada: false },
    { texto: "UC", dica: "Coordena a execução das instruções e envia sinais aos outros componentes do processador.", encontrada: false }
];

let selecionando = false;
let linhaInicial = 0;
let colunaInicial = 0;
let acertos = 0;

// Escolhe um número inteiro aleatório de 0 até limite - 1.
function numeroAleatorio(limite) {
    return Math.floor(Math.random() * limite);
}

// Sorteia posições para todas as palavras, sem sobrepor letras diferentes.
function gerarTabuleiro() {
    let disposicaoAnterior = [];
    for (let i = 0; i < palavras.length; i++) {
        disposicaoAnterior.push(palavras[i].linha + "-" + palavras[i].coluna);
    }

    let completo = false;
    let mudou = false;

    // Se não couber alguma palavra, recomeça a montagem.
    while (!completo || !mudou) {
        completo = true;
        tabuleiro = [];
        for (let linha = 0; linha < tamanho; linha++) {
            tabuleiro.push([]);
            for (let coluna = 0; coluna < tamanho; coluna++) {
                tabuleiro[linha].push("");
            }
        }

        // Mistura a ordem das palavras para o tabuleiro variar mais.
        let ordem = [];
        for (let i = 0; i < palavras.length; i++) {
            ordem.push(i);
        }
        for (let i = ordem.length - 1; i > 0; i--) {
            let sorteado = numeroAleatorio(i + 1);
            let auxiliar = ordem[i];
            ordem[i] = ordem[sorteado];
            ordem[sorteado] = auxiliar;
        }

        for (let p = 0; p < ordem.length; p++) {
            let palavra = palavras[ordem[p]];
            let colocada = false;

            for (let tentativa = 0; tentativa < 250 && !colocada; tentativa++) {
                let horizontal = numeroAleatorio(2) == 0;
                let linha = numeroAleatorio(horizontal ? tamanho : tamanho - palavra.texto.length + 1);
                let coluna = numeroAleatorio(horizontal ? tamanho - palavra.texto.length + 1 : tamanho);
                let cabe = true;

                for (let i = 0; i < palavra.texto.length; i++) {
                    let l = horizontal ? linha : linha + i;
                    let c = horizontal ? coluna + i : coluna;
                    if (tabuleiro[l][c] != "" && tabuleiro[l][c] != palavra.texto[i]) {
                        cabe = false;
                        break;
                    }
                }

                if (cabe) {
                    for (let i = 0; i < palavra.texto.length; i++) {
                        let l = horizontal ? linha : linha + i;
                        let c = horizontal ? coluna + i : coluna;
                        tabuleiro[l][c] = palavra.texto[i];
                    }
                    palavra.linha = linha;
                    palavra.coluna = coluna;
                    palavra.direcao = horizontal ? "horizontal" : "vertical";
                    colocada = true;
                }
            }
            if (!colocada) {
                completo = false;
                break;
            }
        }

        // Cada palavra deve começar em um lugar diferente do jogo anterior.
        mudou = true;
        for (let i = 0; i < palavras.length; i++) {
            let novaPosicao = palavras[i].linha + "-" + palavras[i].coluna;
            if (novaPosicao == disposicaoAnterior[i]) {
                mudou = false;
            }
        }
    }

    // Preenche espaços vazios com letras aleatórias.
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let linha = 0; linha < tamanho; linha++) {
        for (let coluna = 0; coluna < tamanho; coluna++) {
            if (tabuleiro[linha][coluna] == "") {
                tabuleiro[linha][coluna] = alfabeto[numeroAleatorio(alfabeto.length)];
            }
        }
    }
}

// Mostra todas as letras na tela.
function montarTabuleiro() {
    let html = "";

    for (let linha = 0; linha < tabuleiro.length; linha++) {
        for (let coluna = 0; coluna < tabuleiro[linha].length; coluna++) {
            let letra = tabuleiro[linha][coluna];
            html += `<div class="celula" id="casa-${linha}-${coluna}"
                onmousedown="iniciarSelecao(${linha}, ${coluna}); return false"
                onmouseover="arrastarSelecao(${linha}, ${coluna})"
                onmouseup="finalizarSelecao(${linha}, ${coluna})">${letra}</div>`;
        }
    }

    document.getElementById("tabuleiro").innerHTML = html;
}

// Mostra as dicas no lugar das respostas.
function montarLista() {
    let html = "";

    for (let i = 0; i < palavras.length; i++) {
        html += `<div class="palavra" id="palavra-${i}">
            <span class="numero-dica">${i + 1}.</span>
            <span class="texto-dica">${palavras[i].dica}</span>
            <span class="resposta-dica" id="resposta-${i}"></span>
        </div>`;
    }

    document.getElementById("lista-palavras").innerHTML = html;
}

// Começa a seleção na casa pressionada pelo mouse.
function iniciarSelecao(linha, coluna) {
    selecionando = true;
    linhaInicial = linha;
    colunaInicial = coluna;
    mostrarSelecao(linha, coluna);
}

// Atualiza a seleção ao passar o mouse pelas casas.
function arrastarSelecao(linha, coluna) {
    if (selecionando) {
        mostrarSelecao(linha, coluna);
    }
}

// Destaca as casas entre o início e o ponto atual.
function mostrarSelecao(linha, coluna) {
    limparSelecao();

    if (linhaInicial == linha) {
        let inicio = Math.min(colunaInicial, coluna);
        let fim = Math.max(colunaInicial, coluna);

        for (let i = inicio; i <= fim; i++) {
            document.getElementById(`casa-${linha}-${i}`).classList.add("selecionada");
        }
    } else if (colunaInicial == coluna) {
        let inicio = Math.min(linhaInicial, linha);
        let fim = Math.max(linhaInicial, linha);

        for (let i = inicio; i <= fim; i++) {
            document.getElementById(`casa-${i}-${coluna}`).classList.add("selecionada");
        }
    }
}

// Remove apenas a cor da seleção temporária.
function limparSelecao() {
    let casas = document.getElementsByClassName("celula");

    for (let i = 0; i < casas.length; i++) {
        casas[i].classList.remove("selecionada");
    }
}

// Verifica quais letras foram realmente selecionadas pelo jogador.
function finalizarSelecao(linha, coluna) {
    if (!selecionando) {
        return;
    }

    selecionando = false;
    limparSelecao();

    if (linhaInicial != linha && colunaInicial != coluna) {
        document.getElementById("mensagem").innerText = "Selecione em linha reta: horizontal ou vertical.";
        return;
    }

    let textoSelecionado = "";
    let quantidade = Math.max(Math.abs(linha - linhaInicial), Math.abs(coluna - colunaInicial));
    let passoLinha = linha > linhaInicial ? 1 : (linha < linhaInicial ? -1 : 0);
    let passoColuna = coluna > colunaInicial ? 1 : (coluna < colunaInicial ? -1 : 0);

    for (let i = 0; i <= quantidade; i++) {
        let l = linhaInicial + i * passoLinha;
        let c = colunaInicial + i * passoColuna;
        textoSelecionado += tabuleiro[l][c];
    }

    for (let i = 0; i < palavras.length; i++) {
        let palavra = palavras[i];
        let invertida = palavra.texto.split("").reverse().join("");

        if (textoSelecionado == palavra.texto || textoSelecionado == invertida) {
            if (palavra.encontrada) {
                document.getElementById("mensagem").innerText = "Você já encontrou " + palavra.texto + "!";
                return;
            }

            palavra.encontrada = true;
            acertos++;
            pintarPalavra(linha, coluna);
            document.getElementById(`palavra-${i}`).classList.add("encontrada");
            document.getElementById(`resposta-${i}`).innerText = palavra.texto;
            atualizarProgresso();
            document.getElementById("mensagem").innerText = "Boa! Você encontrou " + palavra.texto + ".";

            if (acertos == palavras.length) {
                document.getElementById("mensagem").innerText = "Parabéns! Você encontrou todas as 12 palavras!";
            }
            return;
        }
    }

    document.getElementById("mensagem").innerText = "Essa seleção não corresponde a uma palavra. Tente novamente!";
}

// Mantém em verde as letras que foram selecionadas corretamente.
function pintarPalavra(linhaFinal, colunaFinal) {
    let quantidade = Math.max(Math.abs(linhaFinal - linhaInicial), Math.abs(colunaFinal - colunaInicial));
    let passoLinha = linhaFinal > linhaInicial ? 1 : (linhaFinal < linhaInicial ? -1 : 0);
    let passoColuna = colunaFinal > colunaInicial ? 1 : (colunaFinal < colunaInicial ? -1 : 0);

    for (let i = 0; i <= quantidade; i++) {
        let l = linhaInicial + i * passoLinha;
        let c = colunaInicial + i * passoColuna;
        document.getElementById(`casa-${l}-${c}`).classList.add("encontrada");
    }
}

// Atualiza os números e a barra de progresso.
function atualizarProgresso() {
    document.getElementById("acertos").innerText = acertos;
    document.getElementById("barra-progresso").style.width = (acertos / palavras.length * 100) + "%";
    document.getElementById("texto-progresso").innerText = acertos == palavras.length
        ? "Desafio concluído!"
        : acertos + " de " + palavras.length + " palavras encontradas.";
}

function conferir() {
    if (acertos == palavras.length) {
        document.getElementById("mensagem").innerText = "Parabéns! Você completou o caça-palavras!";
    } else {
        document.getElementById("mensagem").innerText = "Você encontrou " + acertos
            + " de " + palavras.length + " palavras. Continue procurando!";
    }
}

function reiniciar() {
    selecionando = false;
    acertos = 0;

    for (let i = 0; i < palavras.length; i++) {
        palavras[i].encontrada = false;
    }

    gerarTabuleiro();
    montarTabuleiro();
    montarLista();
    atualizarProgresso();
    document.getElementById("mensagem").innerText = "Novo tabuleiro gerado! Boa sorte!";
}

// Caso o jogador solte o mouse fora da grade, cancela a seleção.
document.onmouseup = function () {
    if (selecionando) {
        selecionando = false;
        limparSelecao();
    }
};

gerarTabuleiro();
montarTabuleiro();
montarLista();
atualizarProgresso();