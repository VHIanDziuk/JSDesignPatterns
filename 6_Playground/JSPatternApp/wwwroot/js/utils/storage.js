import { List, Item } from "./classes.js";
import { log } from "./debug.js";

const logger = new log();

const BacklogList = List.getInstance();

export const LocalStorage = {
    load() {
        if (localStorage.getItem("backlog")) {
            for (let t of JSON.parse(localStorage.getItem("backlog"))) {
                BacklogList.add(new Item(t.text));
            }
        }
    },
    save() {
        logger.out(BacklogList.items);
        const array = Array.from(BacklogList.items);
        logger.out(array);
        localStorage.setItem("backlog", JSON.stringify(array));
    }
}
BacklogList.addObserver(LocalStorage.save);