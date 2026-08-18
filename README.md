# ClearLayer — Optical Film

Site técnico do projeto ClearLayer, uma solução de proteção transparente para lentes, apresentado como dossier de produto, processo e industrialização.

## Conteúdo

A interface segue a linguagem do PowerPoint ClearLayer: fundo White Lab, tipografia geométrica, azul técnico discreto e leitura por decisões de engenharia. O site apresenta a arquitetura nominal de 0,10 mm, as versões V1, V2 e V3, os perfis de armação e o roadmap de validação.

## IndexedDB local

O site usa IndexedDB apenas para guardar preferências não sensíveis do dossier: última secção visitada, perfil selecionado, versão V1/V2 e modo técnico/produto. Não são armazenadas credenciais, dados pessoais, ficheiros ou chaves de API. O utilizador pode limpar esse estado através do botão **Limpar estado local** no rodapé.

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
pnpm audit --audit-level=high
```

A auditoria deve ser tratada como uma verificação de segurança do repositório; falhas transitivas devem ser atualizadas ou justificadas antes de uma exposição pública mais ampla.

## Publicação

Este repositório contém duas formas de execução. A versão fullstack usa React com servidor Express no ambiente Manus. A variante GitHub Pages é gerada com `pnpm build:static`, usa os ativos locais em `static-assets/` e não depende do servidor, autenticação ou proxy de armazenamento.

Para publicação manual da variante estática:

```bash
pnpm install --frozen-lockfile
pnpm build:static
```

O workflow em `.github/workflows/pages.yml` executa o build estático, a auditoria e a publicação no GitHub Pages. A base esperada é `/Projecto-clear-layer-/`; se o repositório mudar de nome, atualiza `base` em `vite.config.ts`.

Não existe integração com YouTube neste projeto.
