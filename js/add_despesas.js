function adicionarDespesa() {
    const descricao = document.getElementById("description").value;
    let valor = document.getElementById("value").value;

    // Substitui a vírgula por ponto e remove caracteres extras
    valor = valor.replace(",", ".");
    valor = parseFloat(valor);

    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    const data = document.getElementById("date").value;

    let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

    despesas.push({
        descricao: descricao,
        valor: valor,
        data: data
    });

    localStorage.setItem("despesas", JSON.stringify(despesas));
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
