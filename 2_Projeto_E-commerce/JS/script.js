const botoes = document.querySelectorAll(".btn-carrinho");
const contador = document.getElementById("contador-carrinho");
const mensagem = document.getElementById("mensagem");
const total = document.getElementById("total");
const limparCarrinhoBtn = document.getElementById("limpar-carrinho");

const pesquisa = document.getElementById("pesquisa");
const produtos = document.querySelectorAll(".produto");

const categorias = document.querySelectorAll('.catego');

// btn-favorito coraçaozinho
const contadorFavoritos = document.getElementById("contador-favoritos");
const botoesFavoritos = document.querySelectorAll(".btn-favorito");
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

//secao modal janela para abrir
const abrirModal = document.getElementById("abrir-modal");
const modal = document.getElementById("modal-carrinho");
const fecharModal = document.getElementById("fechar-modal");

const listaCarrinhoModal = document.getElementById("lista-carrinho-modal");
const totalModal = document.getElementById("total-modal");

// btn finalizar compra
const finalizarCompra = document.getElementById("finalizar-compra");
const mensagemCompra = document.getElementById("mensagem-compra");


//  modal janela abrir
const abrirFavoritos = document.getElementById("abrir-favoritos");
const modalFavoritos = document.getElementById("modal-favoritos");
const fecharFavoritos = document.getElementById("fechar-favoritos");
const listaFavoritos = document.getElementById("lista-favoritos");


// input email e inscreve-se
const btnInscrever = document.getElementById("btn-inscrever");
const inputEmail = document.getElementById("email");
const mensagemEmail = document.getElementById("mensagem-email");



pesquisa.addEventListener("input", () => {
    const valorPesquisa = pesquisa.value.toLowerCase();
    produtos.forEach(produto => {
        const nomeProduto = produto.querySelector("h3").textContent.toLocaleLowerCase();
        if (nomeProduto.includes(valorPesquisa)) {
            produto.parentElement.style.display = "block";
            produto.parentElement.style.margin = "0 auto";

        } else {
            produto.parentElement.style.display = "none";
        }
    });
});

/*filtras categorias*/
categorias.forEach(categoria => {
    categoria.addEventListener('click', () => {
        const filtro = categoria.dataset.filtro;
        produtos.forEach(produto => {

            if (produto.dataset.categoria === filtro) {
                produto.style.display = "block";
                produto.style.margin = "0 auto";

            } else {
                produto.style.display = "none";
            }
        })
    })
})


//secao carrinho
const listaCarrinho = document.getElementById("lista-carrinho");


console.log("Quantidade:", botoes.length);


//secao carrinho
let carrinho = (
    JSON.parse(localStorage.getItem("carrinho")) || []
)

let quantidade = carrinho.length;


botoes.forEach(botao => {
    botao.addEventListener('click', () => {

        // mensagem.textContent =
        //     "Produto adicionado com sucesso!";
        mensagem.textContent =
            "✅ Produto adicionado com sucesso!";

        setTimeout(() => {

            mensagem.textContent = "";

        }, 3000);
        quantidade++;

        contador.textContent = quantidade;
        const produto = {

            nome:
                botao.dataset.produto,

            preco:
                Number(botao.dataset.preco)

        };

        carrinho.push(produto)
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarCarrinho();

    });
});



//secao-carrinho

function atualizarCarrinho() {

    listaCarrinho.innerHTML = "";
    let soma = 0;

    carrinho.forEach((produto, index) => {
        soma += produto.preco;

        listaCarrinho.innerHTML += `
            <li>
               <span class="nome-produto">
                    ${produto.nome}
                </span>

                <span class="preco-produto">
                    R$ ${produto.preco}
                </span>

                <button
                class="btn-remover"
                onclick="removerProduto(${index})">

                    ❌
                </button>

                <button class="btn-remover" onclick="editarProduto(${index})">

                    Editar

                </button>

            </li>
        `;
    });
    total.textContent =
        `Total: ${soma.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}`;

}

