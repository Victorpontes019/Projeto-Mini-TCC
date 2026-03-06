const api = "http://localhost:3000/api/eventos";

let idEditando = null;


// FORMATAR DATA (remove horário)
function formatarData(data) {

    if (!data) return "";

    const dataSemHora = data.split("T")[0];
    const partes = dataSemHora.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}



// CADASTRAR OU ATUALIZAR EVENTO
function cadastrarEvento() {

    const nome = document.getElementById("nome").value;
    const data_evento = document.getElementById("data_evento").value;
    const local = document.getElementById("local").value;
    const descricao = document.getElementById("descricao").value;

    if (!nome || !data_evento || !local || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const metodo = idEditando ? "PUT" : "POST";
    const url = idEditando ? `${api}/${idEditando}` : api;

    fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            data_evento,
            local,
            descricao
        })
    })
    .then(res => res.json())
    .then(() => {

        listarEventos();
        limparCampos();

        idEditando = null;

        document.getElementById("btnSalvar").innerText = "Cadastrar";

    });

}



// LISTAR EVENTOS
function listarEventos() {

    fetch(api)
    .then(res => res.json())
    .then(eventos => {

        const tabela = document.getElementById("tabelaEventos");

        tabela.innerHTML = "";

        eventos.forEach(evento => {

            tabela.innerHTML += `
            <tr>
                <td>${evento.id}</td>
                <td>${evento.nome}</td>
                <td>${formatarData(evento.data_evento)}</td>
                <td>${evento.local}</td>
                <td>${evento.descricao}</td>
                <td>
                    <button onclick="deletarEvento(${evento.id})">
                        Excluir
                    </button>

                    <button class="editar" onclick='editarEvento(${JSON.stringify(evento)})'>
                        Editar
                    </button>
                </td>
            </tr>
            `;

        });

    });

}



// EDITAR EVENTO
function editarEvento(evento) {

    document.getElementById("nome").value = evento.nome;
    document.getElementById("data_evento").value = evento.data_evento.split("T")[0];
    document.getElementById("local").value = evento.local;
    document.getElementById("descricao").value = evento.descricao;

    idEditando = evento.id;

    document.getElementById("btnSalvar").innerText = "Atualizar";

}



// DELETAR EVENTO
function deletarEvento(id) {

    fetch(`${api}/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        listarEventos();
    });

}



// LIMPAR CAMPOS
function limparCampos() {

    document.getElementById("nome").value = "";
    document.getElementById("data_evento").value = "";
    document.getElementById("local").value = "";
    document.getElementById("descricao").value = "";

}



// CARREGAR EVENTOS
listarEventos();