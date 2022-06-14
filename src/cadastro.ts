//CADASTRO
let formCadastro = document.querySelector('#form-cadastro') as HTMLFormElement;
let inputEmailCadastro = document.querySelector('#input-email-cadastro') as HTMLInputElement;
let inputSenhaCadastro = document.querySelector('#input-senha-cadastro') as HTMLInputElement;
let inputSenhaCadastro2 = document.querySelector('#input-senha-cadastro2') as HTMLInputElement;


formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    let login = inputEmailCadastro.value;
    let senha = inputSenhaCadastro.value;
    let senha_verificar = inputSenhaCadastro2.value;

    let usuario = {
        login,
        senha,
        senha_verificar
    }

    if(login === "" || senha === "" || senha_verificar === ""){
        alert('Todos os campos precisam ser preenchidos')
    }else if(senha == senha_verificar){
        inserirUsuario(usuario);
        limparCamposCadastro();
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    }else{
        alert("Algo deu errado! Verifique se todos os campos estão preenchidos corretamente.")
    }});


function inserirUsuario(usuario){
    
    const banco_usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    banco_usuarios.push(usuario) 

    localStorage.setItem('usuarios', JSON.stringify(banco_usuarios));
}


function limparCamposCadastro(){
    inputEmailCadastro.value = "";
    inputSenhaCadastro.value = "";
    inputSenhaCadastro2.value = "";
}