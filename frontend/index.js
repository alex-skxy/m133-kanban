"use strict";
const CARDS_API_URL = 'http://localhost:8080/cards';
const STATES_API_URL = 'http://localhost:8080/states';

const cardsService = {
    get: async () => await (await fetch(CARDS_API_URL)).json(),
    create: async task => await (await fetch(CARDS_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })).json(),
    update: async task => await (await fetch(CARDS_API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })).json(),
    delete: async id => await fetch(`${CARDS_API_URL}/${id}`, {method: 'DELETE'})
};

const statesService = {
    get: async () => await (await fetch(STATES_API_URL)).json(),
    create: async state => await (await fetch(STATES_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })).json(),
    update: async state => await (await fetch(STATES_API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })).json(),
    delete: async id => await fetch(`${STATES_API_URL}/${id}`, {method: 'DELETE'})
};


let states;
let tasks;

class task {
    constructor(text, state) {
        this.id = Date.now().toString();
        this.text = text;
        this.state = state;
    }
}

class state {
    constructor(name, id) {
        this.id = id;
        this.name = name;
    }
}

async function addState() {
    let name;
    while (!name) {
        name = prompt("Statename");
    }
    const newState = new state(name, states.length + 1);
    await statesService.create(JSON.stringify(newState));
    await renderBoard();
}

async function OpenAddDialog(column) {
    let name;
    while (!name) {
        name = prompt("Task Name");
    }
    await cardsService.create(JSON.stringify({id: "", text: name, state: column}));
    await renderAllTasks();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    tasks.forEach(async (taskItem) => {
        if (data == taskItem.id) {
            taskItem.state = ev.currentTarget.id;
            await cardsService.update(JSON.stringify(taskItem));
            await renderAllTasks();
        }
    });
}


async function removeTask(id) {
    await cardsService.delete(id);
    await renderAllTasks();
}

async function removeState(id) {
    await statesService.delete(id);
    await renderBoard();
}

async function renderAllTasks() {
    tasks = await cardsService.get();
    states = await statesService.get();

    states.forEach((state) => {
        const element = document.getElementById(state.id + "-items");
        element.innerHTML = "";
    });

    tasks.forEach(task => {
        const element = document.getElementById(task.state + "-items");
        element.innerHTML += `
        <div class="task h-1/2 p-4 m-4 text-center rounded overflow-hidden shadow-lg" id=${task.id} draggable="true" ondragstart="drag(event)">
            <h1 class="text-3xl">${task.text}</h1><br>
            <input class="w-2/5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full" type="button" value="DELETE" onclick="removeTask(${task.id})" />
        </div>`;
    });
}


async function renderBoard() {
    states = await statesService.get();
    const board = document.getElementById("kanban-board");
    board.innerHTML = "";

    states.forEach((state) => {
        board.innerHTML +=
            `<div class="kanban-block w-1/4 h-screen m-4 text-center rounded overflow-hidden shadow-lg" id="${state.id}" ondrop="drop(event)" ondragover="allowDrop(event)">
            <h2 class="text-4xl m-4">${state.name}</h2>
            <div id="${state.id}-items"></div>
            <button class="w-2/5 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full" onclick="OpenAddDialog(${state.id})">ADD</button>
            <input class="w-2/5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full" type="button" value="DELETE" onclick="removeState(${state.id})" />
        </div>`
    });
    await renderAllTasks();
}

(async () => {
    states = await statesService.get();
    tasks = await cardsService.get();
    await renderBoard();
})();
