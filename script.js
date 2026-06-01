const telas =
document.querySelectorAll('.tela');

const inventarioUI =
document.getElementById('inventario');

const hotspots =
document.getElementById('hotspots');

const imagemCena =
document.getElementById('imagemCena');

const descricaoCena =
document.getElementById('descricaoCena');

const muralConteudo =
document.getElementById('muralConteudo');

let inventario = [];

/* =========================
CENAS
========================= */

const cenas = {

hall:{
imagem:'hall.jpg',

descricao:
'O hall principal da mansão está silencioso. A chuva ecoa pelas janelas.',

pistas:[
{
nome:'Pegadas molhadas',
x:60,
y:70
}
]
},

jantar:{
imagem:'sala-jantar.jpg',

descricao:
'A vítima foi encontrada caída próxima à mesa principal.',

pistas:[
{
nome:'Taça com resíduos químicos',
x:45,
y:62
},

{
nome:'Guardanapo queimado',
x:70,
y:40
}
]
},

salaestar:{
imagem:'sala-estar.jpg',

descricao:
'A sala ainda mantém sinais da reunião antes do jantar.',

pistas:[
{
nome:'Copo quebrado',
x:35,
y:60
}
]
},

escritorio:{
imagem:'escritorio.jpg',

descricao:
'Documentos financeiros estão espalhados pela mesa.',

pistas:[
{
nome:'Seguro milionário',
x:30,
y:55
},

{
nome:'Contrato adulterado',
x:75,
y:50
}
]
},

cozinha:{
imagem:'cozinha.jpg',

descricao:
'Utensílios ainda estão molhados após o jantar.',

pistas:[
{
nome:'Frasco de cianeto',
x:50,
y:35
}
]
},

banheiro:{
imagem:'banheiro.jpg',

descricao:
'Respingos de água indicam que alguém esteve aqui após o crime.',

pistas:[
{
nome:'Toalha manchada',
x:60,
y:45
}
]
},

jardim:{
imagem:'jardim.jpg',

descricao:
'A tempestade apagou parte das evidências externas.',

pistas:[
{
nome:'Bituca de cigarro',
x:40,
y:70
}
]
},

suite:{
imagem:'suite.jpg',

descricao:
'A suíte da vítima parece ter sido revistada.',

pistas:[
{
nome:'Receita médica rasgada',
x:50,
y:60
}
]
},

quartolucas:{
imagem:'quarto-lucas.jpg',

descricao:
'O quarto de Lucas demonstra sinais de conflito emocional.',

pistas:[
{
nome:'Carta de ameaça',
x:70,
y:55
}
]
},

hospedes:{
imagem:'quarto-hospedes.jpg',

descricao:
'O quarto de hóspedes parece abandonado há dias.',

pistas:[
{
nome:'Mala parcialmente aberta',
x:55,
y:65
}
]
}

};

/* =========================
DIÁLOGOS
========================= */

const dialogos = {

helena:
'Ricardo vinha escondendo problemas financeiros. Tivemos uma discussão séria antes do jantar.',

lucas:
'Meu pai queria me tirar da herança. Mas eu não o mataria.',

marcelo:
'Ricardo devia muito dinheiro. Pessoas perigosas estavam atrás dele.',

marta:
'Ouvi passos perto da cozinha pouco antes da queda de energia.'

};

/* =========================
TOCAR SOM
========================= */

function tocar(id){

const audio =
document.getElementById(id);

if(audio){

audio.currentTime = 0;

audio.play();

}

}

/* =========================
MOSTRAR TELA
========================= */

function mostrarTela(id){

for(let tela of telas){

tela.classList.remove('ativa');

}

document
.getElementById(id)
.classList.add('ativa');

}

/* =========================
INICIAR JOGO
========================= */

