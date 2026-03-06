const api = "http://localhost:3000/api/eventos";


// CADASTRAR EVENTO
function cadastrarEvento(){

const nome = document.getElementById("nome").value;
const data_evento = document.getElementById("data_evento").value;
const local = document.getElementById("local").value;
const descricao = document.getElementById("descricao").value;

if(!nome || !data_evento || !local || !descricao){
alert("Preencha todos os campos!");
return;
}

fetch(api,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
nome:nome,
data_evento:data_evento,
local:local,
descricao:descricao
})
})
.then(res=>res.json())
.then(()=>{

listarEventos();
limparCampos();

});

}



// LISTAR EVENTOS
function listarEventos(){

fetch(api)
.then(res=>res.json())
.then(eventos=>{

const tabela = document.getElementById("tabelaEventos");

tabela.innerHTML="";

eventos.forEach(evento => {

tabela.innerHTML += `
<tr>
<td>${evento.id}</td>
<td>${evento.nome}</td>
<td>${evento.data_evento}</td>
<td>${evento.local}</td>
<td>${evento.descricao}</td>

<td>
<button onclick="deletarEvento(${evento.id})">
Excluir
</button>
</td>

</tr>
`;

});

});

}



// DELETAR EVENTO
function deletarEvento(id){

fetch(`${api}/${id}`,{
method:"DELETE"
})
.then(()=>{
listarEventos();
});

}



// LIMPAR CAMPOS
function limparCampos(){

document.getElementById("nome").value="";
document.getElementById("data_evento").value="";
document.getElementById("local").value="";
document.getElementById("descricao").value="";

}



// CARREGAR EVENTOS AO ABRIR
listarEventos();