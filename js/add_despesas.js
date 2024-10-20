function adicionarDespesa() {
    const descricao = document.getElementById("description").value;
    const valor = parseFloat(document.getElementById("value").value);
    const data = document.getElementById("date").value;

    // Verifica se já existe um array de despesas no LocalStorage
    let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

    // Adiciona a nova despesa ao array
    despesas.push({
        descricao: descricao,
        valor: valor,
        data: data
    });

    // Atualiza o LocalStorage com a nova lista de despesas
    localStorage.setItem("despesas", JSON.stringify(despesas));

    // Atualiza os saldos
    atualizarSaldo();

    alert("Despesa adicionada com sucesso!");
    window.location.href = "visaogeral.html"; 
}

function atualizarSaldo() {
    let receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

    let saldoAtual = 0;
    let saldoFuturo = 0;
    const dataAtual = new Date().toISOString().split("T")[0];

    // Calcula o saldo atual e futuro com base nas receitas e despesas
    receitas.forEach(receita => {
        if (receita.data <= dataAtual) {
            saldoAtual += receita.valor;
        } else {
            saldoFuturo += receita.valor;
        }
    });

    despesas.forEach(despesa => {
        if (despesa.data <= dataAtual) {
            saldoAtual -= despesa.valor;
        } else {
            saldoFuturo -= despesa.valor;
        }
    });

    // Armazena os saldos no LocalStorage
    localStorage.setItem("saldoAtual", saldoAtual);
    localStorage.setItem("saldoFuturo", saldoFuturo);
}
