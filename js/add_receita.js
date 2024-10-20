function adicionarReceita() {
    const descricao = document.getElementById("description").value;
    const valor = parseFloat(document.getElementById("value").value);
    const data = document.getElementById("date").value;

    // Verifica se já existe um array de receitas no LocalStorage
    let receitas = JSON.parse(localStorage.getItem("receitas")) || [];

    // Adiciona a nova receita ao array
    receitas.push({
        descricao: descricao,
        valor: valor,
        data: data
    });

    // Atualiza o LocalStorage com a nova lista de receitas
    localStorage.setItem("receitas", JSON.stringify(receitas));

    // Atualiza os saldos
    atualizarSaldo();

    alert("Receita adicionada com sucesso!");
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
