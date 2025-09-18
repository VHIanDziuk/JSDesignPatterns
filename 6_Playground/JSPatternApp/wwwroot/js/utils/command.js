import { Item, List } from './classes.js';
import { History } from './memento.js';

export class Command {
    name;
    args;
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

export const Commands = {
    ADD: "add",
    DELETE: "delete",
    UNDO: "undo",
    INFO: "info"
}

export const CommandExecutor = {
    execute(command) {
        const BacklogList = List.getInstance();
        switch (command.name) {
            case Commands.ADD:
                const itemInput = globalThis.DOM.itemInput;
                const itemText = itemInput.value.trim();
                const itemToAdd = BacklogList.find(itemText);

                if (itemText !== '' && itemToAdd==null) {
                    itemInput.value = '';
                    BacklogList.add(new Item(itemText));
                }        
                break;
            case Commands.DELETE:
                const [itemToDelete] = command.args;
                BacklogList.delete(itemToDelete);
                break;
            case Commands.UNDO:
                const previousList = History.pop();
                if (previousList) {
                    BacklogList.replaceList(previousList);
                }
                break;
            case Commands.INFO:
                const dialog = globalThis.DOM.dialog;
                if (dialog) {
                    dialog.showModal();
                }
                break;
                
        }
    }
}