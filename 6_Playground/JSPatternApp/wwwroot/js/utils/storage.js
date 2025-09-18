import { List, Item } from "./classes.js";

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
        console.log(BacklogList.items);
        const array = Array.from(BacklogList.items);
        console.log(array)
        localStorage.setItem("backlog", JSON.stringify(array));
    }
}
BacklogList.addObserver(LocalStorage.save);