"use strict"

window.onload = init;

function init () {
    showMap(); 
}


function showMap() {
    let map = L.map('map').setView([58.2057984, 15.9875072], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Element & eventlistener för sökfunktion
    const searchEl = document.getElementById('search');
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', () => {
        searchCity(searchEl.value);
    });
}

// Sök med fetchanrop
function searchCity(input) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`)
        .then(result=>result.json())
        .then(place => {
            showCity(place);
        });
}

function showCity(place) {
    
    //Filtrera ut stad
    const city = place.filter((item) => item.type === 'city');
    
    // Longitud och latitud för första staden som man får tillbaka
    const position = [city[0].lat, city[0].lon];


}