"use strict"

window.onload = init;

let marker;

function init () {
    showMap(); 
}


function showMap() {
    let map = L.map('map', {
        center: [58.2057984, 15.9875072],
        zoom: 13
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Element & eventlistener för sökfunktion
    const searchEl = document.getElementById('search');
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', () => {
        searchCity(searchEl.value, map);
        
    });
}

// Sök med fetchanrop
function searchCity(input, map) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`)
        .then(result=>result.json())
        .then(place => {
            showCity(place, map);
        });
        
}

function showCity(place, map) {
    
    // Longitud och latitud för första staden som man får tillbaka
    let lat = place[0].lat;
    let lon = place[0].lon;

    // Gör det till en "Leaflet-vaiabel"
    let position = new L.latLng(lat, lon);

    // Funktion för att flytta vyn
    map.flyTo(position, 13);

    // Ta bort befintlig markör om den finns
    if (marker) {
        map.removeLayer(marker);
    }
    
    // Lägg till markör
    marker = L.marker(position).addTo(map);
    marker.setLatLng(position);
    

    
};