// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
import { log } from "./utils/debug.js";

const logger = new log();
logger.out('Site script loaded');
// logger.out('This is a warning', 'warn');
// logger.out('This is an error', 'error');

document.addEventListener('DOMContentLoaded', () => {
    logger.out('DOM fully loaded and parsed');
    const itemInput = document.getElementById('item-input');
    const addBtn = document.getElementById('add-btn');
    const itemList = document.getElementById('item-list');

    addBtn.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText !== '') {
            const listItem = document.createElement('li');
            listItem.className = 'item-item border-top mt-1 p-1 d-flex justify-content-between';
            listItem.innerHTML = `${itemText} <button class="delete-btn btn btn-danger btn-sm">Delete</button>`;
            itemList.appendChild(listItem);
            itemInput.value = '';
        }
    });

    itemList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
        }
    });
});