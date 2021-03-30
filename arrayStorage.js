'use strict'

class ArrayStorage {
    constructor(name) {
        this.name = name;
        this.list = this.get();
    }

    //Méthode pr récupérer tableau des valeurs, si pas de tableau, création d'un tableau
    get() {
        if (!localStorage.getItem(this.name)) {
            localStorage.setItem(this.name, '[]')
        }
        return JSON.parse(localStorage.getItem(this.name));
    }

    //Méthode pr ajouter valeur
    set(value) {
        this.list.push(value);
        localStorage.setItem(this.name, JSON.stringify(this.list));
    }

    //Méthode pr supprimer valeur
    remove(value) {
        const index = this.list.indexOf(value);
        this.list.splice(index, 1);
        localStorage.setItem(this.name, JSON.stringify(this.list));
    }

    //Vider le tableau
    clear() {
        localStorage.removeItem(this.name);
    }
}
