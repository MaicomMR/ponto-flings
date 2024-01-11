# Obtém a versão do Node.js
node_version=$(node -v)

# Extrai a parte numérica da versão
node_major_version=$(echo $node_version | cut -d'.' -f1 | sed 's/[^0-9]*//g')

# Verifica se a versão é menor que 17
if [ $node_major_version -lt 17 ]; then
    echo "A versão do Node.js é inferior a 17. Você precisa ter a versão 17 ou maior para instalar o script."
    exit 1
fi