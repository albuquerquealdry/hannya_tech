# ⚡ Quick Start - Hannya Tech

Guia rápido para criar conteúdo no blog.

## 🚀 Criar Nova Pesquisa

```bash
hugo new content/pesquisa/nome-da-pesquisa/index.md
```

**Exemplo mínimo:**

```yaml
---
title: "Título da Pesquisa"
summary: "Resumo breve"
date: 2025-11-19
draft: false
tags: ["tag1", "tag2"]
status: "em progresso"

checkpoints:
  - title: "Checkpoint 1"
    done: true
  - title: "Checkpoint 2"
    done: false
---

## Visão Geral

Conteúdo da pesquisa aqui...
```

## 📄 Criar Nova Subpesquisa (Whitepaper)

```bash
hugo new content/subpesquisa/nome-do-whitepaper.md
```

**Exemplo mínimo:**

```yaml
---
title: "Título do Whitepaper"
date: 2025-11-19
draft: false
summary: "Resumo breve"
tags: ["tag1", "tag2"]
author: "Seu Nome"
parent_path: "pesquisa/nome-da-pesquisa"
---

## Introdução

Conteúdo do whitepaper aqui...
```

## 🔗 Vincular Subpesquisa à Pesquisa

Adicione no whitepaper:

```yaml
parent_path: "pesquisa/nome-da-pesquisa"
```

## 🧪 Testar Localmente

```bash
hugo server -D --baseURL http://localhost:1313/
```

Acesse: http://localhost:1313/

## 📦 Build para Produção

```bash
hugo --cleanDestinationDir
```

## 📚 Documentação Completa

Veja: `COMO_CRIAR_CONTEUDO.md`

## ✅ Checklist Rápido

- [ ] `draft: false`
- [ ] Título e summary preenchidos
- [ ] Tags adicionadas
- [ ] Conteúdo revisado
- [ ] Links funcionando

---

**Dica**: Use os arquivos em `/archetypes/` como templates!
