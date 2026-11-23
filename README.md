# ArqComp — Caça-Palavras Computacional

Projeto web desenvolvido com **HTML, CSS e JavaScript puros**, com temas de Arquitetura Computacional.

> **Importante:** o enunciado original solicita uma cruzadinha. O caça-palavras é uma adaptação escolhida no projeto e não atende integralmente a esse formato.

## Conheça os componentes

Antes de abrir o tabuleiro, o site mostra uma etapa de estudo com os **16 termos da atividade** organizados por assunto: processamento e controle, tipos de memória e comunicação de dados.

Cada termo possui uma explicação curta. Depois da leitura, o botão **Começar caça-palavras** abre o jogo e apresenta as dicas. Durante a partida, **Rever componentes** permite consultar o material e retornar ao jogo sem perder os acertos. **Reiniciar** começa uma nova rodada.

## Como jogar

1. Leia a seção **Conheça os componentes**, depois clique em **Começar caça-palavras**.
2. Leia as **12 dicas sorteadas** entre os 16 termos, sem revelar o nome.
3. Descubra a palavra e procure-a no tabuleiro.
4. Clique e arraste, ou deslize o dedo, da primeira à última letra, em linha reta horizontal ou vertical.
5. Cada acerto revela a resposta na lista e marca suas casas com **cor e estilo de borda próprios**.
6. O botão **Reiniciar** sorteia 12 novas palavras, posições e dicas. Não há mais botão Conferir nem contador de acertos.

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

Cada termo possui **3 dicas alternativas**. Cada partida escolhe **12 dos 16 termos, sem repetição**, sorteia uma dica por termo e embaralha sua ordem. A seção de estudo continua mostrando todos os 16 conceitos.

## Tabuleiro

A grade agora tem **16 linhas × 16 colunas**. Embora fosse desejado aumentar a antiga grade de 13 × 13 em apenas uma casa por lado, o termo **MICROCONTROLADOR tem 16 letras**: não caberia inteiro na horizontal ou vertical em 14 × 14. Por isso foi utilizado o tamanho mínimo necessário para acomodar todos os termos sem abreviações.

As 12 palavras sorteadas são posicionadas aleatoriamente na horizontal ou vertical, com possibilidade de cruzamentos compatíveis. Ao reiniciar, mudam as palavras escolhidas, suas posições e dicas. As casas restantes recebem letras aleatórias.

## Arquivos

- `index.html` — estrutura da página e os botões.
- `style.css` — layout responsivo e destaque visual das palavras.
- `script.js` — seleção aleatória de 12 palavras, geração do tabuleiro, dicas, arraste e reinício.
- `README.md` — documentação do projeto.

## Como executar

Abra `index.html` no navegador. O jogo não exige instalação, framework ou banco de dados.

## Tema

O site utiliza **tema escuro por padrão**, tanto na etapa de estudo quanto no caça-palavras.

## Publicação

O site pode ser publicado gratuitamente pelo GitHub Pages, selecionando a branch `main` e a pasta `/ (root)` em **Settings → Pages**.