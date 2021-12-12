"use strict";

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

let STATES = [
    new state("To Do", 1),
    new state("In Progress", 2),
    new state("Done", 3)
];

let tasks = [];

renderBoard();

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    tasks.forEach((taskItem) => {
        if (data == taskItem.id) {
            taskItem.state = ev.currentTarget.id;
        }
    });
    renderAllTasks();
}

function OpenAddDialog(column) {
    let name;
    while (!name) {
        name = prompt("Task Name");
    }
    tasks.push(new task(name, column));
    renderAllTasks();
}

function removeTask(id) {
    let i = 0;
    tasks.forEach((task) => {
        if (task.id == id) {
            tasks.splice(i, 1);
        }
        i++;
    });
    renderAllTasks();
}

function removeState(id) {
    let i = 0;
    STATES.forEach((state) => {
        if (state.id == id) {
            STATES.splice(i, 1);
        }
        i++;
    });
    tasks.forEach((task) => {
        let i = 0;
        if (task.state == id) {
            tasks.splice(i, 1);
        }
        i++;
    })
    renderBoard();
}

function renderAllTasks() {

    STATES.forEach((state) => {
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

function addState() {
    let name;
    while (!name) {
        name = prompt("Statename");
    }
    const newState = new state(name, STATES.length+1);
    STATES.push(newState);
    renderBoard();
    renderAllTasks();
}

function renderBoard() {
    const board = document.getElementById("kanban-board");
    board.innerHTML = "";

    STATES.forEach((state) => {
        board.innerHTML += 
        `<div class="kanban-block w-1/4 h-screen m-4 text-center rounded overflow-hidden shadow-lg" id="${state.id}" ondrop="drop(event)" ondragover="allowDrop(event)">
            <h2 class="text-4xl m-4">${state.name}</h2>
            <div id="${state.id}-items"></div>
            <button class="w-2/5 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full" onclick="OpenAddDialog(${state.id})">ADD</button>
            <input class="w-2/5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full" type="button" value="DELETE" onclick="removeState(${state.id})" />
        </div>`
    });
    renderAllTasks();
}