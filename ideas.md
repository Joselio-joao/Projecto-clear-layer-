# Direção de design — ClearLayer

## Três abordagens consideradas

### 1. Instrumento de Luz

Uma experiência editorial de laboratório, com superfícies escuras, anotações de precisão e transparências controladas. O produto aparece como um objeto ótico em estudo, não como um acessório promocional.

**Probabilidade:** 0,07

### 2. Atelier Óptico

Uma direção clara, tátil e quase museológica, inspirada em amostras de materiais e bancadas de ótica. A narrativa privilegia a delicadeza do filme e a aproximação humana à armação.

**Probabilidade:** 0,04

### 3. Caderno de Engenharia Modular

Uma interface inspirada em documentação industrial contemporânea: painéis precisos, grelha técnica discreta e transições de estado que revelam produto, ferramental e processo. O resultado mantém calor visual através de tons minerais e azul ótico.

**Probabilidade:** 0,08

## Abordagem escolhida — Instrumento de Luz

### Movimento de design

O site segue uma leitura contemporânea de **instrumentação científica e editorial de produto**, próxima de uma mesa de inspeção ótica. Não imita interfaces CAD; filtra essa linguagem através de espaços de silêncio, composição assimétrica e planos de luz.

### Princípios centrais

1. **O objeto conduz a narrativa.** O filme e as suas camadas são o centro visual; texto e controlos explicam, sem competir.
2. **Precisão visível, nunca ornamental.** Linhas de medida, etiquetas e grelha só aparecem quando carregam informação.
3. **Transparência com contraste.** As superfícies translúcidas são colocadas sobre fundos escuros e quentes para manter leitura e materialidade.
4. **Evolução clara.** A passagem de V1 para V3 mostra um aumento progressivo de controlo, não três produtos desconexos.

### Filosofia de cor

O fundo principal é um quase-preto mineral, para evocar um laboratório de prototipagem e fazer com que o filme translúcido tenha presença. O **azul ótico** é usado como assinatura para elementos funcionais, luz de aresta e estados ativos. Um marfim quente reduz a frieza excessiva e reserva-se para textos, referências e zonas de leitura longa. Um cobre laranja discreto identifica alertas de validação e itens ainda em desenvolvimento.

### Paradigma de layout

O site estrutura-se como uma sequência de **pranchas de investigação** sobrepostas, em vez de uma página de cartões centralizados. O hero ocupa a largura com o objeto à direita e a tese à esquerda. As secções seguintes alternam texto ancorado, painéis de visualização e colunas de dados, usando a grelha técnica como fio condutor.

### Elementos de assinatura

1. **Anel de luz ótica:** arcos e linhas subtis a rodear o produto e a revelar a sua curvatura.
2. **Etiquetas de laboratório:** pequenas marcações monoespaçadas com estados como `PROTÓTIPO`, `A VALIDAR` e `MODELO 01`.
3. **Camadas em suspensão:** lâminas transparentes que se separam ligeiramente para explicar estrutura e processo.

### Filosofia de interação

As interações devem parecer manipulação de uma amostra, não decoração. O visitante altera o estado do produto entre superfície, estrutura e aplicação; escolhe um modelo de produto e lê a respetiva lógica. Botões e tabs confirmam o estado com cor, posição e uma transição curta.

### Animação

As transições principais usam deslocamentos curtos e opacidade; as camadas deslocam-se no eixo vertical com menos de 280 ms e curvas de saída rápidas. Não há partículas, rotação contínua, glow de cursor ou stagger excessivo. O modo de movimento reduzido remove deslocamentos não essenciais e deixa o conteúdo imediatamente estável.

### Sistema tipográfico

Os títulos usam **DM Mono** em maiúsculas com espaçamento generoso para comunicar precisão e documentação. O corpo usa **Manrope**, de leitura clara e humana. Os títulos surgem em tamanhos grandes, mas sem slogans genéricos; as unidades, rótulos e números usam DM Mono em escala menor.

### Essência da marca

**ClearLayer transforma uma película transparente num sistema de proteção ótica concebido para lentes e armações reais.**

Personalidade: **precisa, discreta, confiante**.

### Voz da marca

O texto é técnico e sereno; descreve objetivos, limites e validações em vez de prometer resultados ainda não comprovados.

Exemplos:

> “Proteção transparente, desenhada à escala da lente.”

> “Cada configuração começa numa armação. Cada evolução deixa um rasto técnico.”

### Wordmark e logótipo

O símbolo é um conjunto de três lâminas transparentes alinhadas num quadrado aberto, com uma aresta azul ótica. O wordmark combina `CLEAR` em marfim e `LAYER` em azul, com um corte horizontal subtil nas letras para sugerir estratificação.

### Cor de assinatura

**Azul Ótico — `#36A7FF`**. Uma cor clara e técnica, reservada a foco, estados ativos e reflexos do material.

## Style Decisions

- Todos os títulos de hero e secção usam DM Mono em maiúsculas, com espaçamento generoso; Manrope é reservado para descrições e leitura longa.
- O Azul Ótico `#36A7FF` funciona como sinal técnico, aresta luminosa, numeral, foco ou estado ativo. Não ocupa grandes superfícies planas.
- O símbolo ClearLayer deve ser percecionado como três lâminas transparentes com uma aresta em Azul Ótico; qualquer tendência roxa ou magenta é neutralizada na apresentação.
