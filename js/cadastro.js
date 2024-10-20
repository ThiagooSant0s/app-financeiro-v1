function cadastrar() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    // Verifica se o usuário já está cadastrado
    if (localStorage.getItem(email)) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Cria o objeto do usuário
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Salva o usuário no LocalStorage
    localStorage.setItem(email, JSON.stringify(user));
    alert("Cadastro realizado com sucesso!");

    // Redireciona para a tela principal
    window.location.href = "visaogeral.html";
}
