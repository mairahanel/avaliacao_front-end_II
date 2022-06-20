//LOGIN
let fazerLogin = document.querySelector('#logar') as HTMLButtonElement;
fazerLogin.addEventListener('click', (e) => {
    e.preventDefault();

    logar();
})


function logar(){
    let login = document.querySelector('#input-email-login') as HTMLInputElement;
    let senha = document.querySelector('#input-senha-login') as HTMLInputElement;

    let usuarios = [];

    usuarios = JSON.parse(localStorage.getItem("usuarios") || 'null');

    let usuarioValidar = {
        email: "",
        senha: ""
    }

    usuarios.forEach((elemento: any) => {
        if(elemento.login === login.value && elemento.senha === senha.value){
            usuarioValidar = {
                email: elemento.login,
                senha: elemento.senha
            }
        }

    });

    if(usuarioValidar.email === login.value && usuarioValidar.senha === senha.value){
        window.location.href = 'home.html';
        sessionStorage.setItem('logado', usuarioValidar.email);
    }else{
        alert("Login ou senha inválidos!")
    }

}