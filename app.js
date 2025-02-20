let listaDeSorteios = [];
let valorMaximo = 100;
let numeroSecreto = gerarUmNumeroAleatorio();
let tentativas = 1;

//let titulo = document.querySelector ('h1');
//titulo.innerHTML = 'The secret game';
//let paragrafo = document.querySelector ('p');
//paragrafo.innerHTML = `Escolha um número entre 1 e 100! `;

// função exibirTextoNaTela criado para facilitar/abreviar codigo.

// função antiga funciona no computador porém não funciona no celular. 
//function exibirTextoNaTela(tag, texto){
//    let campo = document.querySelector (tag);
//    campo.innerHTML = texto;
//    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});}

//função corrigida para funcionar audio no celular.

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(texto);
    campo.innerHTML = texto;
    utterThis.rate = 1.5;  // Ajuste a velocidade da fala
    synth.speak(utterThis);
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

//função para mostrar a mensagem ao abrir o jogo.
function exibirMensagemInicial() {
    exibirTextoNaTela('h1',`O número secreto`);
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${valorMaximo}!`);
}

exibirMensagemInicial();

// Função para verificar se o numero é maior/menor ou se acertou o numero e dar dica ao jogador.
function verificarChute() {
    let escolha = document.querySelector ('input').value;
    if(escolha == numeroSecreto ){
        exibirTextoNaTela('h1',`Parabéns!`);
        let palvraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas =  `Você descobriu o numero secreto com ${tentativas} ${palvraTentativas}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        if(escolha > numeroSecreto){
            exibirTextoNaTela('p',`O numero secreto é menor!`);
        } else { 
            exibirTextoNaTela('p',`O numero secreto é maior`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarUmNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * valorMaximo + 1);
    let tamanhoDaLista = listaDeSorteios.length;
    if(tamanhoDaLista == valorMaximo){
        listaDeSorteios = [];
    }
    if (listaDeSorteios.includes(numeroEscolhido)){
       return gerarUmNumeroAleatorio();
    }else{
        listaDeSorteios.push(numeroEscolhido);
        return numeroEscolhido;
    }
    
}
console.log (numeroSecreto);

function limparCampo(){
    escolha = document.querySelector ('input');
    escolha.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarUmNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

