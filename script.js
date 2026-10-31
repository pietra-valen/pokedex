
/**
 ELEMENTOS HTML
 */
const formulario = document.querySelector("#busca");
const campoPokemon = document.querySelector("#pokemonNome");
const resultado = document.querySelector("#resultado");

/**
 Buscando o pokemon
 */

async function buscarPokemon(nome) {

    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    if (!resposta.ok) {
        throw new Error("Pokemon não encontrado");
    }

    const dados = await resposta.json();

    return dados;
}

/**
    Fazer a carta
 */
function mostrarPokemon(pokemon) {

    /**
     Pega o tipo principal do pokemon
    */
    let tipo = pokemon.types[0].type.name;

    /**
     Pegando os tipos do pokemon
     */
    let tipos = "";

    for (let i = 0; i < pokemon.types.length; i++) {
        tipos += `<span>${pokemon.types[i].type.name}</span> `;
    }


    /**
     Pegando os atributos
     */
    let atributos = "";

    for (let i = 0; i < pokemon.stats.length; i++) {

        let nomeAtributo = pokemon.stats[i].stat.name;
        let valor = pokemon.stats[i].base_stat;

        atributos += `<p>${nomeAtributo}: ${valor}</p>`;
    }

    /**
     Deixa a primeira letra maiuscula
     */
    let nome = pokemon.name;
    nome = nome.charAt(0).toUpperCase() + nome.slice(1);

    /**
     Pegando a imagem
     */
    let imagem = pokemon.sprites.other["official-artwork"].front_default;

    
    /**
     Cria a carta
     */
    resultado.innerHTML = `
        <div class="cartinha tipo-${tipo}">

            <h2>#${pokemon.id} - ${nome}</h2>

            <img src="${imagem}" alt="${nome}">

            <h3>Tipos</h3>
            <div>${tipos}</div>

            <p>Altura: ${pokemon.height / 10} metros</p>
            <p>Peso: ${pokemon.weight / 10} kg</p>

            <h3>Atributos</h3>
            <div>${atributos}</div>

        </div>
    `;
}

  /**
     Event listener para quando o formulario for enviado
     */

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    let nome = campoPokemon.value.trim().toLowerCase();

    
      /**
     ver se a resposta esta vazia
     */
    if (nome == "") {
        resultado.innerHTML = "<p>Digite o nome de um Pokémon!</p>";
        return;
    }

    resultado.innerHTML = "<p>Carregando...</p>";

      /**
     Busca o pokemon e checa se ele existe
     */
    try {

        let pokemon = await buscarPokemon(nome);

        mostrarPokemon(pokemon);

    } catch (erro) {

        resultado.innerHTML = "<p>Pokémon não encontrado!</p>";

    }

});
