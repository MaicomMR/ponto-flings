### Pré requisitos:
1.  **Node** instalado na versão **17** ou maior
2.  **Linux** ou **wsl2** rodando na máquina
3.  **OhMyZsh** instalado ([guia para instalar](https://gist.github.com/MaicomMR/b436ae8f454f1d5a8109353eb027ebc8))
4.  **VSCode** instalado ([link para baixar](https://code.visualstudio.com/))

### Como executar o script
1. Clone o repositório no seu computador - `git clone https://github.com/MaicomMR/ponto-flings.git`
2. Acesse o diretório do script
3. Adicione as suas credenciais do PontoMais no arquivo `config.js` - [tutorial detalhado](https://github.com/MaicomMR/ponto-flings/blob/main/readme-ponto-mais.md)

:warning: **Cuidado: Não compartilhe nem mostre as suas credenciais para outras pessoas!**
4. Garanta que o arquivo `install.sh` tenha permissão para ser executado - `chmod +x install.sh`
5. Execute o script de instalação - `./install.sh`
6. Rode o comando para recarregar seus arquivos do zsh - `source ~/.zshrc`

**Outras informações:**
1. Caso seja necessário dar permissão de execução para o arquivo rode o comando
`chmod +x install.sh`
`chmod +x ponto.sh`

### Instalação Manual
1. Vá até a pastas de temas do seu OhMyZsh - `code ~/.oh-my-zsh/themes/` 
2. Encontre o tema que você utiliza e adicione o código abaixo:
```
RPROMPT='$(get_ponto)'
get_ponto() {
PONTOMAIS=$(/home/ubuntu-pc/ponto-flings/ponto.sh)
echo  $PONTOMAIS
}
```
:warning: **Cuidado:** caso o seu script já utilize um prompt na direita pode ser sobrescrito
**Obs:** Lembre-se de alterar o path '`/home/ubuntu-pc/ponto-flings/ponto.sh`' do exemplo pelo seu path absoluto do script

3. No seu arquivo `ponto.sh`, dentro do repositório, garanta que o path para chamar o arquivo javascript(main.js) seja absoluto
exemplo:
```
#!/bin/bash
node  /home/ubuntu-pc/ponto-flings/src/main.js
```

4. Altere o arquivo de config para ter o path absoluto da pasta de cache:
Altere a chave do 'cachePath' considerando o caminho absoluto da sua máquina.
exemplo: `'cachePath' : '/home/ubuntu-pc/ponto-flings/src/cache/',`

### Script em Funcionamento
![image](https://github.com/MaicomMR/ponto-flings/assets/12571488/831f4ca6-dc99-47e8-90b4-2432bb1ef192)
