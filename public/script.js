// Endereço da nossa API backend
// Todas as requisições (GET, POST, DELETE) irão para essa URL
const api = "http://localhost:3000/api/eventos";


// ===============================
// FUNÇÃO PARA CADASTRAR EVENTO
// ===============================
function cadastrarEvento() {

    // Captura os valores digitados nos inputs do HTML
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const local = document.getElementById("local").value;
    const descrição = document.getElementById("descrição").value;

    // Validação simples: impede envio com campo vazio
    if (!nome || !data || !local || !descrição) {
        alert("Preencha todos os campos!");
        return; // Interrompe a função
    }

    // Faz requisição HTTP para a API usando fetch
    fetch(api, {

        // Método HTTP usado para criar um novo registro
        method: "POST",

        // Cabeçalho informando que estamos enviando JSON
        headers: {
            "Content-Type": "application/json"
        },

        // Converte o objeto JavaScript em JSON
        body: JSON.stringify({ nome, data, local, descrição })
    })
    .then(res => res.json()) // Converte a resposta para JSON
    .then(() => {

        // Atualiza a lista de Eventos após cadastrar
        listarEventos();

        // Limpa os campos do formulário
        limparCampos();
    });
}



// ===============================
// FUNÇÃO PARA LISTAR EVENTOS
// ===============================
function listarEventos() {

    // Faz requisição GET para buscar todos os eventos
    fetch(api)
    .then(res => res.json()) // Converte resposta para JSON
    .then(eventos => {

        // Pega o elemento <tbody> da tabela
        const tabela = document.getElementById("tabelaEventos");

        // Limpa a tabela antes de preencher novamente
        tabela.innerHTML = "";

        // Para cada evento retornado do banco
        eventos.forEach(evento => {

            // Adiciona uma nova linha na tabela
            tabela.innerHTML += `
                <tr>
                    <td>${evento.id}</td>
                    <td>${evento.nome}</td>
                    <td>${evento.data}</td>
                    <td>${evento.data}</td>
                    <td>${evento.descrição}</td>
                    <td>
                        <button onclick="deletarAluno(${evento.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
    });
}



// ===============================
// FUNÇÃO PARA DELETAR EVENTO
// ===============================
function deletarEvento(id) {

    // Faz requisição DELETE passando o ID na URL
    fetch(`${api}/${id}`, {
        method: "DELETE"
    })
    .then(() => {

        // Após deletar, atualiza a lista novamente
        listarEvento();
    });
}



// ===============================
// FUNÇÃO PARA LIMPAR OS CAMPOS
// ===============================
function limparCampos() {

    // Define valor vazio para cada input
    document.getElementById("nome").value = "";
    document.getElementById("data").value = "";
    document.getElementById("local").value = "";
    document.getElementById("descrição").value = "";
}



// ===============================
// CARREGA A LISTA ASSIM QUE A PÁGINA ABRE
// ===============================

// Quando o navegador carregar a página,
// essa função será executada automaticamente
listarEventos();