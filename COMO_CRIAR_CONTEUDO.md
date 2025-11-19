# 📚 Guia Completo: Como Criar Conteúdo no Hannya Tech

Este guia ensina como criar **Pesquisas** e **Subpesquisas (Whitepapers)** no seu blog Hugo.

---

## 📋 Índice

1. [Estrutura do Projeto](#estrutura-do-projeto)
2. [Criando uma Pesquisa](#criando-uma-pesquisa)
3. [Criando uma Subpesquisa (Whitepaper)](#criando-uma-subpesquisa-whitepaper)
4. [Vinculando Subpesquisas às Pesquisas](#vinculando-subpesquisas-às-pesquisas)
5. [Exemplos Práticos](#exemplos-práticos)
6. [Dicas e Boas Práticas](#dicas-e-boas-práticas)

---

## 🗂️ Estrutura do Projeto

```
hannya_tech/
├── content/
│   ├── pesquisa/           # Pesquisas principais
│   │   ├── anonimato/
│   │   │   └── index.md
│   │   └── malware/
│   │       └── index.md
│   └── subpesquisa/        # Whitepapers/Subpesquisas
│       ├── fingerprinting-de-navegador.md
│       └── engenharia-reversa-assistida.md
├── archetypes/
│   ├── pesquisa.md         # Template para pesquisas
│   └── subpesquisa.md      # Template para subpesquisas
└── layouts/
    ├── pesquisa/           # Templates de visualização
    └── subpesquisa/
```

---

## 🔬 Criando uma Pesquisa

### Passo 1: Criar o Diretório e Arquivo

```bash
# Navegue até a pasta do projeto
cd /home/aldry.albuquerque/hannya_tech

# Crie uma nova pesquisa (substitua 'nome-da-pesquisa' pelo nome desejado)
hugo new content/pesquisa/nome-da-pesquisa/index.md
```

**Exemplo prático:**
```bash
hugo new content/pesquisa/blockchain-security/index.md
```

### Passo 2: Estrutura do Front Matter

Abra o arquivo criado e configure o front matter:

```yaml
---
title: "Segurança em Blockchain"
summary: "Análise de vulnerabilidades e técnicas de proteção em redes blockchain"
date: 2025-11-19
draft: false
tags: ["blockchain", "segurança", "criptografia"]
status: "em progresso"  # Opções: "rascunho", "em progresso", "concluído"

# Checkpoints da pesquisa
checkpoints:
  - title: "Revisão bibliográfica"
    done: true
    notes: "Concluída análise de 15 papers sobre o tema"
  
  - title: "Configuração do ambiente de testes"
    done: true
    notes: "Ambiente com Ganache e Truffle configurado"
  
  - title: "Análise de smart contracts vulneráveis"
    done: false
    notes: "Em andamento - analisando reentrancy attacks"
  
  - title: "Desenvolvimento de ferramentas de auditoria"
    done: false
  
  - title: "Documentação e whitepaper final"
    done: false

# Tecnologias utilizadas (opcional)
tecnologias:
  - name: "Solidity"
    logo: "/images/solidity.png"
  - name: "Ethereum"
    logo: "/images/ethereum.png"
  - name: "Hardhat"
---

## Visão Geral

Escreva aqui a introdução e visão geral da pesquisa.

Esta pesquisa explora vulnerabilidades comuns em smart contracts e desenvolve 
ferramentas automatizadas para auditoria de segurança.

## Objetivos

- Identificar padrões de vulnerabilidades em smart contracts
- Desenvolver ferramentas de análise estática
- Criar guia de boas práticas de segurança
- Publicar whitepapers sobre descobertas

## Metodologia

Descreva a metodologia utilizada na pesquisa...

## Resultados Preliminares

Apresente resultados parciais ou finais...
```

### Passo 3: Campos Importantes

| Campo | Descrição | Obrigatório |
|-------|-----------|-------------|
| `title` | Título da pesquisa | ✅ Sim |
| `summary` | Resumo breve (aparece nos cards) | ✅ Sim |
| `date` | Data de criação | ✅ Sim |
| `draft` | `false` para publicar, `true` para rascunho | ✅ Sim |
| `tags` | Tags para categorização | ⚠️ Recomendado |
| `status` | Status atual da pesquisa | ⚠️ Recomendado |
| `checkpoints` | Lista de checkpoints com progresso | ⚠️ Recomendado |
| `tecnologias` | Tecnologias utilizadas | ❌ Opcional |

---

## 📄 Criando uma Subpesquisa (Whitepaper)

### Passo 1: Criar o Arquivo

```bash
# Crie uma nova subpesquisa
hugo new content/subpesquisa/nome-do-whitepaper.md
```

**Exemplo prático:**
```bash
hugo new content/subpesquisa/reentrancy-attacks-ethereum.md
```

### Passo 2: Estrutura Completa do Front Matter

```yaml
---
title: "Reentrancy Attacks em Ethereum: Análise e Mitigação"
date: 2025-11-19
draft: false
summary: "Análise técnica de ataques de reentrância em smart contracts Ethereum e técnicas de mitigação"
tags: ["ethereum", "smart-contracts", "segurança", "vulnerabilidades"]
author: "Hannya Tech Research"
cover_image: "/images/ethereum-security.jpg"  # Opcional
parent_path: "pesquisa/blockchain-security"   # Vincula à pesquisa principal

# ============================================
# SEÇÕES DO WHITEPAPER (todas opcionais)
# ============================================

executive_summary: |
  Este whitepaper apresenta uma análise abrangente de ataques de reentrância 
  em smart contracts Ethereum.
  
  **Principais Descobertas**:
  - 23% dos contratos analisados são vulneráveis
  - Padrão Checks-Effects-Interactions reduz risco em 99%
  - ReentrancyGuard da OpenZeppelin é efetivo mas tem custo de gas
  
  **Recomendações**:
  - Implementar padrão CEI em todos os contratos
  - Utilizar mutex locks para funções críticas
  - Realizar auditorias automatizadas

methodology: |
  ## Abordagem de Pesquisa
  
  ### Ferramentas Utilizadas
  - **Slither**: Análise estática de smart contracts
  - **Mythril**: Detecção de vulnerabilidades
  - **Hardhat**: Framework de desenvolvimento e testes
  - **Ganache**: Blockchain local para testes
  
  ### Ambiente de Teste
  - **Rede**: Ethereum Goerli Testnet
  - **Contratos analisados**: 150 contratos de DeFi
  - **Período**: 3 meses de análise
  
  ### Procedimentos
  1. Coleta de contratos vulneráveis conhecidos
  2. Análise estática com ferramentas automatizadas
  3. Testes de exploração em ambiente controlado
  4. Desenvolvimento de contramedidas
  5. Validação de eficácia

tests: |
  ## Testes Realizados
  
  ### Teste 1: Exploração de Contrato Vulnerável
  
  **Objetivo**: Demonstrar ataque de reentrância em contrato real
  
  **Procedimento**:
  1. Deploy de contrato vulnerável em testnet
  2. Criação de contrato atacante
  3. Execução do ataque
  4. Análise dos logs e transações
  
  **Resultados**:
  - Sucesso na drenagem de 100 ETH (testnet)
  - Tempo de execução: 2 blocos
  - Gas utilizado: 450,000
  
  ### Teste 2: Validação de Contramedidas
  
  **Objetivo**: Testar eficácia do padrão CEI
  
  **Resultados**:
  - 100% de proteção contra reentrância
  - Overhead de gas: 5%
  - Compatibilidade: Total

conclusion: |
  ## Principais Descobertas
  
  1. **Reentrância é Prevalente**: 23% dos contratos analisados são vulneráveis
  2. **Padrão CEI é Efetivo**: Proteção completa quando implementado corretamente
  3. **Custo-Benefício**: Overhead mínimo de gas para proteção máxima
  
  ## Recomendações
  
  ### Para Desenvolvedores
  1. Sempre implementar padrão Checks-Effects-Interactions
  2. Utilizar ReentrancyGuard da OpenZeppelin
  3. Realizar auditorias antes do deploy
  
  ### Para Auditores
  1. Priorizar análise de funções com transferências
  2. Verificar ordem de operações
  3. Testar com ferramentas automatizadas

references:
  - title: "Ethereum Smart Contract Best Practices"
    url: "https://consensys.github.io/smart-contract-best-practices/"
  - title: "OpenZeppelin Security"
    url: "https://docs.openzeppelin.com/contracts/security"
  - title: "The DAO Hack Explained"
    url: "https://www.gemini.com/cryptopedia/the-dao-hack-makerdao"
---

## Introdução

O ataque de reentrância é uma das vulnerabilidades mais críticas em smart contracts...

### Contexto Histórico

O ataque mais famoso foi o **The DAO Hack** em 2016, que resultou no roubo de 
3.6 milhões de ETH (aproximadamente $50 milhões na época).

### Objetivos deste Whitepaper

1. Explicar o funcionamento técnico de ataques de reentrância
2. Demonstrar exploração em ambiente controlado
3. Apresentar técnicas de mitigação
4. Fornecer código de exemplo

## Como Funciona um Ataque de Reentrância

### Código Vulnerável

```solidity
contract VulnerableBank {
    mapping(address => uint) public balances;
    
    function withdraw() public {
        uint amount = balances[msg.sender];
        
        // VULNERABILIDADE: Transferência antes de atualizar estado
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
        
        balances[msg.sender] = 0;  // Atualização tardia!
    }
}
```

### Contrato Atacante

```solidity
contract Attacker {
    VulnerableBank public bank;
    
    constructor(address _bank) {
        bank = VulnerableBank(_bank);
    }
    
    receive() external payable {
        if (address(bank).balance >= 1 ether) {
            bank.withdraw();  // Reentrância!
        }
    }
    
    function attack() external payable {
        bank.deposit{value: 1 ether}();
        bank.withdraw();
    }
}
```

## Técnicas de Mitigação

### 1. Padrão Checks-Effects-Interactions (CEI)

```solidity
function withdraw() public {
    uint amount = balances[msg.sender];
    
    // 1. Checks
    require(amount > 0, "Insufficient balance");
    
    // 2. Effects (atualizar estado ANTES da interação)
    balances[msg.sender] = 0;
    
    // 3. Interactions
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
}
```

### 2. ReentrancyGuard da OpenZeppelin

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecureBank is ReentrancyGuard {
    mapping(address => uint) public balances;
    
    function withdraw() public nonReentrant {
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
    }
}
```

## Análise Comparativa

| Técnica | Eficácia | Custo Gas | Complexidade |
|---------|----------|-----------|--------------|
| Padrão CEI | ⭐⭐⭐⭐⭐ | Baixo | Baixa |
| ReentrancyGuard | ⭐⭐⭐⭐⭐ | Médio | Muito Baixa |
| Mutex Manual | ⭐⭐⭐⭐⭐ | Médio | Média |
| Pull over Push | ⭐⭐⭐⭐ | Baixo | Alta |

## Ferramentas de Detecção

### Slither

```bash
slither contract.sol --detect reentrancy-eth
```

### Mythril

```bash
myth analyze contract.sol
```

## Conclusão

Ataques de reentrância são evitáveis com práticas adequadas de desenvolvimento...
```

### Passo 3: Campos do Whitepaper

| Campo | Descrição | Obrigatório |
|-------|-----------|-------------|
| `title` | Título do whitepaper | ✅ Sim |
| `summary` | Resumo breve | ✅ Sim |
| `date` | Data de publicação | ✅ Sim |
| `tags` | Tags para categorização | ⚠️ Recomendado |
| `author` | Autor do whitepaper | ⚠️ Recomendado |
| `parent_path` | Caminho da pesquisa principal | ⚠️ Recomendado |
| `cover_image` | Imagem de capa | ❌ Opcional |
| `executive_summary` | Resumo executivo | ❌ Opcional |
| `methodology` | Metodologia utilizada | ❌ Opcional |
| `tests` | Testes e resultados | ❌ Opcional |
| `conclusion` | Conclusões | ❌ Opcional |
| `references` | Referências bibliográficas | ❌ Opcional |

---

## 🔗 Vinculando Subpesquisas às Pesquisas

### Método 1: Via parent_path (Recomendado)

No arquivo da **subpesquisa**, adicione:

```yaml
parent_path: "pesquisa/blockchain-security"
```

Isso cria automaticamente um link no final do whitepaper para voltar à pesquisa principal.

### Método 2: Via subpesquisas no front matter da pesquisa

No arquivo da **pesquisa** (`index.md`), adicione:

```yaml
subpesquisas:
  - title: "Reentrancy Attacks em Ethereum"
    slug: "reentrancy-attacks-ethereum"
    summary: "Análise de ataques de reentrância"
  
  - title: "Flash Loan Attacks"
    slug: "flash-loan-attacks"
    summary: "Exploração de empréstimos instantâneos"
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Pesquisa Simples

```bash
# Criar pesquisa
hugo new content/pesquisa/ia-seguranca/index.md
```

```yaml
---
title: "IA Aplicada à Segurança Cibernética"
summary: "Uso de machine learning para detecção de ameaças"
date: 2025-11-19
draft: false
tags: ["ia", "machine-learning", "segurança"]
status: "em progresso"

checkpoints:
  - title: "Coleta de dataset"
    done: true
  - title: "Treinamento do modelo"
    done: false
  - title: "Validação e testes"
    done: false
---

## Visão Geral

Esta pesquisa explora o uso de redes neurais para detecção de malware...
```

### Exemplo 2: Whitepaper Completo

```bash
# Criar whitepaper
hugo new content/subpesquisa/deteccao-malware-ml.md
```

```yaml
---
title: "Detecção de Malware com Machine Learning"
date: 2025-11-19
draft: false
summary: "Implementação de modelo CNN para classificação de malware"
tags: ["ia", "malware", "deep-learning"]
author: "Hannya Tech Research"
parent_path: "pesquisa/ia-seguranca"

executive_summary: |
  Modelo CNN com 97% de acurácia na detecção de malware...

methodology: |
  Dataset: 10.000 amostras de malware e benignware...

tests: |
  Teste 1: Validação cruzada com 5 folds...

conclusion: |
  O modelo demonstrou alta eficácia...

references:
  - title: "Deep Learning for Malware Detection"
    url: "https://example.com"
---

## Introdução

Malware é uma ameaça crescente...
```

---

## 🎯 Dicas e Boas Práticas

### ✅ DO (Faça)

1. **Use nomes descritivos** para arquivos
   - ✅ `fingerprinting-de-navegador.md`
   - ❌ `pesquisa1.md`

2. **Preencha todos os campos recomendados**
   - Tags facilitam a busca
   - Summary aparece nos cards
   - Checkpoints mostram progresso

3. **Vincule subpesquisas às pesquisas**
   - Use `parent_path` para criar navegação

4. **Use markdown adequadamente**
   - Headings para estrutura
   - Code blocks para código
   - Tabelas para comparações

5. **Adicione imagens quando relevante**
   - Coloque em `/static/images/`
   - Referencie como `/images/nome.png`

### ❌ DON'T (Não Faça)

1. **Não deixe draft: true** quando quiser publicar
2. **Não use espaços** nos nomes de arquivos
3. **Não esqueça** de adicionar tags
4. **Não copie** código sem testar
5. **Não publique** sem revisar

---

## 📁 Estrutura de Diretórios Recomendada

```
content/
├── pesquisa/
│   ├── seguranca-web/
│   │   └── index.md
│   ├── blockchain/
│   │   └── index.md
│   └── ia-ml/
│       └── index.md
└── subpesquisa/
    ├── xss-attacks.md
    ├── csrf-protection.md
    ├── smart-contract-security.md
    └── adversarial-ml.md
```

---

## 🚀 Workflow Completo

### 1. Criar Pesquisa

```bash
hugo new content/pesquisa/minha-pesquisa/index.md
```

### 2. Configurar Front Matter

Edite o arquivo e configure título, tags, checkpoints, etc.

### 3. Escrever Conteúdo

Adicione a visão geral, objetivos, metodologia, etc.

### 4. Criar Subpesquisas

```bash
hugo new content/subpesquisa/meu-whitepaper.md
```

### 5. Vincular à Pesquisa

Adicione `parent_path: "pesquisa/minha-pesquisa"` no whitepaper.

### 6. Testar Localmente

```bash
hugo server -D --baseURL http://localhost:1313/
```

### 7. Publicar

Mude `draft: false` e faça commit/push.

---

## 🔧 Comandos Úteis

```bash
# Criar nova pesquisa
hugo new content/pesquisa/nome/index.md

# Criar nova subpesquisa
hugo new content/subpesquisa/nome.md

# Rodar servidor local
hugo server -D --baseURL http://localhost:1313/

# Build para produção
hugo --cleanDestinationDir

# Listar todo o conteúdo
hugo list all

# Verificar conteúdo draft
hugo list drafts
```

---

## 📞 Precisa de Ajuda?

- Veja exemplos em: `/content/subpesquisa/fingerprinting-de-navegador.md`
- Template base: `/archetypes/subpesquisa.md`
- Documentação do template: `/WHITEPAPER_TEMPLATE.md`

---

## 📝 Checklist de Publicação

Antes de publicar, verifique:

- [ ] `draft: false` está configurado
- [ ] Título e summary estão preenchidos
- [ ] Tags foram adicionadas
- [ ] Checkpoints estão atualizados (para pesquisas)
- [ ] parent_path está correto (para subpesquisas)
- [ ] Conteúdo foi revisado
- [ ] Links funcionam corretamente
- [ ] Imagens carregam (se houver)
- [ ] Código foi testado (se houver)
- [ ] Referências estão completas

---

**Última atualização**: 19/11/2025
**Versão**: 1.0
