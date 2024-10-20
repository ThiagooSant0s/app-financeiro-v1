function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verificar se o e-mail está cadastrado 
    const user = JSON.parse(localStorage.getItem(email));
    if (!user) {
        alert("Usuário não cadastrado");
        return;
    }

    // Verifica se a senha está correta
    if (user.password !== password) {
        alert("Senha incorreta!");
        return;
    }

    // Exibe a animação de carregamento
    document.getElementById("loading").style.display = "block";

    // Simula um tempo de carregamento antes de redirecionar
    setTimeout(() => {
        window.location.href = "visaogeral.html"; // Redireciona para a tela principal
    }, 2000); // 2 segundos de carregamento
}

// Função de esqueci minha senha
function esqueciSenha() {
    const email = prompt("Digite seu e-mail cadastrado:");

    if (!email) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    // Obter dados do LocalStorage
    let usuario = JSON.parse(localStorage.getItem(email));
    
    // Verificar se o e-mail existe
    if (!usuario) {
        alert("E-mail não encontrado. Por favor, verifique se está correto.");
        return;
    }

    // Gerar uma nova senha temporária
    const novaSenha = Math.random().toString(36).slice(-8); // Gera uma senha aleatória de 8 caracteres
    usuario.password = novaSenha; // Atualiza a senha do usuário

    // Atualizar o LocalStorage com a nova senha
    localStorage.setItem(email, JSON.stringify(usuario));

    // Exibir a nova senha ao usuário
    alert(`Sua nova senha temporária é: ${novaSenha}`);
}
