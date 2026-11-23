# ArqComp — Caça-Palavras Computacional

Projeto web desenvolvido com **HTML, CSS e JavaScript puros**, com temas de Arquitetura Computacional.

> **Importante:** o enunciado original solicita uma cruzadinha. O caça-palavras é uma adaptação escolhida no projeto e não atende integralmente a esse formato.

## Como jogar

1. Leia as **16 dicas** — uma para cada termo, sem revelar o nome.
2. Descubra a palavra e procure-a no tabuleiro.
3. Clique e arraste, ou deslize o dedo, da primeira à última letra, em linha reta horizontal ou vertical.
4. Cada acerto revela a resposta na lista e marca suas casas com **cor e estilo de borda próprios**.
5. O botão **Conferir** exibe a pontuação; **Reiniciar** sorteia novamente as posições, as letras e as dicas.

As palavras podem ser selecionadas em ambos os sentidos. Nos pontos onde palavras se cruzam, as casas combinam suas cores. A mesma palavra não soma pontos duas vezes.

## Todos os termos

- CPU
- ULA
- UC
- REGISTRADORES
- RAM
- ROM
- EEPROM
- FLASH
- CACHE
- MEMORIADEMASSA (memória de massa)
- DMA
- ADDRESSBUS (barramento de endereços)
- DATABUS (barramento de dados)
- MICROCONTROLADOR
- DUALCORE
- QUADCORE

Cada termo tem **3 dicas alternativas**, com uma escolhida aleatoriamente a cada partida. A ordem das dicas também é sorteada.

## Tabuleiro

A grade agora tem **16 linhas × 16 colunas**. Embora fosse desejado aumentar a antiga grade de 13 × 13 em apenas uma casa por lado, o termo **MICROCONTROLADOR tem 16 letras**: não caberia inteiro na horizontal ou vertical em 14 × 14. Por isso foi utilizado o tamanho mínimo necessário para acomodar todos os termos sem abreviações.

As palavras são posicionadas aleatoriamente na horizontal ou vertical, com a possibilidade de cruzamentos compatíveis. Ao reiniciar, cada termo recebe uma posição e direção diferentes da partida anterior. As casas vazias recebem letras aleatórias.

## Arquivos

- `index.html` — estrutura da página e os botões.
- `style.css` — layout responsivo e destaque visual das palavras.
- `script.js` — geração do tabuleiro, dicas sorteadas, arraste, conferência e reinício.
- `README.md` — documentação do projeto.

## Como executar

Abra `index.html` no navegador. O jogo não exige instalação, framework ou banco de dados.

## Publicação

O site pode ser publicado gratuitamente pelo GitHub Pages, selecionando a branch `main` e a pasta `/ (root)` em **Settings → Pages**.