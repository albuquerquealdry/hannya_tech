# DIND Evidence Images Needed

The following images need to be extracted from the PDF and placed in `/static/images/subpesquisa/kubegoat/`:

1. **dind-1.png** - Teste inicial de ping com entrada válida (10.0.0.60)
2. **dind-2.png** - Command injection confirmado com `ls -la`
3. **dind-3.png** - Enumeração de usuários via `/etc/passwd`
4. **dind-4.png** - Verificação da existência do Python3
5. **dind-5.png** - Payload de reverse shell sendo injetado
6. **dind-6.png** - Reverse shell estabelecida com acesso root (whoami)
7. **dind-7.png** - Evidência de Docker-in-Docker via containerd.sock

## Cover Image
- **dind.png** - Cover image for the DIND subpesquisa

## Instructions
Extract these screenshots from the PDF file: `DIND (docker-in-docker) exploitation (1).pdf`
Place them in: `c:\Users\ADM\hannya_tech\static\images\subpesquisa\kubegoat\`

The markdown file has been updated with the proper image references using Hugo shortcodes.
