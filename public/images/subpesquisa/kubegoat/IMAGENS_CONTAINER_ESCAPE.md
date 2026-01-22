# Guia de Substituição de Imagens - Container Escape to Host

## Estrutura de Imagens

Todas as imagens devem ser colocadas no diretório:
`/home/boneka/hannya_tech/static/images/subpesquisa/kubegoat/`

## Lista de Imagens Necessárias

### 1. Imagem de Capa
**Arquivo:** `container-escape.png`
**Descrição:** Imagem de capa da subpesquisa (aparece no card e no topo da página)
**Sugestão:** Screenshot do webshell ou diagrama mostrando container escape
**Dimensões recomendadas:** 1200x630px

---

### 2. Interface do Webshell
**Arquivo:** `container-escape-1.png`
**Descrição:** Interface do webshell acessível via navegador
**Conteúdo esperado:** Screenshot mostrando o webshell no browser
**Referência original:** Linha 13 do arquivo original (primeira imagem)

---

### 3. Comando Mount - Descoberta da Montagem
**Arquivo:** `container-escape-2.png`
**Descrição:** Saída do comando `mount` revelando a montagem do host
**Conteúdo esperado:** Terminal mostrando:
```
mount
tmpfs on /host-system/var/lib/kubelet/pods
```
**Referência original:** Linha 21 do arquivo original (segunda imagem)

---

### 4. Tentativa de Edição do authorized_keys
**Arquivo:** `container-escape-3.png`
**Descrição:** Tentativa de usar vim/nano e descoberta de que não estão instalados
**Conteúdo esperado:** Erro ao tentar executar vim ou nano
**Referência original:** Linha 40 do arquivo original (terceira imagem)

---

### 5. Identificação do OS - Ubuntu Server
**Arquivo:** `container-escape-4.png`
**Descrição:** Saída do comando `cat /etc/os-release`
**Conteúdo esperado:** Terminal mostrando informações do Ubuntu Server
**Referência original:** Linha 55 do arquivo original (quarta imagem)

---

### 6. Extração do IP via Netplan
**Arquivo:** `container-escape-5.png`
**Descrição:** Conteúdo do arquivo netplan mostrando configuração de rede
**Conteúdo esperado:** Terminal mostrando o IP do host no arquivo YAML do netplan
**Referência original:** Linha 61 do arquivo original (quinta imagem)

---

### 7. Acesso SSH Bem-sucedido
**Arquivo:** `container-escape-6.png`
**Descrição:** Conexão SSH estabelecida com sucesso ao host
**Conteúdo esperado:** Terminal mostrando login SSH bem-sucedido como root
**Referência original:** Linha 70 do arquivo original (sexta imagem)

---

### 8. Primeira Conexão de Reverse Shell
**Arquivo:** `container-escape-7.png`
**Descrição:** Primeira conexão de reverse shell via cronjob
**Conteúdo esperado:** Terminal com netcat mostrando conexão recebida
**Referência original:** Linha 108 do arquivo original (sétima imagem)

---

### 9. Reconexão Automática - Persistência
**Arquivo:** `container-escape-8.png`
**Descrição:** Nova conexão automática após 1 minuto, demonstrando persistência
**Conteúdo esperado:** Terminal mostrando segunda conexão automática
**Referência original:** Linha 113 do arquivo original (oitava imagem)

---

## Como Substituir as Imagens

1. Prepare suas screenshots seguindo as descrições acima
2. Renomeie os arquivos exatamente como listado (ex: `container-escape-1.png`)
3. Copie todos os arquivos para: `/home/boneka/hannya_tech/static/images/subpesquisa/kubegoat/`
4. Execute o build do Hugo: `../hugo --cleanDestinationDir`
5. Verifique o resultado acessando a página da pesquisa

## Comandos Úteis

### Para verificar se as imagens estão no lugar certo:
```bash
ls -lh /home/boneka/hannya_tech/static/images/subpesquisa/kubegoat/container-escape*.png
```

### Para fazer build do Hugo:
```bash
cd /home/boneka/hannya_tech
../hugo --cleanDestinationDir
```

### Para servir localmente e visualizar:
```bash
cd /home/boneka/hannya_tech
../hugo server -D
```

---

## Notas Importantes

- **Formato:** Use PNG para melhor qualidade de screenshots
- **Tamanho:** Mantenha imagens razoáveis (< 500KB cada) para performance
- **Nomes:** Os nomes devem ser EXATAMENTE como listado (case-sensitive)
- **Privacidade:** Certifique-se de remover/ofuscar IPs reais ou informações sensíveis antes de publicar
