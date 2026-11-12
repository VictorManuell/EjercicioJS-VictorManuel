let listPokemon= null;

const inputSearch = document.getElementById('idPokemon')
const card = document.getElementById('card-Container-pokemon')


const btnBusca =  document.getElementById('btnSearch')
const btnRandom = document.getElementById('btnRandom')

//btnBusca
btnBusca.addEventListener('click', ()=>{
    const param = inputSearch.value.trim().toLowerCase()
    if(param){
        fetchApi(param)
    }
})

//random
btnRandom.addEventListener('click', () =>{
    const idSearchId = Math.floor(Math.random()*150)+1
    fetchApi(idSearchId)
})

//consumo
async function fetchApi( param ) {
    try{
        card.innerHTML= '<p class ="text  muted> buscando</p>'
          const  response =await fetch(`https://pokeapi.co/api/v2/pokemon/${param}`)
          //https://pokeapi.co/api/v2/pokemon/${param}, do

    if (!response.ok){
        throw new Error("Pokemon no encontrado ...")
    }

    listPokemon = await response.json()

    //pintar
    card.innerHTML= `
    <div class =" col-md-6>
    <div class ="card shadow text-center p-3">
    <img src="${listPokemon.sprites.front_default}" class=" card-imag-top mx-auto" style ="width: 120 px" alt="${listPokemon.name}">
    <div class= "card-body">
    <h4>${listPokemon.name}</h4>
    <p>Id: ${listPokemon.id}</p>
    </div> 
    </div>
    </div>`;

    console.log('datos obtenidos '+ listPokemon.name);
    } catch(error){
        card.innerHTML ='<p> No se Encontro el pokemon buscado </p>'
        listPokemon =null //limpia 
    }
  


    
    
}
