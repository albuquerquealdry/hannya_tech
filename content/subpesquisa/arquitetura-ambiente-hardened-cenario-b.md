title: "Subpesquisa 2: Arquitetura do Ambiente Hardened (Cenário B)"
summary: "Construção do ambiente de alto anonimato, seleção e justificativa de ferramentas (Whonix, Tails, Tor+VPN)."
status: "em progresso"
tags: ["anonimato", "hardened", "cenário-b"]
parent_path: "pesquisa/anonimato"
---

## Objetivo

Projetar, implementar e validar um ambiente Hardened (Cenário B) que minimize vazamentos de identidade e reduza a unicidade de fingerprint, mantendo navegabilidade e segurança operacional.

## Princípios
- Isolamento por VM e segmentação de rede.
- Minimização de superfície de ataque e telemetria.
- Uso criterioso de Tor e, se necessário, VPN (ordem e riscos).

## Arquitetura
- VM Experimental (Hardened):
  - Opção A: `Tails` (live, amnésico, uso pontual).
  - Opção B: `Whonix` (Gateway + Workstation, persistência controlada).
- Rede:
  - `Whonix-Gateway`: roteia todo tráfego via Tor.
  - `Whonix-Workstation`: único caminho de saída é o Gateway.
  - Sem DNS externo; bloquear WebRTC STUN/ICE.

## Controles Técnicos
- Navegador:
  - Usar `Tor Browser` (no Whonix) ou navegador endurecido sem WebRTC.
  - Desativar canvas e APIs de fingerprint quando possível; reduzir fontes personalizadas.
- Sistema:
  - Desativar serviços de telemetria, sincronizações, atualizações automáticas em background.
  - Limitar armazenamento persistente; limpar caches e storage.
- Rede:
  - Firewall bloqueando UDP/STUN; forçar tráfego TCP via Tor.
  - Evitar `Tor over VPN` sem justificativa; preferir `VPN over Tor` apenas para destinos específicos e ciente dos riscos.

## Procedimento Passo a Passo
1) Provisionamento
   - Criar `Whonix-Gateway` e `Whonix-Workstation` segundo documentação oficial.
   - Validar que a Workstation não acessa internet sem o Gateway.

2) Endurecimento de Navegador
   - Configurar `Tor Browser` em modo padrão ou `safest` conforme necessidade.
   - Verificar WebRTC (deve estar bloqueado) e fingerprint reduzido.

3) Endurecimento de Sistema
   - Revisar serviços em execução; desativar telemetria.
   - Configurar limpeza automática de storage (scripts simples/cron, se aplicável).

4) Testes de Vazamento
   - Repetir testes da Subpesquisa 1 (IP/DNS/WebRTC, fingerprint pages) dentro do Cenário B.
   - Registrar `pcap`, screenshots e resultados comparáveis.

## Métricas
- IP/DNS/WebRTC: ausência/redução de vazamentos.
- Fingerprint: menor unicidade (mais comum/menos único).
- Tráfego: menor exposição a domínios de telemetria e trackers.

## Validação
- Reprodutibilidade: scripts/playbooks para replicar ambiente.
- Comparação direta com artefatos do Cenário A.

## Artefatos Entregues
- `hardened-experimental.pcap`
- `hardened-experimental.md` (resumo dos controles e achados)
- `scripts/` de provisionamento/configuração (se aplicável)