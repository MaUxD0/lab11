class Agente {
    constructor(nombre, rol, habilidades, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.habilidades = habilidades;
        this.imagen = imagen;
    }
}
async function getAgents() {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();

        return data.data.map(agentData => new Agente(
            agentData.displayName,
            agentData.role ? agentData.role.displayName : 'Desconocido',
            agentData.abilities.map(ability => ability.displayName),
            agentData.displayIcon
        ));
    } catch (error) {
        console.error("Error fetching agents:", error);
    }
}
function renderAgents(agents) {
    const container = document.getElementById('agents-container');
    container.innerHTML = ''; // Limpiar el contenedor para evitar duplicados

    agents.forEach(agent => {
        const agentCard = document.createElement('div');
        agentCard.classList.add('agent-card');
        
        agentCard.innerHTML = `
            <img src="${agent.imagen}" alt="${agent.nombre}">
            <h2>${agent.nombre}</h2>
            <p><strong>Rol:</strong> ${agent.rol}</p>
            <h3>Habilidades:</h3>
            <ul>
                ${agent.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}
            </ul>
        `;

        container.appendChild(agentCard);
    });
}
function setupSearch(agents) {
    const searchBar = document.getElementById('search-bar');

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredAgents = agents.filter(agent =>
            agent.nombre.toLowerCase().includes(searchTerm)
        );
        renderAgents(filteredAgents);
    });
}
async function init() {
    const agents = await getAgents();
    renderAgents(agents);
    setupSearch(agents);
}

document.addEventListener('DOMContentLoaded', init);
