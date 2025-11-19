# 📄 Template Whitepaper para Subpesquisas

Este guia explica como criar whitepapers técnicos usando o template estruturado do Hannya Tech.

## 🎯 Estrutura do Whitepaper

O template inclui as seguintes seções:

### 1. **Hero com Imagem de Capa** (Opcional)
- Imagem de destaque no topo
- Título sobreposto com efeito gradiente

### 2. **Metadata**
- Tags
- Autor
- Data de publicação

### 3. **Resumo Executivo** (Opcional)
- Visão geral de alto nível
- Principais descobertas
- Ideal para leitores executivos

### 4. **Introdução** (Obrigatório)
- Contexto do problema
- Motivação da pesquisa
- Objetivos
- Estrutura do documento

### 5. **Metodologia** (Opcional)
- Abordagem utilizada
- Ferramentas e tecnologias
- Ambiente de teste
- Procedimentos

### 6. **Testes e Resultados** (Opcional)
- Testes realizados
- Resultados observados
- Análise de dados
- Métricas coletadas

### 7. **Conclusão** (Opcional)
- Principais descobertas
- Implicações práticas
- Recomendações
- Trabalhos futuros

### 8. **Referências** (Opcional)
- Bibliografia
- Links externos
- Recursos adicionais

## 🚀 Como Criar um Whitepaper

### Passo 1: Criar o arquivo

```bash
hugo new content/subpesquisa/nome-do-whitepaper.md
```

### Passo 2: Configurar o Front Matter

```yaml
---
title: "Título do Whitepaper"
date: 2025-11-19
draft: false
summary: "Resumo breve do whitepaper"
tags: ["segurança", "privacidade", "tor"]
author: "Seu Nome"
cover_image: "/images/whitepaper-cover.jpg"  # Opcional
parent_path: "pesquisa/anonimato"  # Link para pesquisa principal

# Seções opcionais
executive_summary: |
  Resumo executivo com visão geral das principais descobertas...

methodology: |
  ## Abordagem
  Descrição da metodologia...

tests: |
  ## Testes Realizados
  Detalhes dos testes...

conclusion: |
  Conclusões e recomendações finais...

references:
  - title: "Tor Project Documentation"
    url: "https://www.torproject.org/docs/"
  - title: "OWASP Testing Guide"
    url: "https://owasp.org/www-project-web-security-testing-guide/"
---
```

### Passo 3: Escrever o Conteúdo

O conteúdo principal vai após o front matter e será exibido na seção **Introdução**.

```markdown
## Introdução

Contextualize o problema e apresente os objetivos...

### Contexto

Descreva o background...

### Objetivos

1. Objetivo 1
2. Objetivo 2
3. Objetivo 3

## Desenvolvimento

Desenvolva o tema principal...

### Análise

Análise detalhada...
```

## 🎨 Recursos Visuais

### Imagem de Capa

Para adicionar uma imagem de capa:

1. Coloque a imagem em `/static/images/`
2. Configure no front matter:

```yaml
cover_image: "/images/minha-capa.jpg"
```

A imagem será exibida em tela cheia (400px de altura) com o título sobreposto.

### Imagens no Conteúdo

```markdown
![Descrição da imagem](/images/diagrama.png)
```

As imagens são automaticamente estilizadas com:
- Bordas arredondadas
- Sombra suave
- Largura responsiva

### Código

````markdown
```python
def exemplo():
    print("Código com syntax highlighting")
```
````

### Tabelas

```markdown
| Métrica | Valor | Observação |
|---------|-------|------------|
| Latência | 50ms | Aceitável |
| Throughput | 100Mbps | Ótimo |
```

### Blockquotes

```markdown
> **Importante**: Informação destacada para o leitor.
```

## 📋 Exemplo Completo

Veja o arquivo `archetypes/subpesquisa.md` para um exemplo completo com todas as seções.

## 🎯 Boas Práticas

1. **Seja Objetivo**: Whitepapers devem ser diretos e focados
2. **Use Dados**: Inclua métricas, gráficos e resultados concretos
3. **Estruture Bem**: Use headings (##, ###) para organizar o conteúdo
4. **Cite Fontes**: Sempre inclua referências
5. **Imagens Relevantes**: Use imagens que agregam valor
6. **Teste o Formato**: Visualize em diferentes tamanhos de tela

## 🔗 Vinculando à Pesquisa Principal

Use o campo `parent_path` para vincular o whitepaper a uma pesquisa:

```yaml
parent_path: "pesquisa/anonimato"
```

Isso criará um botão no final do whitepaper para voltar à pesquisa principal.

## 📱 Responsividade

O template é totalmente responsivo:

- **Desktop**: Layout amplo com seções bem espaçadas
- **Tablet**: Ajuste automático do tamanho das fontes
- **Mobile**: Coluna única com padding reduzido

## 🎨 Personalização

Você pode personalizar o estilo editando a seção `<style>` no arquivo:
`layouts/subpesquisa/single.html`

## 💡 Dicas

- Use o **Resumo Executivo** para whitepapers longos
- A seção **Metodologia** é essencial para pesquisas técnicas
- **Testes e Resultados** deve incluir dados mensuráveis
- A **Conclusão** deve responder aos objetivos da introdução
- Mantenha as **Referências** atualizadas e acessíveis
