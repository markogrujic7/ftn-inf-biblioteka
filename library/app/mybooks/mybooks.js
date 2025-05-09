'use strict';

class Knjiga {
    constructor(id, naziv, datum, url, opis, popularnost) {
        this.id = id;
        this.naziv = naziv;
        this.datum = datum;
        this.url = url;
        this.opis = opis;
        this.tip = popularnost;
    }
}

function ucitajKnjige(){
    if (localStorage.getItem('knjige')) {
    if (JSON.parse(localStorage.getItem('knjige')).length > 0 && localStorage.getItem('knjige')){
        const sacuvaneKnjige = localStorage.getItem('knjige');
        const parsedSaved = JSON.parse(sacuvaneKnjige)
        sveKnjige = parsedSaved

        if (localStorage.getItem('iznajmljeneKnjige')){
        if (JSON.parse(localStorage.getItem('iznajmljeneKnjige')).length > 0){
            const iznajmljene = localStorage.getItem('iznajmljeneKnjige')
            const parsedTaken = JSON.parse(iznajmljene)
            iznajmljeneKnjige = parsedTaken
            prikaziIznajmljeneKnjige()
        }}

        pronadjiSlobodne()
        prikaziSlobodneKnjige()

    }}
}

let sveKnjige = []
let iznajmljeneKnjige = []
let slobodneKnjige = []

function pronadjiSlobodne() {
    for (const knjiga of sveKnjige) {
        let isIt = true
        if (iznajmljeneKnjige.length < 1 || !iznajmljeneKnjige){
            slobodneKnjige = sveKnjige
            localStorage.setItem('slobodneKnjige', JSON.stringify(sveKnjige))
            return
        }
        for (const iznajmljena of iznajmljeneKnjige) {
            if (knjiga.id == iznajmljena.id){
                isIt = false
                break
            }
        }
        if (isIt) {
            slobodneKnjige.push(knjiga)
            localStorage.setItem('slobodneKnjige', JSON.stringify(slobodneKnjige))
        }
    }
}
const tbody = document.getElementById('tabela-body')

function sacuvajIznajmljeneKnjige() {
    localStorage.setItem('iznajmljeneKnjige', JSON.stringify(iznajmljeneKnjige));
}

function prikaziIznajmljeneKnjige() {
    tbody.innerHTML = '';
    
    iznajmljeneKnjige.forEach((knjiga, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${knjiga.naziv}</td>
      <td><button class="vrati" data-id="${knjiga.id}">Vrati</button></td>
    `;

    tbody.appendChild(row);       
    });

    tbody.querySelectorAll(".vrati").forEach(button => {
        button.addEventListener("click", () => {
          const id = parseInt(button.getAttribute("data-id"));
          vratiKnjigu(id);
        });
      });
}

function vratiKnjigu(id){
    iznajmljeneKnjige = iznajmljeneKnjige.filter(knjiga => knjiga.id !== id);
    sacuvajIznajmljeneKnjige();
    prikaziIznajmljeneKnjige();
    prikaziSlobodneKnjige()
}

function prikaziSlobodneKnjige() {
    let tBody = document.querySelector("#tBody")
    tBody.innerHTML = ''

    for (const knjiga of slobodneKnjige) {
        const tr = document.createElement("tr")

        const br = document.createElement("td")
        br.textContent = knjiga.id
        const naziv = document.createElement("td")
        naziv.textContent = knjiga.naziv
        const buttonId = document.createElement("td")
        const button = document.createElement("button")
        button.textContent = "Iznajmi"
        buttonId.appendChild(button)
        tr.appendChild(br)
        tr.appendChild(naziv)
        tr.appendChild(buttonId)
        tBody.appendChild(tr)

        button.addEventListener('click', function () {
            iznajmiKnjigu(knjiga)
        })
    }
}

function iznajmiKnjigu(knjiga) {
    let iznajmljena = null
    for (const element of slobodneKnjige) {
        if (element.id == knjiga.id){
            iznajmljena = element
        }
    }
    slobodneKnjige.splice(slobodneKnjige.indexOf(iznajmljena), 1)
    iznajmljeneKnjige.push(iznajmljena)
    localStorage.setItem('slobodneKnjige', JSON.stringify(slobodneKnjige))
    localStorage.setItem('iznajmljeneKnjige', JSON.stringify(iznajmljeneKnjige))
    prikaziSlobodneKnjige()
    prikaziIznajmljeneKnjige()
}

document.addEventListener('DOMContentLoaded', ucitajKnjige)