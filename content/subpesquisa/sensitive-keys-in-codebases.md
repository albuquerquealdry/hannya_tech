
---
title: "Sensitive keys in codebases"
summary: "Exploração de diretório `.git` exposto via servidor web, resultando na extração de credenciais AWS e Flags através da análise de histórico de commits."
date: 2025-12-15
status: "concluído"
tags: ["kubernetes", "security", "git-exposure", "osint", "aws-leak"]
parent_path: "pesquisa/kubegoat"
tipo: "subpesquisa"
capa: "/images/subpesquisa/kubegoat/keys.png"
---

## Introdução

Nesta subpesquisa, investigamos o cenário onde uma aplicação containerizada expõe inadvertidamente seu sistema de controle de versão. A exposição do diretório `.git` em ambientes de produção é uma falha crítica que permite a reconstrução completa do código-fonte e do histórico de alterações, frequentemente revelando segredos hardcoded que deveriam ser privados.

## Objetivos

1.  Identificar serviços web com diretórios sensíveis expostos.
2.  Explorar a falha para reconstruir o repositório localmente.
3.  Realizar mineração de dados no histórico de commits (`git log`) para encontrar credenciais.
4.  Propor barreiras de defesa no nível de CI/CD e configuração de servidor.

## 🛠 Metodologia de Ataque (Red Team)

A execução seguiu a cadeia de ataque (Kill Chain) baseada em reconhecimento e exploração de má configuração web.

### 1. Reconhecimento


Inicialmente, foi realizado um *port-forward* no serviço `build-code-service`. Com o acesso garantido, iniciamos a enumeração de diretórios utilizando a ferramenta `dirsearch` na porta alvo:

```bash
python3 dirsearch.py -u http://10.0.0.60:31607/
```
{{< img src="/images/subpesquisa/kubegoat/sensitive-keys-in-codebases-1.png" alt="dirsearch confirma /.git exposto" class="evidencia" >}}

**Resultado:** O scanner retornou código **200 OK** para caminhos críticos, confirmando a exposição de arquivos internos do Git:

  * `/git/HEAD`
  * `/.git/config`
  * `/git/COMMIT_EDITMSG`

Os mesmos poderiam ser acessados de via browser, permitindo a exfiltração de dados para ataques:

{{< img src="/images/subpesquisa/kubegoat/sensitive-keys-in-codebases-2.png" alt="acesso ao .git via browser" class="evidencia" >}}

{{< img src="/images/subpesquisa/kubegoat/sensitive-keys-in-codebases-3.png" alt="acesso ao .git via browser" class="evidencia" >}}
### 2\. Exploração (Dump do Repositório)

Para explorar essa vulnerabilidade, utilizamos a ferramenta `git-dumper`. Essa ferramenta baixa recursivamente os objetos e referências do git exposto para recriar o repositório na máquina do atacante.

```bash
git-dumper http://10.0.0.60:31607/.git output_repo
```
{{< img src="/images/subpesquisa/kubegoat/sensitive-keys-in-codebases-4.png" alt="acesso ao .git via browser" class="evidencia" >}}

### 3\. Análise Forense

Com o repositório clonado localmente, analisamos o histórico de alterações. O comando `git log` revelou commits realizados pelo autor "Madhu Akula", especificamente um commit suspeito com a mensagem "Included custom environmental variables".

{{< img src="/images/subpesquisa/kubegoat/sensitive-keys-in-codebases-5.png" alt="acesso ao .git via browser" class="evidencia" >}}

Ao inspecionar as diferenças desse commit específico com o comando `git log -p`:

```bash
git log -p
```
{{< img src="/images/subpesquisa/kubegoat/sensitive-keys-in-codebases-6.png" alt="acesso ao .git via browser" class="evidencia" >}}

Identificamos a criação de um arquivo `.env` contendo credenciais de nuvem ativas e flags do desafio:

  * **AWS Access Key ID:** `AKIWSHD6243HZ2G1KEDC`
  * **K8s Goat Flag:** `k8s-goat-81bc7833...`

## 🛡 Análise de Impacto e Mitigação (Blue Team)

A facilidade com que as chaves da AWS foram recuperadas (aproximadamente 15 minutos) demonstra um risco de severidade **Crítica**. Um atacante com essas chaves poderia comprometer toda a infraestrutura de nuvem, não apenas o cluster Kubernetes.

### Como Corrigir (Remediação Imediata)

1.  **Bloqueio no Web Server:** Reconfigure o servidor web (Nginx, Apache, ou o código da aplicação Go/Node) para negar acesso a qualquer diretório oculto (iniciados por `.`).
      * *Exemplo Nginx:* `location ~ /\.git { deny all; }`
2.  **Limpeza do Histórico:** As chaves vazadas devem ser **revogadas imediatamente** na AWS. Apenas apagar o arquivo no commit atual não resolve, pois ele permanece no histórico. É necessário usar ferramentas como `BFG Repo-Cleaner` ou `git filter-branch` para remover os dados permanentemente.

### Como Prevenir (Boas Práticas de Engenharia)

Para evitar que isso ocorra novamente, recomendamos a implementação de camadas de defesa em profundidade:

  * **Pré-Commit Hooks:** Utilize ferramentas como **Talisman** ou **pre-commit** com hooks de detecção de segredos. Isso impede que o desenvolvedor faça o commit de chaves AWS ou arquivos `.env` localmente.
  * **Secret Management:** Jamais use arquivos `.env` dentro da imagem Docker. Utilize **Kubernetes Secrets** ou soluções de cofre como **HashiCorp Vault**. Os segredos devem ser injetados apenas em tempo de execução.
  * **Container Build:** Certifique-se de que o arquivo `.dockerignore` inclua o diretório `.git`. Isso previne que a pasta de versionamento seja copiada para dentro da imagem final, eliminando o vetor de ataque pela raiz.

<!-- end list -->

```text
# .dockerignore
.git
.env
```

  * **CI/CD Scanning:** Implemente passos no pipeline (ex: GitHub Actions, GitLab CI) que rodem o **TruffleHog** ou **Gitleaks** para escanear o código antes do build.
