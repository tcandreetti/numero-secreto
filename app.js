function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag)
        campo.innerHTML = texto;
        if ('speechSynthesis' in window) {
            let voices = speechSynthesis.getVoices();
            let utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR'; 
            utterance.rate = 3.0; 
            utterance.voice = voices[1]
            window.speechSynthesis.speak(utterance); 
        } else {
            console.log("Web Speech API não suportada neste navegador.");
        }
}

function reiniciarJogo() {
            numeroSecreto = gerarNumeroAleatorio();
            limparCampo();
            tentativas = 1;
            exibirMensagemInicial();
            document.getElementById('reiniciar').setAttribute('disabled', true);
        }

let numeroLimite = 10
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosnaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosnaLista == numeroLimite) { 
        listaDeNumerosSorteados = [];
        return gerarNumeroAleatorio();
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    document.querySelector('input').value = '';
}
let listaDeNumerosSorteados = [];
let tentativas = 1
let numeroSecreto = gerarNumeroAleatorio();
//let numeroSecreto = 6

function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');}
    else{
        if(chute>numeroSecreto){
            exibirTextoNaTela('h1','Errou!');
            exibirTextoNaTela('p','Tente um número menor!');
        }
        else{
            exibirTextoNaTela('h1','Errou!');
            exibirTextoNaTela('p','Tente um número maior!');
        }
    }
    tentativas = tentativas+1
    limparCampo();
    
}