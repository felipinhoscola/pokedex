const pokeName = document.querySelector('.pokemon_name');
const pokeId = document.querySelector('.pokemon_number');
const pokeImg = document.querySelector('.pokemon_img');
const pokeType = document.querySelector('.elements-list')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let sPoke = 1;

const searchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
    }    
}

const renderPoke = async (pokemon) => {
    pokeName.innerHTML = 'Procurando...'
    pokeId.innerHTML = "";
    const data = await searchPokemon(pokemon)

    if(data){
        pokeImg.style.display = 'block'
        pokeName.innerHTML = data.name;
        pokeId.innerHTML = data.id;
        pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        pokeType.innerHTML = data['types']['0']['type']['name']

        sPoke = data.id
    } else {
        pokeImg.style.display = 'none'
        pokeName.innerHTML = "Não encontrado :C"
        pokeId.innerHTML = "";
    }
    
}

form.addEventListener('submit', (event) =>{
event.preventDefault();
renderPoke(input.value.toLowerCase());
})
btnPrev.addEventListener('click', () => {
    if (sPoke > 1){
        sPoke -= 1
        renderPoke(sPoke)
    }
})
btnNext.addEventListener('click', () => {
    sPoke += 1
    renderPoke(sPoke)
})

renderPoke(sPoke);
