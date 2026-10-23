let pokemon = 'pikachu';
const campo_nome = document.querySelector('#nome')
const campo_tipo = document.querySelector('#tipo')
const busca = document.querySelector('#busca')

function BuscarPokemon(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados);

            let nome = dados.name

            campo_nome.innertext = nome
            
        })
        .catch(erro => {
            console.error('Erro', erro);
        });

}

addEventListener('input' , BuscarPokemon(busca.value))