function iniciarJogo(){

mostrarTela('jogo');

/* PARA MÚSICA MENU */

const menu =
document.getElementById('musicaMenu');

menu.pause();

/* TOCA INVESTIGAÇÃO */

document
.getElementById('musicaInvestigacao')
.play();

/* SOM CHUVA */

document
.getElementById('somChuva')
.play();

/* PRIMEIRA CENA */

abrirCena('hall');

}

/* =========================
ABRIR CENA
========================= */

function abrirCena(nomeCena){

mostrarTela('jogo');

const cena =
cenas[nomeCena];

imagemCena.src =
'imagens/' + cena.imagem;

descricaoCena.innerHTML =
cena.descricao;

/* LIMPA HOTSPOTS */

hotspots.innerHTML = '';

/* CRIA HOTSPOTS */

cena.pistas.forEach((pista)=>{

const div =
document.createElement('div');

div.classList.add('hotspot');

div.style.left =
pista.x + '%';

div.style.top =
pista.y + '%';

/* CLIQUE */

div.onclick = ()=>{

coletarPista(pista.nome);

};

hotspots.appendChild(div);

});

}

/* =========================
COLETAR PISTA
========================= */

function coletarPista(nome){

if(!inventario.includes(nome)){

inventario.push(nome);

atualizarInventario();

atualizarMural();

tocar('somDescoberta');

alert(
'Nova evidência encontrada:\n\n' + nome
);

}else{

alert(
'Essa evidência já foi coletada.'
);

}

}

/* =========================
ATUALIZA INVENTÁRIO
========================= */

function atualizarInventario(){

inventarioUI.innerHTML = '';

inventario.forEach((item)=>{

const li =
document.createElement('li');

li.textContent = item;

inventarioUI.appendChild(li);

});

}

/* =========================
INTERROGATÓRIOS
========================= */

function abrirInterrogatorios(){

mostrarTela('interrogatorios');

tocar('somRadio');

}

function interrogar(nome){

const caixa =
document.getElementById('caixaDialogo');

tocar('somPapel');

caixa.innerHTML =

`
<strong>

${nome.toUpperCase()}

</strong>

<br><br>

${dialogos[nome]}
`;

}

/* =========================
MURAL
========================= */

function abrirMural(){

mostrarTela('mural');

tocar('somAlfinete');

}

function atualizarMural(){

muralConteudo.innerHTML = '';

inventario.forEach((pista)=>{

const card =
document.createElement('div');

card.classList.add('cardMural');

card.innerHTML =

`
<h3>${pista}</h3>

<p>

Evidência adicionada ao mural investigativo.

</p>
`;

muralConteudo.appendChild(card);

});

}

/* =========================
LABORATÓRIO
========================= */

function abrirLaboratorio(){

mostrarTela('laboratorioTela');

tocar('somLaboratorio');

}

/* =========================
ACUSAÇÃO FINAL
========================= */

function abrirAcusacao(){

mostrarTela('acusacao');

tocar('somBatimentos');

}

function confirmarAcusacao(){

const assassino =
document.getElementById('assassino').value;

const causa =
document.getElementById('causa').value;

const motivacao =
document.getElementById('motivacao').value;

const resultado =
document.getElementById('resultadoFinal');

if(

assassino === 'Helena' &&

causa === 'Envenenamento' &&

motivacao === 'Seguro milionário'

){

resultado.innerHTML =

`
<h3>CASO RESOLVIDO</h3>

<p>

Helena Almeida assassinou Ricardo
utilizando cianeto durante o jantar.

</p>

<p>

Motivação:
receber o seguro milionário.

</p>
`;

tocar('somFinal');

}else{

resultado.innerHTML =

`
<h3>INVESTIGAÇÃO INCORRETA</h3>

<p>

As evidências não sustentam essa acusação.

</p>

<p>

O verdadeiro assassino continua livre.

</p>
`;

}

}

/* =========================
VOLTAR
========================= */

function voltarJogo(){

mostrarTela('jogo');

}

/* =========================
INÍCIO
========================= */

window.onload = ()=>{

console.log(
'CSI - LUMLN iniciado'
);

};