#!/bin/bash

# Caminho absoluto do diretório do script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"


# ADICIONANDO CHAMADA DO SCRIPT PONTO NA BASE DO ZSH
PREFIXO='PONTOMAIS=$('
SUFIXO=')'
FILE='/ponto.sh'
CUSTOM_PATH=$(pwd)
COMMANDLINE=${PREFIXO}${CUSTOM_PATH}${FILE}${SUFIXO}

if ! grep -qF "PONTOMAIS=" $HOME/.zshrc; then
    # Adiciona o comando à .zshrc
    echo \ >> "$HOME/.zshrc"
    echo "$COMMANDLINE" >> "$HOME/.zshrc"
fi

# ADICIONANDO PROMPT NO TERMINAL DO TEMA AGNOSTER PARA EXIBIR O HORÁRIO
PONTOMAIS='$PONTOMAIS'
RPROMPT_LINE="RPROMPT='\$PONTOMAIS'"
THEME_FILE="$HOME/.oh-my-zsh/themes/agnoster.zsh-theme"
if ! grep -qF "$RPROMPT_LINE" "$THEME_FILE"; then
    # Adiciona a linha ao final do arquivo
    echo "$RPROMPT_LINE" >> "$THEME_FILE"
    echo "Linha adicionada com sucesso."
fi

# SETANDO O TEMA AGNOSTER COMO PADRÃO
sed -i 's/ZSH_THEME=.*/ZSH_THEME="agnoster"/' ~/.zshrc

# REESCREVENDO O ponto.sh PARA GARATIR O PATH ABSOLUTO DA MÁQUINA

PATH_EXEC_FILE="${SCRIPT_DIR}/ponto.sh"

if [ -e "$PATH_EXEC_FILE" ]; then
    # Apaga o arquivo existente
    sudo /bin/rm "$PATH_EXEC_FILE"
fi
# Cria o arquivo de execução
echo '#!/bin/bash' >> "$PATH_EXEC_FILE"
echo >> "$PATH_EXEC_FILE"
echo "node ${SCRIPT_DIR}/src/main.js" >> "$PATH_EXEC_FILE"
/bin/chmod +x ponto.sh