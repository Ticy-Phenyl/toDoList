'use strict'

/*     Exemple de fetch 
fetch('data.json')
    .then(réponse => réponse.json())
    .then(tab => {
        tab.forEach(task => {
            const h3 = document.createElement('h3');
            h3.textContent = task;
            document.body.appendChild(h3);
            h3.style.textAlign = 'center';
            h3.style.margin = '15px';
            h3.style.color = 'gray';
        })
    })
*/


// Nvelle instance pour la clé 'tasks':
const storage = new ArrayStorage('tasks');


// On récupère le tableau déjà existant ou on en créée un vide:
const tasks = storage.list;


const input = document.getElementById('input');
const add = document.getElementById('add');
const clear = document.getElementById('clear');
const url = document.getElementById('url');
const load = document.getElementById('load');
const list = document.getElementById('list');
const hide = document.getElementById('hide');

function hideMe() {
    hide.addEventListener('click', () => {
        if (hide.classList.toggle('visible')) {
            url.style.display = 'block'
            load.style.display = 'block'
            hide.textContent = 'Hide';
        } else {
            url.style.display = 'none'
            load.style.display = 'none'
            hide.textContent = 'Unhide';
        }
    });
};
hideMe();


function taskToDom(task) {
    if (typeof task === 'string' && task) {
        const li = document.createElement('li');
        const remove = document.createElement('button');

        li.textContent = task;
        remove.textContent = 'Remove';

        remove.addEventListener('click', () => {
            const value = remove.parentNode.firstChild.textContent;
            storage.remove(value);
            list.removeChild(remove.parentNode);
        })

        li.appendChild(remove);
        list.insertBefore(li, list.firstChild);

        return true;
    }
    return false;
};

//Ajout de tâches (balise li)
tasks.forEach(task => taskToDom(task)); // ou i =0; <.length; i++


//Ajout de tâche avec btn Add et "Enter":
function newTask() {
    if (storage.list.indexOf(input.value) === -1 && taskToDom(input.value)) {
        storage.set(input.value);
        input.value = '';
    }
    input.focus()
}

add.addEventListener('click', newTask)
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        newTask();
    }
});


//Suppression liste du Dom et du browser:
clear.addEventListener('click', () => {
    storage.clear();
    list.innerHTML = '';
});


//Importation de tâches:
load.addEventListener('click', () => {
    fetch(url.value)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(`${response.statusText} (${response.status})`)
        })
        .then(tasks => {
            if (Array.isArray(tasks)) {
                tasks.forEach(task => {
                    if (storage.list.indexOf(task) === -1 && taskToDom(task)) {
                        storage.set(task);
                    }
                })
                return
            }
            throw new TypeError("La r\xE9ponse n'est pas un tableau JSON (type: ".concat(_typeof(a), ")"));
        });
})
