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
    const sacuvaneKnjige = localStorage.getItem('knjige');
    if (sacuvaneKnjige) {
        const parsedKnjige = JSON.parse(sacuvaneKnjige);
        return parsedKnjige.map(knjiga => new Knjiga(knjiga.id, knjiga.naziv, knjiga.datum, knjiga.url, knjiga.opis, knjiga.popularnost));
    }
    return [];
}

function ucitajIznajmljeneKnjige() {
    const iznajmljeneKnjige = localStorage.getItem('iznajmljeneKnjige');

    if (iznajmljeneKnjige) {
        const parsedIznajmljeneKnjige = JSON.parse(iznajmljeneKnjige);
        return parsedIznajmljeneKnjige.map(knjiga => new Knjiga(knjiga.id, knjiga.naziv, knjiga.datum, knjiga.url, knjiga.opis, knjiga.popularnost));
    }
    return [];
}

let sveKnjige = ucitajKnjige();
let iznajmljeneKnjige = ucitajIznajmljeneKnjige();
const tbody = document.getElementById('tabela-body');

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
}

prikaziIznajmljeneKnjige();
