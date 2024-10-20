document.addEventListener("DOMContentLoaded", function() {
    // Recuperar as receitas e despesas do LocalStorage
    let receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

    let saldoAtual = 0;
    let saldoFuturo = 0;
    const dataAtual = new Date().toISOString().split("T")[0];

    // Calcular saldo atual (somente receitas e despesas até a data atual)
    receitas.forEach(receita => {
        if (receita.data <= dataAtual) {
            saldoAtual += receita.valor;
        }
    });

    despesas.forEach(despesa => {
        if (despesa.data <= dataAtual) {
            saldoAtual -= despesa.valor;
        }
    });

    // Calcular saldo futuro (saldo atual + receitas e despesas futuras)
    saldoFuturo = saldoAtual; // Inicia com o saldo atual

    receitas.forEach(receita => {
        if (receita.data > dataAtual) {
            saldoFuturo += receita.valor;
        }
    });

    despesas.forEach(despesa => {
        if (despesa.data > dataAtual) {
            saldoFuturo -= despesa.valor;
        }
    });

    // Função para formatar os valores como moeda brasileira (Real)
    function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Exibir os saldos formatados nos campos corretos
    document.getElementById("current-balance").value = formatarValor(saldoAtual || 0);
    document.getElementById("future-balance").value = formatarValor(saldoFuturo || 0);
});

// Funcão de trocar a senha 
function trocarSenha() {
    const email = prompt("Confirme seu e-mail para trocar a senha:");
    
    if (!email) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    // Obter dados do LocalStorage
    let usuario = JSON.parse(localStorage.getItem(email));
    
    // Verificar se o e-mail existe
    if (!usuario) {
        alert("E-mail não encontrado.");
        return;
    }

    // Solicitar a nova senha
    const novaSenha = prompt("Digite sua nova senha:");
    const confirmacaoSenha = prompt("Confirme sua nova senha:");

    if (novaSenha !== confirmacaoSenha) {
        alert("As senhas não conferem. Tente novamente.");
        return;
    }

    // Atualizar a senha do usuário
    usuario.password = novaSenha;
    localStorage.setItem(email, JSON.stringify(usuario));

    alert("Senha alterada com sucesso!");
}

