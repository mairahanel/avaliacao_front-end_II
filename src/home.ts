// MENU DE RECADOS
let formulario = document.querySelector('#form-recados') as HTMLFormElement;
let inputId = document.querySelector('.input-id') as HTMLInputElement;
let inputDescricao = document.querySelector('.input-descricao') as HTMLInputElement;
let inputDetalhamento = document.querySelector('.input-detalhamento') as HTMLInputElement;

let botaoCancelar = document.querySelector('#button-cancelar') as HTMLButtonElement;
let botaoAtualizar = document.querySelector('#button-atualizar') as HTMLButtonElement;
let botaoSalvar = document.querySelector('#button-salvar') as HTMLButtonElement;

let tabelaRegistros = document.querySelector('#tabela-registros') as HTMLTableElement;


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    salvar();
})


document.addEventListener('DOMContentLoaded', pegarDadosStorage);
botaoCancelar.addEventListener('click', cancelarEdicao);

interface Recado {
    registroId: string,
    descricao: string,
    detalhamento: string
}


function salvar(){
    let listaRecados = JSON.parse(localStorage.getItem('meus_recados') || 'null') || [];

    let registroId = inputId.value;

    let existe = listaRecados.some((recado: any) => recado.registroId == registroId)
    
    if(existe){
        alert("Já existe um recado cadastrado com esse registro ID!");
        inputId.value = '';
        inputId.focus();

        return
    }


    let descricao = inputDescricao.value;
    let detalhamento = inputDetalhamento.value;

    let recado = {
        registroId,
        descricao,
        detalhamento
    }

    if(registroId === "" || descricao === "" || detalhamento === ""){
        alert("Para inserir o recado, todos os campos devem estar preenchidos");

        return
    }


    listaRecados.push(recado);

    salvarNaTabela(recado);
    limparCamposHome();
    salvarNoLocalStorage(listaRecados);
}


function salvarNoLocalStorage(listaRecados: Recado){
    localStorage.setItem('meus_recados', JSON.stringify
    (listaRecados));
}


function salvarNaTabela(dadosRecado: Recado){
    let novaLinha = document.createElement('tr');
    let colunaId = document.createElement('td');
    let colunaDescricao = document.createElement('td');
    let colunaDetalhamento = document.createElement('td');
    let colunaAcoes = document.createElement('td');


    novaLinha.setAttribute('class', 'registros');
    novaLinha.setAttribute('id', dadosRecado.registroId);
    colunaId.innerHTML = dadosRecado.registroId;
    colunaDescricao.innerHTML = dadosRecado.descricao;
    colunaDetalhamento.innerHTML = dadosRecado.detalhamento;
    colunaAcoes.innerHTML = `
                                <button class="button-editar btn btn-outline-primary" onclick="prepararEdicao(${dadosRecado.registroId})">Editar</button>
                                <button class="button-apagar btn btn-outline-danger" onclick="apagarRecado(${dadosRecado.registroId})">Apagar</button>

                            `

    novaLinha.appendChild(colunaId);
    novaLinha.appendChild(colunaDescricao);
    novaLinha.appendChild(colunaDetalhamento);
    novaLinha.appendChild(colunaAcoes);
    
    tabelaRegistros.appendChild(novaLinha);
}


function limparCamposHome(){
    inputId.value = "";
    inputDescricao.value = "";
    inputDetalhamento.value = "";
}


function pegarDadosStorage(){

    let dadosStorage = JSON.parse(localStorage.getItem('meus_recados') || 'null');

    if(dadosStorage){
        for(let recado of dadosStorage){
            salvarNaTabela(recado);
        }
    }

    return
}


//BOTÕES DE EDITAR E APAGAR RECADO 

function cancelarEdicao(){
    limparCamposHome();
    botaoSalvar.setAttribute('style', 'display: inline-block');
    botaoAtualizar.setAttribute('style', 'display: none');
    botaoCancelar.setAttribute('style', 'display: none');
    inputId.removeAttribute('readonly');
}


function atualizarRecado(registroId: Recado){

    let novoId = inputId.value;
    let novaDescricao = inputDescricao.value;
    let novoDetalhamento = inputDetalhamento.value;

    let recadoAtualizado = {
        registroId: novoId,
        descricao: novaDescricao,
        detalhamento: novoDetalhamento
    }

    let listaRecados = JSON.parse(localStorage.getItem('meus_recados') || 'null');
    let indiceEncontrado = listaRecados.findIndex((recado: any) => recado.registroId == registroId);

    listaRecados[indiceEncontrado] = recadoAtualizado;

    let linhasTabela: any = document.querySelectorAll('.registros');
    
    for(let linha of linhasTabela){
        if(linha.id == registroId){
            let colunas = linha.children;

            colunas[0].innerText = recadoAtualizado.registroId;
            colunas[1].innerText = recadoAtualizado.descricao;
            colunas[2].innerText = recadoAtualizado.detalhamento;
        }
    }

    localStorage.clear();
    salvarNoLocalStorage(listaRecados);
    cancelarEdicao();

}


function prepararEdicao(registroId: Recado){
    botaoSalvar.setAttribute('style', 'display: none');
    botaoAtualizar.setAttribute('onclick', `atualizarRecado(${registroId})`);
    botaoAtualizar.setAttribute('style', 'display: inline-block');
    botaoCancelar.setAttribute('style', 'display: inline-block');

    let listaRecados = JSON.parse(localStorage.getItem('meus_recados') || 'null');
    let recadoEncontrado = listaRecados.find((recado: any) => recado.registroId == registroId);

    inputId.value = recadoEncontrado.registroId;
    inputDescricao.value = recadoEncontrado.descricao;
    inputDetalhamento.value = recadoEncontrado.detalhamento;
    inputId.setAttribute('readonly', 'true');
}


function apagarRecado(registroId: Recado){
    
    let listaRecados = JSON.parse(localStorage.getItem('meus_recados') || 'null');
    let indiceEncontrado = listaRecados.findIndex((recado: any) => recado.registroId == registroId);

    let confirma = window.confirm(`Tem certeza que deseja remover o recado ${registroId}?`);

    if(confirma){

        let linhasTabela: any = document.querySelectorAll('.registros');

        for(let linha of linhasTabela){
            if(linha.id == registroId){
                console.log(linha);
                tabelaRegistros.removeChild(linha);
                listaRecados.splice(indiceEncontrado, 1);
                alert("Recado removido!");
            }
        }

        localStorage.clear();
        salvarNoLocalStorage(listaRecados);
    }else{
        return
    }
}


//VERIFICANDO SE A PESSOA ESTÁ LOGADA

let sessao = sessionStorage.getItem('logado');

let logout = document.querySelector('#sair') as HTMLInputElement;
logout.addEventListener('click', () => {
    sair();
})


function sair(){
    sessionStorage.removeItem('logado');
    window.location.href = 'login.html';
}

logadoNaHome();


function logadoNaHome(){
    if(sessao){
        sessionStorage.setItem('logado', sessao);
    }

    if(!sessao){
        window.location.href = 'login.html';
    }
}