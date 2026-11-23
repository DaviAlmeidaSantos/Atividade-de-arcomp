// A cada rodada, 12 dos 16 termos são sorteados na grade de 16x16.
// MICROCONTROLADOR tem 16 letras, por isso uma grade de 14x14 não seria suficiente.
const tamanho = 16;
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let tabuleiro = [];
let marcadas = [];
let ordemDicas = [];
let selecionadas = [];
const palavrasPorPartida = 12;
let acertos = 0;
let selecionando = false;
let ponteiroAtivo = null;
let linhaInicial = 0;
let colunaInicial = 0;

// Três pistas possíveis para cada termo. Apenas uma aparece por rodada.
const palavras = [
    { texto: "CPU", dicas: [
        "Componente central que interpreta e executa instruções dos programas.",
        "Executa instruções e participa do controle geral do computador.",
        "Principal componente responsável pelo processamento das instruções."
    ] },
    { texto: "ULA", dicas: [
        "Parte do processador especializada em cálculos e comparações.",
        "Realiza operações matemáticas e decisões lógicas do processador.",
        "Efetua somas, subtrações e operações lógicas dentro do chip."
    ] },
    { texto: "UC", dicas: [
        "Coordena a execução de instruções e envia sinais para outros componentes.",
        "Organiza a sequência de operações realizadas pelo processador.",
        "Interpreta comandos e orienta as etapas de execução das instruções."
    ] },
    { texto: "REGISTRADORES", dicas: [
        "Pequenos espaços internos do processador que guardam valores temporariamente.",
        "Guardam operandos e resultados imediatos durante uma operação.",
        "Armazenamentos internos muito rápidos usados durante a execução de instruções."
    ] },
    { texto: "RAM", dicas: [
        "Guarda temporariamente os programas e dados que estão em uso.",
        "Memória de trabalho que perde informações quando a energia acaba.",
        "Armazena informações temporárias acessadas pelo processador durante as tarefas."
    ] },
    { texto: "ROM", dicas: [
        "Guarda instruções permanentes importantes para iniciar um equipamento.",
        "Memória geralmente destinada à leitura de dados gravados anteriormente.",
        "Conserva informações essenciais mesmo quando o aparelho está desligado."
    ] },
    { texto: "EEPROM", dicas: [
        "Memória que pode ser apagada e regravada eletricamente.",
        "Armazena configurações e permite alterações elétricas sem retirar o chip.",
        "Pode ter seus dados modificados por sinais elétricos e continua gravada sem energia."
    ] },
    { texto: "FLASH", dicas: [
        "Tecnologia de memória utilizada em pen drives e cartões de armazenamento.",
        "Armazenamento regravável encontrado em unidades SSD.",
        "Tipo de memória não volátil usado em dispositivos USB."
    ] },
    { texto: "CACHE", dicas: [
        "Guarda cópias de informações usadas frequentemente para acelerar acessos.",
        "Memória muito rápida que reduz a espera do processador por dados.",
        "Armazena temporariamente dados recorrentes perto do processamento."
    ] },
    { texto: "MEMORIADEMASSA", dicas: [
        "Armazenamento de grande capacidade para arquivos e programas por longo prazo.",
        "Permite guardar grandes volumes de documentos, vídeos e aplicativos.",
        "Categoria de dispositivos voltados a armazenar muitos dados permanentemente."
    ] },
    { texto: "DMA", dicas: [
        "Transfere informações entre periféricos e memória com pouca intervenção do processador.",
        "Recurso que movimenta blocos de dados sem usar continuamente o processador.",
        "Ajuda dispositivos a trocar dados diretamente com a memória principal."
    ] },
    { texto: "ADDRESSBUS", dicas: [
        "Conjunto de linhas que indica qual posição de memória será acessada.",
        "Transporta a localização de memória solicitada pelo processador.",
        "Sinais que identificam o destino de um acesso à memória."
    ] },
    { texto: "DATABUS", dicas: [
        "Conjunto de linhas que transporta valores entre componentes do computador.",
        "Transporta informações binárias entre processador, memória e periféricos.",
        "Caminho elétrico pelo qual os dados circulam entre dispositivos."
    ] },
    { texto: "MICROCONTROLADOR", dicas: [
        "Chip que reúne processamento, memória e periféricos para controlar dispositivos.",
        "Pequeno computador integrado muito usado em equipamentos eletrônicos.",
        "Componente que controla sensores e atuadores em sistemas embarcados."
    ] },
    { texto: "DUALCORE", dicas: [
        "Processador equipado com dois núcleos de execução.",
        "Chip de processamento que conta com duas unidades de execução principais.",
        "Arquitetura de processador formada por um par de núcleos."
    ] },
    { texto: "QUADCORE", dicas: [
        "Processador equipado com quatro núcleos de execução.",
        "Chip de processamento com quatro unidades principais de execução.",
        "Arquitetura de processador que reúne duas duplas de núcleos."
    ] }
];

