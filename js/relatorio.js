document.addEventListener("DOMContentLoaded", function() {
    // Obter receitas e despesas do LocalStorage
    let receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

    // Referência ao corpo da tabela
    const reportBody = document.getElementById("report-body");

    // Função para formatar a data no padrão brasileiro
    function formatarDataBrasileira(data) {
        const partes = data.split("-");
        return `${partes[2]}/${partes[1]}/${partes[0]}`; // Retorna no formato dia/mês/ano
    }

    // Função para renderizar a tabela
    function renderTabela() {
        reportBody.innerHTML = ''; // Limpar tabela antes de renderizar

        // Preencher tabela com receitas
        receitas.forEach((receita, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${receita.descricao}</td>
                <td>R$ ${receita.valor.toFixed(2)}</td>
                <td>${formatarDataBrasileira(receita.data)}</td>
                <td>Receita</td>
                <td><button onclick="excluirReceita(${index})" class="delete-button">Excluir</button></td>
            `;
            reportBody.appendChild(row);
        });

        // Preencher tabela com despesas
        despesas.forEach((despesa, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${despesa.descricao}</td>
                <td>R$ ${despesa.valor.toFixed(2)}</td>
                <td>${formatarDataBrasileira(despesa.data)}</td>
                <td>Despesa</td>
                <td><button onclick="excluirDespesa(${index})" class="delete-button">Excluir</button></td>
            `;
            reportBody.appendChild(row);
        });
    }

    // Função para excluir uma receita
    window.excluirReceita = function(index) {
        receitas.splice(index, 1); // Remove a receita pelo índice
        localStorage.setItem("receitas", JSON.stringify(receitas)); // Atualiza o LocalStorage corretamente
        renderTabela(); // Re-renderiza a tabela após exclusão
    };

    // Função para excluir uma despesa
    window.excluirDespesa = function(index) {
        despesas.splice(index, 1); // Remove a despesa pelo índice
        localStorage.setItem("despesas", JSON.stringify(despesas)); // Atualiza o LocalStorage corretamente
        renderTabela(); // Re-renderiza a tabela após exclusão
    };

    // Renderizar a tabela na inicialização
    renderTabela();
});

// Função para baixar o PDF do relatório
function baixarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionar título ao PDF
    doc.setFontSize(18);
    doc.text('Relatório Financeiro', 10, 10);

    // Adicionar a tabela ao PDF
    let y = 20;
    doc.setFontSize(12);
    doc.text('Descrição', 10, y);
    doc.text('Valor', 70, y);
    doc.text('Data', 120, y);
    doc.text('Tipo', 160, y);

    y += 10;

    // Função para formatar a data no padrão brasileiro
    function formatarDataBrasileira(data) {
        const partes = data.split("-");
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    // Obter receitas e despesas novamente
    let receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

    // Adicionar receitas ao PDF
    receitas.forEach(receita => {
        doc.text(receita.descricao, 10, y);
        doc.text(`R$ ${receita.valor.toFixed(2)}`, 70, y);
        doc.text(formatarDataBrasileira(receita.data), 120, y);
        doc.text('Receita', 160, y);
        y += 10;
    });

    // Adicionar despesas ao PDF
    despesas.forEach(despesa => {
        doc.text(despesa.descricao, 10, y);
        doc.text(`R$ ${despesa.valor.toFixed(2)}`, 70, y);
        doc.text(formatarDataBrasileira(despesa.data), 120, y);
        doc.text('Despesa', 160, y);
        y += 10;
    });

    // Baixar o PDF
    doc.save('relatorio-financeiro.pdf');
}
