document.addEventListener("DOMContentLoaded", function() {
    // Carregar os itens salvos no localStorage ao carregar a página
    carregarItens();

    document.getElementById("tipoItem").addEventListener("change", function() {
        const isSerie = this.value === "serie";
        document.getElementById("temporada").style.display = isSerie ? "block" : "none";
        document.getElementById("episodio").style.display = isSerie ? "block" : "none";
    });
});

function adicionarItem() {
    const tipo = document.getElementById("tipoItem").value;
    const input = document.getElementById("novoItem");
    const texto = input.value.trim();
    if (texto === "") return;

    let detalhes = "";
    if (tipo === "serie") {
        const temporada = document.getElementById("temporada").value;
        const episodio = document.getElementById("episodio").value;
        detalhes = ` (T${temporada}E${episodio})`;
    }

    const lista = document.getElementById("lista");
    const li = document.createElement("li");
    li.innerHTML = ` 
        <span><strong>${texto}${detalhes}</strong></span>
        <button class="btn" onclick="mostrarComentario(this)">💬 Comentar</button>
        <input type="text" class="comentario" placeholder="Minuto pausado..." style="display: none;" oninput="salvarProgresso(this)">
        <button class="btn" onclick="marcarConcluido(this)">✅</button>
        <button class="btn" onclick="removerItem(this)">🗑️</button>
    `;
    lista.appendChild(li);
    input.value = "";
    document.getElementById("temporada").value = "";
    document.getElementById("episodio").value = "";

    salvarItens();
}

function mostrarComentario(botao) {
    // Alternar a visibilidade do campo de comentário
    const inputComentario = botao.parentElement.querySelector(".comentario");
    inputComentario.style.display = inputComentario.style.display === "none" ? "block" : "none";
}

function marcarConcluido(botao) {
    const item = botao.parentElement;
    item.classList.toggle("completed");
    salvarItens();
}

function removerItem(botao) {
    const item = botao.parentElement;
    item.remove();
    salvarItens();
}

function salvarProgresso(input) {
    const itemText = input.previousElementSibling.previousElementSibling.textContent.trim();
    localStorage.setItem(itemText, input.value);
}

function salvarItens() {
    const lista = document.getElementById("lista");
    const itens = [];
    lista.querySelectorAll("li").forEach(item => {
        const texto = item.querySelector("strong").textContent;
        const comentario = item.querySelector(".comentario").value;
        const concluido = item.classList.contains("completed");
        itens.push({ texto, comentario, concluido });
    });
    localStorage.setItem("itens", JSON.stringify(itens));
}

function carregarItens() {
    const itensSalvos = JSON.parse(localStorage.getItem("itens")) || [];
    const lista = document.getElementById("lista");
    itensSalvos.forEach(item => {
        const li = document.createElement("li");
        li.classList.toggle("completed", item.concluido);
        li.innerHTML = ` 
            <span><strong>${item.texto}</strong></span>
            <button class="btn" onclick="mostrarComentario(this)">💬 Comentar</button>
            <input type="text" class="comentario" value="${item.comentario}" style="display: none;" oninput="salvarProgresso(this)">
            <button class="btn" onclick="marcarConcluido(this)">✅</button>
            <button class="btn" onclick="removerItem(this)">🗑️</button>
        `;
        lista.appendChild(li);
    });
}