// Uma cor e um fundo próprios para cada palavra.
const cores = [
    ["#C33750", "#FFE0E6"], ["#AE5A19", "#FDE6D1"],
    ["#867000", "#F8EDAD"], ["#367D37", "#DBF3D9"],
    ["#167F68", "#CFF4E9"], ["#137B9A", "#D3EFF9"],
    ["#315EB7", "#DCE9FF"], ["#6158AD", "#E6E2FF"],
    ["#A04288", "#F9DCF0"], ["#A64040", "#F7DDDA"],
    ["#656F24", "#F1F3CC"], ["#297F94", "#C9EDF1"],
    ["#9B4F73", "#F9DFED"], ["#6D51A4", "#EBE0FA"],
    ["#B65A36", "#FFE3D5"], ["#387D82", "#D6F0EF"]
];
const tiposBorda = ["solid", "dashed", "dotted", "double"];

function numeroAleatorio(limite) {
    return Math.floor(Math.random() * limite);
}

function misturar(vetor) {
    for (let i = vetor.length - 1; i > 0; i--) {
        let sorteado = numeroAleatorio(i + 1);
        let aux = vetor[i];
        vetor[i] = vetor[sorteado];
        vetor[sorteado] = aux;
    }
}

function limparGrade() {
    tabuleiro = [];
    marcadas = [];
    for (let l = 0; l < tamanho; l++) {
        tabuleiro[l] = [];
        marcadas[l] = [];
        for (let c = 0; c < tamanho; c++) {
            tabuleiro[l][c] = "";
            marcadas[l][c] = [];
        }
    }
}

// As maiores palavras entram primeiro. Cada uma pode ser horizontal ou vertical.
function tentarGerar() {
    limparGrade();
    let ordem = [];
    for (let i = 0; i < selecionadas.length; i++) ordem.push(selecionadas[i]);
    // Maior comprimento primeiro; embaralha o desempate.
    misturar(ordem);
    ordem.sort(function(a, b) {
        return palavras[b].texto.length - palavras[a].texto.length;
    });

    for (let p = 0; p < ordem.length; p++) {
        let palavra = palavras[ordem[p]];
        let opcoes = [];

        for (let direcao = 0; direcao < 2; direcao++) {
            let vertical = direcao === 1;
            let maxL = vertical ? tamanho - palavra.texto.length + 1 : tamanho;
            let maxC = vertical ? tamanho : tamanho - palavra.texto.length + 1;

            for (let l = 0; l < maxL; l++) {
                for (let c = 0; c < maxC; c++) {
                    let cabe = true;
                    for (let i = 0; i < palavra.texto.length; i++) {
                        let linha = l + (vertical ? i : 0);
                        let coluna = c + (vertical ? 0 : i);
                        let atual = tabuleiro[linha][coluna];
                        if (atual !== "" && atual !== palavra.texto[i]) {
                            cabe = false;
                            break;
                        }
                    }
                    if (cabe) opcoes.push({ linha: l, coluna: c, vertical: vertical });
                }
            }
        }

        if (opcoes.length === 0) return false;
        let escolha = opcoes[numeroAleatorio(opcoes.length)];
        palavra.linha = escolha.linha;
        palavra.coluna = escolha.coluna;
        palavra.vertical = escolha.vertical;

        for (let i = 0; i < palavra.texto.length; i++) {
            let l = palavra.linha + (palavra.vertical ? i : 0);
            let c = palavra.coluna + (palavra.vertical ? 0 : i);
            tabuleiro[l][c] = palavra.texto[i];
        }
    }
    return true;
}

function gerarTabuleiro() {
    let anteriores = [];
    for (let i = 0; i < selecionadas.length; i++) {
        let palavra = palavras[selecionadas[i]];
        anteriores.push(palavra.linha + "-" + palavra.coluna + "-" + palavra.vertical);
    }

    let gerou = false;
    // Limita as tentativas, evitando um laço infinito se a lista for alterada.
    for (let tentativa = 0; tentativa < 100 && !gerou; tentativa++) {
        if (!tentarGerar()) continue;
        gerou = true;
        for (let i = 0; i < selecionadas.length; i++) {
            let palavra = palavras[selecionadas[i]];
            let atual = palavra.linha + "-" + palavra.coluna + "-" + palavra.vertical;
            if (anteriores[i] === atual) gerou = false;
        }
    }
    if (!gerou) {
        throw new Error("Não foi possível criar uma grade diferente. Reinicie a página.");
    }

    for (let l = 0; l < tamanho; l++) {
        for (let c = 0; c < tamanho; c++) {
            if (tabuleiro[l][c] === "") {
                tabuleiro[l][c] = alfabeto[numeroAleatorio(alfabeto.length)];
            }
        }
    }
}