function removerProduto(index) {
    carrinho.splice(index, 1);
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );
    quantidade--;
    contador.textContent = quantidade;
    atualizarCarrinho();
}


function editarProduto(index) {

    const novoProduto = prompt("Digite o novo nome do produto:", carrinho[index].nome);
    if (novoProduto !== null && novoProduto.trim() !== "") {
        carrinho[index].nome = novoProduto;

        atualizarCarrinho();
    }

}

limparCarrinhoBtn.addEventListener("click", () => {
    carrinho = [];
    quantidade = 0;
    contador.textContent = 0;
    localStorage.removeItem("carrinho");
    atualizarCarrinho();
});


// secao btn-favoritos os coraçaõzinho
botoesFavoritos.forEach(botao => {
    botao.addEventListener('click', () => {
        botao.classList.toggle("favoritado");

        if (botao.classList.contains("favoritado")) {

            botao.textContent = "🤍";

        } else {

            botao.textContent = "❤️";

        }

        const produto = botao.dataset.produto;
        if (!favoritos.includes(produto)) {

            favoritos.push(produto);

            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );

            contadorFavoritos.textContent =
                favoritos.length + " Itens!";

        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        contadorFavoritos.textContent = favoritos.length + "  Itens!";


    })
})


//secao modal janela para abrir
abrirModal.addEventListener("click", (evento) => {
    evento.preventDefault();
    atualizarModal();

    modal.style.display = "flex";
});

fecharModal.addEventListener("click", (evento) => {
    evento.preventDefault();
    modal.style.display = "none";
})

function atualizarModal() {

    listaCarrinhoModal.innerHTML = "";

    let soma = 0;

    carrinho.forEach((produto) => {

        soma += produto.preco;

        listaCarrinhoModal.innerHTML += `
            <li>
                ${produto.nome} -
                ${produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}
            </li>
        `;

    });

    totalModal.textContent =
        `Total: ${soma.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}`;
}


// btn finalizar compra
finalizarCompra.addEventListener("click", () => {
    if (carrinho.length === 0) {
        mensagemCompra.textContent =
            "❌ Seu carrinho está vazio.";

        return;
    }
    mensagemCompra.textContent =
        "✅ Compra realizada com sucesso!";

    setTimeout(() => {

        carrinho = [];

        quantidade = 0;

        contador.textContent = 0;

        atualizarCarrinho();

        atualizarModal();

        mensagemCompra.textContent = "";

        localStorage.removeItem("carrinho");

        modal.style.display = "none";



    }, 1500);

})


//  modal janela abrir
function atualizarFavoritosModal() {
    listaFavoritos.innerHTML = "";
    favoritos.forEach((produto, index) => {
        listaFavoritos.innerHTML +=
            `
            <li>
                ❤️ ${produto}

                <button
                    class="btn-remover-favorito"
                    onclick="removerFavorito(${index})">
                    ❌
                </button>
            </li>

            

        `
    })

}

abrirFavoritos.addEventListener("click", (evento) => {

    evento.preventDefault();
    atualizarFavoritosModal();

    modalFavoritos.style.display = "flex";
});

fecharFavoritos.addEventListener("click", (evento) => {
    evento.preventDefault();
    modalFavoritos.style.display = "none";
});


function removerFavorito(index) {

    favoritos.splice(index, 1);

    contadorFavoritos.textContent =
        favoritos.length + " Itens!";

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    atualizarFavoritosModal();

}

// mensagem de email e inscrev-se com sucesso
btnInscrever.addEventListener("click", () => {

    if (inputEmail.value === "") {

        mensagemEmail.textContent =
            "❌ Digite um e-mail válido.";

        return;
    }

    mensagemEmail.textContent =
        "✅ E-mail cadastrado com sucesso!";

    setTimeout(() => {

        mensagemEmail.textContent = "";

    }, 3000);

});








