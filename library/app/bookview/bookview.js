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
let knjige = []

function ucitajKnjige() {
    const sacuvaneKnjige = localStorage.getItem('knjige')
    const parsirane = JSON.parse(sacuvaneKnjige)
    if (parsirane && parsirane.length > 0) {
        knjige = JSON.parse(sacuvaneKnjige)
        prikaziTabelu()
    }
    else{
        let knjiga
        knjiga = new Knjiga(
            1,
            "Rat i mir",
            "1869",
            "",
            "Klasični ruski roman",
            5
        )
        knjige.push(knjiga)
        knjiga = new Knjiga(
            2,
            "Ana Karenjina",
            "1877",
            "",
            "Drama ruske aristokratije",
            4
        )
        knjige.push(knjiga)
        prikaziTabelu()
    }
    dodajKnjigu()
}

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

function dodajKnjigu() {
    let submitBtn = document.querySelector('#submitBtn')
    submitBtn.addEventListener('click', function() {
        const forma = document.querySelector('#forma')
        const formData = new FormData(forma)

        const naziv = formData.get('naziv')
        const godina = formData.get('godina')
        const slika = formData.get('slikaURL')
        const opis = formData.get('opis')
        const popularnost = formData.get('popularnost')
        if (!naziv || naziv === "" || parseInt(godina) < 1 || !opis || opis === "" || parseInt(popularnost) > 5 || parseInt(popularnost) < 1){
            alert("Unesi validne podatke!")
            return
        }
        const id = generisiId(knjige)

        let knjiga = new Knjiga(id, naziv, godina, slika, opis, popularnost)
        knjige.push(knjiga)
        localStorage.setItem('knjige', JSON.stringify(knjige))

        prikaziTabelu()
    })
}

function generisiId(knjige) {
    let id = 0
    for (const knjiga of knjige) {
        if (id < knjiga.id){
            id = knjiga.id
        }
    }
    
    return id + 1
}

document.addEventListener('DOMContentLoaded', ucitajKnjige)