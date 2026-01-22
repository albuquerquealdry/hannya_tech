═══════════════════════════════════════════════════════════════════════════════
  GUIA RÁPIDO - SUBSTITUIÇÃO DE IMAGENS: Container Escape to Host
═══════════════════════════════════════════════════════════════════════════════

📁 DIRETÓRIO: /home/boneka/hannya_tech/static/images/subpesquisa/kubegoat/

═══════════════════════════════════════════════════════════════════════════════

🖼️  IMAGEM DE CAPA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Arquivo: container-escape.png
Uso: Capa da subpesquisa (card + topo da página)
Conteúdo: Screenshot do webshell ou diagrama de container escape
Dimensões: 1200x630px (recomendado)

═══════════════════════════════════════════════════════════════════════════════

📸 SCREENSHOTS DO ATAQUE (em ordem cronológica)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] container-escape-1.png
    └─ Interface do webshell no navegador
    └─ Seção: "1. Reconhecimento Inicial"

[2] container-escape-2.png
    └─ Comando: mount
    └─ Mostra: tmpfs on /host-system/var/lib/kubelet/pods
    └─ Seção: "1. Reconhecimento Inicial"

[3] container-escape-3.png
    └─ Tentativa de usar vim/nano (erro: comando não encontrado)
    └─ Seção: "2. Exploração do Sistema Host"

[4] container-escape-4.png
    └─ Comando: cat /etc/os-release
    └─ Mostra: Ubuntu Server
    └─ Seção: "3. Enumeração de Rede do Host"

[5] container-escape-5.png
    └─ Comando: cat /etc/netplan/*.yaml
    └─ Mostra: IP do host
    └─ Seção: "3. Enumeração de Rede do Host"

[6] container-escape-6.png
    └─ Comando: ssh -i ~/.ssh/id_ed25519 root@<HOST_IP>
    └─ Mostra: Login SSH bem-sucedido
    └─ Seção: "4. Estabelecimento de Acesso SSH"

[7] container-escape-7.png
    └─ Comando: nc -lvnp 4444
    └─ Mostra: Primeira conexão de reverse shell
    └─ Seção: "5. Implementação de Persistência"

[8] container-escape-8.png
    └─ Mostra: Reconexão automática após 1 minuto
    └─ Seção: "6. Validação de Persistência"

═══════════════════════════════════════════════════════════════════════════════

✅ CHECKLIST DE SUBSTITUIÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] container-escape.png      (CAPA)
[ ] container-escape-1.png    (Webshell interface)
[ ] container-escape-2.png    (mount command)
[ ] container-escape-3.png    (vim/nano error)
[ ] container-escape-4.png    (OS release)
[ ] container-escape-5.png    (netplan IP)
[ ] container-escape-6.png    (SSH success)
[ ] container-escape-7.png    (First reverse shell)
[ ] container-escape-8.png    (Auto reconnect)

═══════════════════════════════════════════════════════════════════════════════

🚀 COMANDOS PARA BUILD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 1. Verificar imagens no lugar:
ls -lh /home/boneka/hannya_tech/static/images/subpesquisa/kubegoat/container-escape*.png

# 2. Build do Hugo:
cd /home/boneka/hannya_tech
../hugo --cleanDestinationDir

# 3. Servir localmente (opcional):
../hugo server -D

# 4. Acessar no navegador:
http://localhost:1313/pesquisa/kubegoat/

═══════════════════════════════════════════════════════════════════════════════

⚠️  IMPORTANTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Nomes dos arquivos são CASE-SENSITIVE
• Use formato PNG para screenshots
• Ofusque IPs reais e informações sensíveis
• Tamanho recomendado: < 500KB por imagem

═══════════════════════════════════════════════════════════════════════════════
