let pokemon = 'pikachu';
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados);
        })
        .catch(erro => {
            console.error('Erro', erro);
        });