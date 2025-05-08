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
