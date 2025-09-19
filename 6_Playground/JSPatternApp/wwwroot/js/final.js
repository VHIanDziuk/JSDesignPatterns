// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
import { log } from "./utils/debug.js";
import { List } from './utils/classes.js'
import { CommandExecutor, Command, Commands } from './utils/command.js'
import { LocalStorage } from './utils/storage.js';

const logger = new log();
logger.out('Site script loaded');
// logger.out('This is a warning', 'warn');
// logger.out('This is an error', 'error');


globalThis.DOM = {};

// easy access within this file
const DOM = globalThis.DOM;

function renderList() {
    const items = List.getInstance();
    DOM.itemList.innerHTML = "";
    for (let item of items.items) {
        const listItem = document.createElement('li');
        listItem.className = 'list-item border-top mt-1 p-1 d-flex justify-content-between';
        listItem.innerHTML = `${item.text} 
                <button class="delete-btn btn btn-danger btn-sm">Delete</button>`;
        listItem.dataset.text = item.text;
        DOM.itemList.appendChild(listItem);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    // Create references we will need later
    DOM.itemList = document.getElementById('item-list');
    DOM.addBtn = document.getElementById('add-btn');
    DOM.itemInput = document.getElementById('item-input');
    DOM.infoBtn = document.getElementById('info-btn');
    DOM.dialog = document.querySelector('dialog');

    // Event listeners
    DOM.addBtn.addEventListener('click', () => {
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
    });

    DOM.itemList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const item = event.target.parentNode.dataset.text;
            const cmd = new Command(Commands.DELETE, [item]);
            CommandExecutor.execute(cmd);
        }
    });

    DOM.infoBtn.addEventListener('click', () => {
        DOM.dialog.showModal();
    });

    LocalStorage.load();

    // Rendering on DOM content loaded, and when the list changes
    renderList();
    List.getInstance().addObserver(renderList);
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault(); 
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
    }
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault(); 
        const cmd = new Command(Commands.UNDO);
        CommandExecutor.execute(cmd);
    }
    if (event.ctrlKey && event.key === 'i') {
        event.preventDefault();
        const cmd = new Command(Commands.INFO);
        CommandExecutor.execute(cmd);
    }
});