function sortearDicas() {
    ordemDicas = [];
    for (let i = 0; i < selecionadas.length; i++) {
        let indice = selecionadas[i];
        palavras[indice].dica = palavras[indice].dicas[numeroAleatorio(palavras[indice].dicas.length)];
        ordemDicas.push(indice);
    }
    misturar(ordemDicas);
}

function montarTabuleiro() {
    let html = "";
    for (let l = 0; l < tamanho; l++) {
        for (let c = 0; c < tamanho; c++) {
            html += `<div id="casa-${l}-${c}" class="celula"
                data-linha="${l}" data-coluna="${c}"
                onpointerdown="iniciarSelecao(${l}, ${c}, event)">${tabuleiro[l][c]}</div>`;
        }
    }
    document.getElementById("tabuleiro").innerHTML = html;
}

function montarLista() {
    let html = "";
    for (let i = 0; i < ordemDicas.length; i++) {
        let indice = ordemDicas[i];
        html += `<div class="palavra" id="palavra-${indice}">
            <span class="numero-dica">${i + 1}.</span>
            <span class="marcador-dica" id="marcador-${indice}"></span>
            <span class="texto-dica">${palavras[indice].dica}</span>
            <span class="resposta-dica" id="resposta-${indice}"></span>
        </div>`;
    }
    document.getElementById("lista-palavras").innerHTML = html;
}

function iniciarSelecao(linha, coluna, evento) {
    if (evento.button !== 0) return;
    selecionando = true;
    ponteiroAtivo = evento.pointerId;
    linhaInicial = linha;
    colunaInicial = coluna;
    mostrarSelecao(linha, coluna);
    evento.preventDefault();
}

function casaSobPonteiro(evento) {
    let elemento = document.elementFromPoint(evento.clientX, evento.clientY);
    if (elemento && elemento.classList.contains("celula")) return elemento;
    return null;
}

function mostrarSelecao(linha, coluna) {
    limparSelecao();
    if (linhaInicial === linha) {
        let inicio = Math.min(colunaInicial, coluna);
        let fim = Math.max(colunaInicial, coluna);
        for (let c = inicio; c <= fim; c++) {
            document.getElementById(`casa-${linha}-${c}`).classList.add("selecionada");
        }
    } else if (colunaInicial === coluna) {
        let inicio = Math.min(linhaInicial, linha);
        let fim = Math.max(linhaInicial, linha);
        for (let l = inicio; l <= fim; l++) {
            document.getElementById(`casa-${l}-${coluna}`).classList.add("selecionada");
        }
    }
}

function limparSelecao() {
    let casas = document.getElementsByClassName("celula");
    for (let i = 0; i < casas.length; i++) casas[i].classList.remove("selecionada");
}

// Confere as posições corretas, não apenas as letras (evita acertos por coincidência).
function selecaoCorresponde(palavra, linhaFinal, colunaFinal) {
    let ultimaLinha = palavra.linha + (palavra.vertical ? palavra.texto.length - 1 : 0);
    let ultimaColuna = palavra.coluna + (palavra.vertical ? 0 : palavra.texto.length - 1);
    let normal = linhaInicial === palavra.linha && colunaInicial === palavra.coluna &&
        linhaFinal === ultimaLinha && colunaFinal === ultimaColuna;
    let invertida = linhaInicial === ultimaLinha && colunaInicial === ultimaColuna &&
        linhaFinal === palavra.linha && colunaFinal === palavra.coluna;
    return normal || invertida;
}

