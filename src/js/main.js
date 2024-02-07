"use strict"

const navEl = document.getElementById("menu");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");

openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);  

function toggleMenu() {

    if(navEl.style.display === "none") {
        navEl.style.display = "block"
    } else {
        navEl.style.display = "none"
    }
}