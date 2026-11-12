let listPokemon = null; 
let pokemonTeams = []; 

const inputSearch = document.getElementById('idPokemon');
const card = document.getElementById('card-Container-pokemon');

const btnBusca = document.getElementById('btnSearch');
const btnRandom = document.getElementById('btnRandom');

//buscar
btnBusca.addEventListener('click', () => {
    const param = inputSearch.value.trim().toLowerCase();
    if (param) {
        fetchApi(param);
    }
});

//aleatorio
btnRandom.addEventListener('click', () => {
    const idSearchId = Math.floor(Math.random() * 150) + 1;
    fetchApi(idSearchId);
});

//consumo
async function fetchApi( param ) {
    try {
        card.innerHTML = '<p class="text-muted">buscando...</p>';
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${param}`);
          //https://pokeapi.co/api/v2/pokemon/${param}, do

        if (!response.ok) {
            throw new Error("Pokemon no encontrado ...");
        }

        listPokemon = await response.json();

        // Tipos pokemon
        const tiposPokemon = listPokemon.types.map(t => `<span class="badge bg-secondary me-1">${t.type.name}</span>`).join('');

        //pintar tarjeta con botón para añadir al equipo
        card.innerHTML = `
        <div class="col-md-4 col-sm-6">
            <div class="card shadow-sm text-center border-0 bg-white rounded-3 p-3">
                <img src="${listPokemon.sprites.front_default}" class="card-img-top mx-auto" style="width: 250px;" alt="${listPokemon.name}">
                <div class="card-body">
                    <h4 class="text-capitalize">${listPokemon.name}</h4>
                    <p class="text-muted small mb-2">Id: ${listPokemon.id}</p>
                    <div class="mb-3"><strong>Tipo:</strong> ${tiposPokemon}</div>
                    <button class="btn btn-success btn-sm mt-2" id="btnAddTeam">Añadir a mi Equipo</button>
                </div> 
            </div>
        </div>`;

        // agrega a la tabla
        document.getElementById('btnAddTeam').addEventListener('click', () => {
            addPokemonToTeam(listPokemon);
        });

        console.log('datos obtenidos ' + listPokemon.name);
    } catch(error) {
        card.innerHTML = '<p class="text-danger">No se Encontro el pokemon buscado</p>';
        listPokemon = null; // limpia 
    }
}

// agregar pokemon a tabla de elejidos
function addPokemonToTeam(pokemon) {
    const existe = pokemonTeams.some(p => p.id === pokemon.id);
    if (existe) {
        alert("Este Pokemon ya es de  tu equipo!!");
        return;
    }

    if (pokemonTeams.length >= 6) {
        alert("Tu equipo ya está completo! (Solo se admiten 6 Pokemon)");
        return;
    }

    pokemonTeams.push(pokemon);
    renderTable();
}


function renderTable() {
    const tableBody = document.getElementById('TableBody');
    tableBody.innerHTML = ''; 

    pokemonTeams.forEach(pokemon => {
        // Tipos del Pokémon
        const tiposPokemon = pokemon.types.map(pokemonObj => `<span class="badge bg-secondary">${pokemonObj.type.name}</span>`).join(' ');
        
        // Habilidades del Pokémon
        const habilidadesPokemon = pokemon.abilities.map(habilidadObj => habilidadObj.ability.name).join(', ');

        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td><img src="${pokemon.sprites.front_default}" width="45" alt="${pokemon.name}"></td>
            <td class="text-capitalize fw-bold">${pokemon.name}</td>
            <td>${tiposPokemon}</td>
            <td><small class="text-muted">${habilidadesPokemon}</small></td>
            <td><span class="badge bg-info text-dark">${pokemon.base_experience} XP</span></td>
        `;
        
        tableBody.appendChild(fila);
    });
}