function finalizarSelecao(linha, coluna) {
    selecionando = false;
    ponteiroAtivo = null;
    limparSelecao();

    if (linhaInicial !== linha && colunaInicial !== coluna) {
        document.getElementById("mensagem").innerText = "Selecione em linha reta: horizontal ou vertical.";
        return;
    }

    for (let j = 0; j < selecionadas.length; j++) {
        let i = selecionadas[j];
        let palavra = palavras[i];
        if (!selecaoCorresponde(palavra, linha, coluna)) continue;
        if (palavra.encontrada) {
            document.getElementById("mensagem").innerText = "Você já encontrou " + palavra.texto + "!";
            return;
        }

        palavra.encontrada = true;
        acertos++;
        pintarPalavra(i);
        let card = document.getElementById("palavra-" + i);
        card.classList.add("encontrada");
        card.style.borderLeftColor = cores[i][0];
        card.style.borderLeftStyle = tiposBorda[i % tiposBorda.length];
        document.getElementById("marcador-" + i).style.border = "3px " + tiposBorda[i % tiposBorda.length] + " " + cores[i][0];
        let resposta = document.getElementById("resposta-" + i);
        resposta.innerText = palavra.texto;
        resposta.style.backgroundColor = cores[i][1];
        resposta.style.color = cores[i][0];
        document.getElementById("mensagem").innerText = acertos === selecionadas.length
            ? "Parabéns! Você encontrou todos os termos desta partida!"
            : "Correto! Você encontrou " + palavra.texto + ".";
        return;
    }
    document.getElementById("mensagem").innerText = "Não é uma das palavras escondidas. Tente outra seleção!";
}

// Cada termo encontrado recebe sua cor. Cruzamentos dividem a cor da casa.
function pintarPalavra(indice) {
    let palavra = palavras[indice];
    for (let i = 0; i < palavra.texto.length; i++) {
        let l = palavra.linha + (palavra.vertical ? i : 0);
        let c = palavra.coluna + (palavra.vertical ? 0 : i);
        marcadas[l][c].push(indice);
        let ids = marcadas[l][c];
        let casa = document.getElementById(`casa-${l}-${c}`);
        casa.classList.add("encontrada");
        casa.style.border = "2px " + tiposBorda[indice % tiposBorda.length] + " " + cores[indice][0];

        if (ids.length === 1) {
            casa.style.background = cores[indice][1];
        } else {
            let partes = [];
            for (let j = 0; j < ids.length; j++) {
                let inicio = j * 100 / ids.length;
                let fim = (j + 1) * 100 / ids.length;
                partes.push(cores[ids[j]][1] + " " + inicio + "% " + fim + "%");
            }
            casa.style.background = "linear-gradient(135deg, " + partes.join(", ") + ")";
        }
    }
}

function reiniciar() {
    selecionando = false;
    ponteiroAtivo = null;
    acertos = 0;

    // Mistura os 16 termos e escolhe apenas 12 para esta rodada.
    let indices = [];
    for (let i = 0; i < palavras.length; i++) {
        palavras[i].encontrada = false;
        indices.push(i);
    }
    misturar(indices);
    selecionadas = indices.slice(0, palavrasPorPartida);

    gerarTabuleiro();
    sortearDicas();
    montarTabuleiro();
    montarLista();
    document.getElementById("mensagem").innerText = "Nova partida sorteada! Encontre os termos pelas dicas.";
}

document.onpointermove = function(evento) {
    if (!selecionando || evento.pointerId !== ponteiroAtivo) return;
    let casa = casaSobPonteiro(evento);
    if (casa) mostrarSelecao(Number(casa.dataset.linha), Number(casa.dataset.coluna));
};

document.onpointerup = function(evento) {
    if (!selecionando || evento.pointerId !== ponteiroAtivo) return;
    let casa = casaSobPonteiro(evento);
    if (casa) finalizarSelecao(Number(casa.dataset.linha), Number(casa.dataset.coluna));
    else {
        selecionando = false;
        ponteiroAtivo = null;
        limparSelecao();
    }
};

document.onpointercancel = function() {
    selecionando = false;
    ponteiroAtivo = null;
    limparSelecao();
};

let jogoIniciado = false;

// O tabuleiro só é criado quando o aluno termina a leitura inicial.
function iniciarJogo() {
    // Prepara a primeira partida antes de esconder a parte educativa.
    if (!jogoIniciado) {
        reiniciar();
        jogoIniciado = true;
    }

    // Ao iniciar, esconde as explicações e mostra somente o tabuleiro.
    document.getElementById("estudo").hidden = true;
    document.getElementById("jogo").hidden = false;
    document.body.classList.remove("etapa-estudo");
    document.body.classList.add("etapa-jogo");

    document.getElementById("jogo").scrollIntoView({ behavior: "smooth", block: "start" });
}

// Permite consultar os conceitos e depois voltar, sem perder os acertos.
function reverComponentes() {
    selecionando = false;
    ponteiroAtivo = null;
    limparSelecao();
    document.getElementById("jogo").hidden = true;
    document.getElementById("estudo").hidden = false;
    document.body.classList.remove("etapa-jogo");
    document.body.classList.add("etapa-estudo");
    document.getElementById("estudo").scrollIntoView({ behavior: "smooth", block: "start" });
}
