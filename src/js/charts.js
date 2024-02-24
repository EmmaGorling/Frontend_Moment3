"use strict"

window.onload = init;


// Hämta datan
async function init() {
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        const data = await response.json(); 

        //Sortera ut kurser och program
        const courses = data.filter((item) => item.type === 'Kurs');
        const programs = data.filter((item) => item.type === 'Program');

    } catch {
        document.getElementById('error').innerHTML = 'Datan kunde inte hämtas.'
    }
}