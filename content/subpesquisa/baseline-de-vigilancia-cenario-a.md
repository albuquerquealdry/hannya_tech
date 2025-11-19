title: "Subpesquisa 1: O Baseline de Vigilância (Cenário A)"
summary: "Quantificar o 'não anonimato' no ambiente Controle e registrar vazamentos de dados, fingerprints e tráfego."
status: "em progresso"
tags: ["anonimato", "controle", "baseline"]
parent_path: "pesquisa/anonimato"
---

## Objetivo

Estabelecer o baseline de vigilância de um usuário comum (Cenário A), medindo vazamentos de identidade (IP, DNS, WebRTC), fingerprinting de navegador e indicadores de rastreamento. Produzir evidências replicáveis e comparáveis contra o Cenário B.

## Escopo
- Sistema operacional padrão (Windows/Ubuntu) com navegador comum (Chrome/Firefox).
- Sem ferramentas de anonimato ou ofuscação ativas.
- Navegação em sites populares e páginas de teste de vazamento.

## Ambiente
- VM Controle: CPU 2–4 vCPUs, RAM 4–8GB, rede NAT.
- Ferramentas:
  - `Wireshark` para captura de pacotes.
  - Páginas de teste: `https://browserleaks.com/`, `https://ipleak.net/`, `https://coveryourtracks.eff.org/`.
  - Extensões desativadas (usar perfil limpo).

## Procedimento Passo a Passo
1) Preparação
   - Criar VM Controle limpa e atualizar sistema.
   - Instalar `Wireshark` e habilitar captura na interface da VM (NAT/bridge conforme aplicável).

2) Capturas de rede
   - Iniciar `Wireshark` e marcar filtros úteis:
     - `dns` (consultas/respostas)
     - `http or tls` (tráfego web)
     - `stun or turn` (WebRTC)
   - Registrar `IP externo`, `resolução DNS`, presença de `SNI` em TLS.

3) Testes de vazamento
   - Acessar `ipleak.net` e capturar resultados: IP, DNS resolvers, WebRTC addresses.
   - Acessar `browserleaks.com` (Canvas, WebGL, AudioContext, Fonts) e salvar fingerprints.
   - Acessar `coveryourtracks.eff.org` e registrar o score (único/não único).

4) Fingerprinting e rastreamento
   - Registrar: `UA`, `platform`, `plugins`, `doNotTrack`, `timezone`, `screen`, `languages`, `fonts`.
   - Checar cookies de terceiros e storage acessível (localStorage, IndexedDB).

5) Evidências e artefatos
   - Exportar `.pcap` da sessão.
   - Salvar `screenshots` dos resultados.
   - Exportar JSON (quando disponível) das páginas de teste.

## Métricas
- IP/DNS/WebRTC: número de vazamentos detectados (contagem e detalhes).
- Fingerprint: unicidade (score), número de atributos coletados.
- Tráfego: domínios contatados, presença de trackers (via listas públicas, ex.: EasyList/EasyPrivacy).

## Resultados Esperados
- Evidências claras de exposição de IP, DNS e possíveis endpoints WebRTC.
- Fingerprint com alto grau de unicidade no Cenário A.
- Presença de trackers/domínios de telemetria comuns.

## Riscos e Limitações
- Variações por versão do navegador/SO.
- Diferenças de provedores de DNS/ISP.

## Artefatos Entregues
- `baseline-controle.pcap`
- `baseline-controle.md` (resumo dos achados)
- `screenshots/` com resultados das páginas de teste