# ArqComp — Caça-Palavras Computacional

Jogo de caça-palavras sobre conceitos de **Arquitetura Computacional**, desenvolvido com **HTML, CSS e JavaScript puros** para a Sprint 3.

> **Observação:** o enunciado original da atividade solicita uma *cruzadinha*, com pistas e palavras digitadas nas casas. Esta implementação é um **caça-palavras**, conforme a escolha de desenvolvimento, e não atende integralmente ao formato solicitado no PDF.

## Como jogar

1. Leia as 12 dicas e descubra quais termos devem ser encontrados.
2. Segure o botão esquerdo do mouse sobre a primeira letra de uma palavra.
3. Arraste na horizontal ou vertical, até a última letra, e solte o mouse.
4. Quando acertar, as casas ficam verdes, a resposta é revelada ao lado da dica e o contador aumenta.
5. Use **Conferir** para consultar seu progresso ou **Reiniciar** para começar com as palavras em **novas posições**.

É possível selecionar as palavras em qualquer um dos dois sentidos (da esquerda para a direita ou vice-versa; de cima para baixo ou vice-versa). Palavras já encontradas não somam novos acertos.

## Palavras do desafio e dicas

| Resposta | Dica exibida no jogo |
|---|---|
| CPU | Componente principal responsável por interpretar e executar instruções do computador. |
| ULA | Parte do processador que realiza cálculos matemáticos e comparações lógicas. |
| UC | Coordena a execução das instruções e envia sinais aos outros componentes do processador. |
| RAM | Mantém informações usadas em tarefas atuais, mas perde tudo quando falta energia. |
| ROM | Guarda instruções essenciais à inicialização e normalmente funciona apenas para leitura. |
| EEPROM | Permite apagar e regravar dados eletricamente, sem retirar o componente do circuito. |
| FLASH | Tecnologia de memória presente em pen drives e unidades SSD. |
| CACHE | Guarda cópias de dados frequentemente acessados para acelerar o processamento. |
| DMA | Permite transferir informações entre periféricos e memória com pouca intervenção do processador. |
| DATABUS | Caminho eletrônico por onde circulam informações entre componentes do computador. |
| DUALCORE | Processador que possui dois núcleos de execução. |
| QUADCORE | Processador que possui quatro núcleos de execução. |

## Tecnologias utilizadas

- **HTML:** elementos do site, botões e áreas do tabuleiro.
- **CSS:** cores, disposição das casas e estilos das respostas.
- **JavaScript:** vetores, objetos, `for`, `if/else`, funções e eventos do mouse.

O tabuleiro tem **13 linhas e 13 colunas** e é **sorteado novamente a cada partida**. As 12 palavras são posicionadas aleatoriamente na horizontal ou vertical, sem conflito de letras; os espaços restantes recebem letras aleatórias. O jogo utiliza apenas arrays, objetos, laços `for`, condicionais e `Math.random()`, sem bibliotecas externas.

## Arquivos

```text
Atividade-de-arcomp/
├── index.html    # Estrutura da página
├── style.css     # Visual do jogo
├── script.js     # Tabuleiro e regras
└── README.md     # Documentação
```

## Como executar

Abra o arquivo `index.html` em um navegador no computador. Nenhuma instalação é necessária.

## Situação do projeto

- [x] Definir as 12 palavras e suas posições.
- [x] Criar o layout HTML.
- [x] Aplicar o estilo CSS.
- [x] Programar a seleção com o mouse, a conferência e o reinício.
- [x] Substituir a lista de respostas por dicas e revelar cada termo após o acerto.
- [x] Gerar novas posições e letras para o tabuleiro ao reiniciar.
- [ ] Publicar no GitHub Pages e testar o endereço público.

A atividade original solicita **no mínimo 6 commits em pelo menos 2 dias diferentes**. O histórico do repositório deve ser acompanhado para cumprir essa regra.

## Site publicado

Ainda não publicado. Após ativar o GitHub Pages, o link poderá ser adicionado aqui.