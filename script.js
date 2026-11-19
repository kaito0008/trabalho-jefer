const WHATSAPP = "5500000000000";
let carrinho = [];

function irParaLoja() {
    document.getElementById("loja").scrollIntoView({ behavior: "smooth" });
}

function adicionar(nome, preco) {
    let item = carrinho.find(produto => produto.nome === nome);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    alert(nome + " adicionado ao carrinho!");
}

function atualizarCarrinho() {
    let itens = document.getElementById("itens");
    let total = 0;

    itens.innerHTML = "";

    if (carrinho.length === 0) {
        itens.innerHTML = "Seu carrinho está vazio.";
    }

    carrinho.forEach((produto, indice) => {
        let subtotal = produto.preco * produto.quantidade;
        total += subtotal;

        itens.innerHTML += `
            <div class="item-carrinho">
                <div>
                    <strong>${produto.nome}</strong><br>
                    Quantidade: ${produto.quantidade}<br>
                    Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}
                </div>
                <button onclick="remover(${indice})">Remover</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total.toFixed(2).replace(".", ",");
}

function remover(indice) {
    carrinho[indice].quantidade--;

    if (carrinho[indice].quantidade <= 0) {
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer um pedido na Grand Faro Pet:\n\n";
    let total = 0;

    carrinho.forEach(produto => {
        let subtotal = produto.preco * produto.quantidade;
        mensagem += produto.nome + " - Quantidade: " + produto.quantidade +
            " - R$ " + subtotal.toFixed(2) + "\n";
        total += subtotal;
    });

    mensagem += "\nTotal: R$ " + total.toFixed(2);
    abrirWhatsApp(mensagem);
}

function adotar(nome) {
    let mensagem = "Olá! Tenho interesse em conhecer e adotar o pet " + nome +
        ". Poderiam me passar mais informações?";
    abrirWhatsApp(mensagem);
}

function abrirWhatsApp(mensagem) {
    if (WHATSAPP === "5500000000000") {
        alert("Configure o número verdadeiro do WhatsApp no arquivo script.js.");
        return;
    }

    let link = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagem);
    window.open(link, "_blank");
}

function validarTelefone(telefone) {
    let numeros = telefone.replace(/\D/g, "");
    return numeros.length === 10 || numeros.length === 11;
}

function pegarDadosFormulario() {
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let assunto = document.getElementById("assunto").value;
    let texto = document.getElementById("texto").value.trim();

    if (!nome || !email || !telefone || !assunto || !texto) {
        alert("Preencha todos os campos antes de enviar!");
        return null;
    }

    if (!validarTelefone(telefone)) {
        alert("Digite um telefone válido com DDD.");
        return null;
    }

    return { nome, email, telefone, assunto, texto };
}

document.getElementById("formContato").addEventListener("submit", function(event) {
    event.preventDefault();

    let dados = pegarDadosFormulario();

    if (dados === null) {
        return;
    }

    let mensagem = "Nome: " + dados.nome +
        "\nE-mail: " + dados.email +
        "\nTelefone: " + dados.telefone +
        "\nAssunto: " + dados.assunto +
        "\nMensagem: " + dados.texto;

    let link = "mailto:contato@grandfaropet.com?subject=" +
        encodeURIComponent("Contato - " + dados.assunto) +
        "&body=" + encodeURIComponent(mensagem);

    document.getElementById("mensagem").innerText =
        "Seu aplicativo de e-mail será aberto para enviar a mensagem.";

    window.location.href = link;
});

function ouvidoriaWhatsApp() {
    let dados = pegarDadosFormulario();

    if (dados === null) {
        return;
    }

    let mensagem = "CONTATO GRAND FARO PET\n\n" +
        "Nome: " + dados.nome +
        "\nE-mail: " + dados.email +
        "\nTelefone: " + dados.telefone +
        "\nAssunto: " + dados.assunto +
        "\nMensagem: " + dados.texto;

    abrirWhatsApp(mensagem);
}

document.getElementById("pesquisa").addEventListener("input", function() {
    let pesquisa = this.value.toLowerCase();
    let produtos = document.querySelectorAll("#listaProdutos .produto");
    let encontrados = 0;

    produtos.forEach(produto => {
        let nome = produto.querySelector("h3").innerText.toLowerCase();

        if (nome.includes(pesquisa)) {
            produto.style.display = "block";
            encontrados++;
        } else {
            produto.style.display = "none";
        }
    });

    document.getElementById("semResultado").hidden = encontrados !== 0;
});

document.getElementById("menuBtn").addEventListener("click", function() {
    document.getElementById("menuLinks").classList.toggle("aberto");
});

let linksMenu = document.querySelectorAll(".menu-links a");

linksMenu.forEach(link => {
    link.addEventListener("click", function() {
        linksMenu.forEach(item => item.classList.remove("ativo"));
        this.classList.add("ativo");
        document.getElementById("menuLinks").classList.remove("aberto");
    });
});
