function getTodayDateFormated(){
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
}

module.exports = {
    getTodayDateFormated
}