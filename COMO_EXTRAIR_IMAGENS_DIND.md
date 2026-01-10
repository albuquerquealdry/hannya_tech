# Como Extrair Imagens do PDF DIND

## Problema
As evidências não aparecem porque os arquivos de imagem ainda não existem em:
`c:\Users\ADM\hannya_tech\static\images\subpesquisa\kubegoat\`

## Solução: Extrair do PDF

### Método 1: Usar Adobe Acrobat / PDF Reader
1. Abra o arquivo: `DIND (docker-in-docker) exploitation (1).pdf`
2. Use a ferramenta de captura de tela ou "Export Images"
3. Salve cada screenshot com os nomes corretos

### Método 2: Usar Ferramenta Online
1. Acesse: https://www.ilovepdf.com/pdf_to_jpg
2. Faça upload do PDF DIND
3. Baixe as imagens
4. Renomeie conforme a lista abaixo

### Método 3: Screenshot Manual
1. Abra o PDF
2. Use Windows Snipping Tool (Win + Shift + S)
3. Capture cada evidência
4. Salve com os nomes corretos

## Imagens Necessárias

Salvar em: `c:\Users\ADM\hannya_tech\static\images\subpesquisa\kubegoat\`

### Evidências (7 imagens):
1. **dind-1.png** - Teste inicial de ping com entrada válida (10.0.0.60)
   - Mostra o resultado do comando ping normal

2. **dind-2.png** - Command injection confirmado com `ls -la`
   - Mostra o resultado do payload: `127.0.0.1; ls -la`
   - Deve mostrar arquivos: main.go, go.mod, docker-entrypoint.sh

3. **dind-3.png** - Enumeração de usuários via `/etc/passwd`
   - Mostra o resultado de: `127.0.0.1; cat /etc/passwd`
   - Lista de usuários incluindo root, daemon, app

4. **dind-4.png** - Verificação da existência do Python3
   - Mostra o resultado de: `127.0.0.1; which python3`
   - Deve mostrar: `/usr/bin/python3`

5. **dind-5.png** - Payload de reverse shell sendo injetado
   - Mostra o payload Python sendo executado no formulário

6. **dind-6.png** - Reverse shell estabelecida com acesso root
   - Mostra a conexão estabelecida
   - Resultado do comando `whoami` mostrando "root"

7. **dind-7.png** - Evidência de Docker-in-Docker via containerd.sock
   - Mostra a listagem de montagens
   - Deve mostrar: `/custom/containerd/containerd.sock`

### Capa (1 imagem):
8. **dind.png** - Imagem de capa para a subpesquisa
   - Pode ser uma imagem representativa do Docker-in-Docker
   - Ou a primeira evidência como capa

## Após Extrair as Imagens

1. Coloque todas as 8 imagens em:
   ```
   c:\Users\ADM\hannya_tech\static\images\subpesquisa\kubegoat\
   ```

2. Rebuild do Hugo:
   ```bash
   hugo server
   ```

3. Acesse a página DIND e verifique se as imagens aparecem

## Verificação Rápida

Execute este comando para verificar se as imagens foram criadas:
```powershell
Get-ChildItem "c:\Users\ADM\hannya_tech\static\images\subpesquisa\kubegoat\dind*.png"
```

Deve retornar 8 arquivos (dind-1.png até dind-7.png + dind.png)
