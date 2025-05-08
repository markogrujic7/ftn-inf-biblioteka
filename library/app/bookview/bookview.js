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

function ucitajKnjige() {
    const sacuvaneKnjige = localStorage.getItem('knjige');
    if (sacuvaneKnjige) {
        const parsedKnjige = JSON.parse(sacuvaneKnjige);
        return parsedKnjige.map(knjiga => new Knjiga(knjiga.id, knjiga.naziv, knjiga.datum, knjiga.url, knjiga.opis, knjiga.popularnost));
    }
    return [
        new Knjiga(
            1,
            "Rat i mir",
            "1869",
            "",
            "Klasični ruski roman",
            5
        ),
        new Knjiga(
            2,
            "Ana Karenjina",
            "1877",
            "",
            "Drama ruske aristokratije",
            4
        ),
    ];
}

let knjige = ucitajKnjige();

const tbody = document.getElementById('tabela-body');

function sacuvajKnjige() {
    localStorage.setItem('knjige', JSON.stringify(knjige));
}

function prikaziTabelu() {
    tbody.innerHTML = '';
    
    knjige.forEach((knjiga, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${knjiga.naziv}</td>
      <td><button class="izbrisi" data-id="${knjiga.id}">Obriši</button></td>
    `;

    tbody.appendChild(row);       
    });

    tbody.querySelectorAll(".izbrisi").forEach(button => {
        button.addEventListener("click", () => {
          const id = parseInt(button.getAttribute("data-id"));
          izbrisiKnjigu(id);
        });
      });
}

function izbrisiKnjigu(id){
    knjige = knjige.filter(knjiga => knjiga.id !== id);
    sacuvajKnjige();
    prikaziTabelu();
}

prikaziTabelu();