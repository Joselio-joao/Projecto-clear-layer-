# ClearLayer — Optical Film

Site técnico do projeto ClearLayer, uma solução de proteção transparente para lentes, apresentado como dossier de produto, processo e industrialização.

## Conteúdo

A interface segue a linguagem do PowerPoint ClearLayer: fundo White Lab, tipografia geométrica, azul técnico discreto e leitura por decisões de engenharia. O site apresenta a arquitetura nominal de 0,10 mm, as versões V1, V2 e V3, os perfis de armação e o roadmap de validação.

## IndexedDB local

O site usa IndexedDB apenas para guardar o estado não sensível do dossier, nomeadamente a última secção visitada. Não são armazenadas credenciais, dados pessoais, ficheiros ou chaves de API. O utilizador pode limpar esse estado através do botão **Limpar estado local** no rodapé.

A funcionalidade degrada de forma segura quando IndexedDB não está disponível: o site continua a funcionar sem persistência local.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Verificação

```bash
pnpm test
pnpm check
pnpm build
```

## Publicação

Este repositório contém o código-fonte sincronizado com o GitHub. O projeto atual usa uma camada React com servidor Express integrada no ambiente Manus; por isso, GitHub funciona como repositório de código e colaboração. Uma publicação GitHub Pages exigiria uma variante exclusivamente estática, sem as rotas de servidor e autenticação.

Não existe integração com YouTube neste projeto.
