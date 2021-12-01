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
    let name = prompt("LUL");
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

function renderAllTasks() {

    STATES.forEach((state) => {
        const element = document.getElementById(state.id + "-items");
        element.innerHTML = "";
    });

    tasks.forEach(task => {
        const element = document.getElementById(task.state + "-items");
        element.innerHTML += `<div class="task" id=${task.id} draggable="true" ondragstart="drag(event)">${task.text}<input type="button" value="-" onclick="removeTask(${task.id})" /></div>`;
    });
}

function addState() {
    const newState = new state(prompt("Statename"), STATES.length+1);
    STATES.push(newState);
    renderBoard();
    renderAllTasks();
}

function renderBoard() {
    const board = document.getElementById("kanban-board");
    board.innerHTML = "";

    STATES.forEach((state) => {
        board.innerHTML += 
        `<div class="kanban-block" id="${state.id}" ondrop="drop(event)" ondragover="allowDrop(event)">
            <h2>${state.name}</h2>
            <div id="${state.id}-items"></div>
            <button onclick="OpenAddDialog(${state.id})">ADD</button>
        </div>`
    });
}