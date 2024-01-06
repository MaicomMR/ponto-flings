
  

### Pré requisitos:

  

1.  **Node** instalado na versão **17** ou maior
2. **Linux** ou **wsl2** rodando na máquina
3. **OhMyZsh** instalado ([guia para instalar](https://gist.github.com/MaicomMR/b436ae8f454f1d5a8109353eb027ebc8))
4. **VSCode** instalado ([link para baixar](https://code.visualstudio.com/))

### Como executar o script
1. Clone o repositório no seu computador - `git clone https://github.com/MaicomMR/ponto-flings.git`
2. Acesse o diretório do script
3. Adicione as suas credenciais do PontoMais no arquivo `config.js`
	 :warning: **Cuidado: Não compartilhe nem mostre as suas credenciais para outras pessoas!**
4. Garanta que o arquivo tenha permissão para ser executado
4. Dentro da pasta do repositório e executar o arquivo install.sh - `./install.sh`

  

**Outras informações:**

1. Caso seja necessário dar permissão de execução para o arquivo rode o comando
chmod +x install.sh
chmod +x ponto.sh


### Instalação Manual
1. Acesse o arquivo de configuração do Zsh - `code ~/.zshrc`;
2. Adicione esse script na última linha do arquivo - `PONTOMAIS=$(xxx/ponto-flings/ponto.sh)`;
3. Altere o `xxx` da linha acima pelo path até o repositório na sua máquina;
4. Vá até o tema que você utiliza e adicione a exibição do ponto (`RPROMPT='$PONTOMAIS'`)
	 :warning: **Cuidado:** caso o seu script já utilize um prompt na direita pode ser sobrescrito
> Exemplo:
> 1. `code ~/.oh-my-zsh/themes` 
> 1. Acesse o tema deseja, no nosso caso o `agnoster.zsh-theme`
> 1. Ao final do arquivo adicione a linha `RPROMPT='$PONTOMAIS'`
5. No seu arquivo ponto.sh, dentro do repositório, garanta que o path para chamar o arquivo javascript seja absoluto

exemplo:
> #!/bin/bash
> node  /home/ubuntu-pc/ponto-flings/src/main.js



![image](https://github.com/MaicomMR/ponto-flings/assets/12571488/988fdeb9-b601-4e66-9775-392adcdaf059)
