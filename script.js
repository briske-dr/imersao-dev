let cardContainer = document.querySelector(".card-container");
let searchInput = document.querySelector("#search-input");
let dados = [];

async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        return;
        }
    }
    
    const termoBuscado = searchInput.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBuscado) || 
        dado.descricao.toLowerCase().includes(termoBuscado));
        
    renderizarCards(dadosFiltrados);
}


function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar os novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano:</strong> ${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <h4>#${dado.tags.join(", #")} </h4>
            <a href="${dado.link}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}