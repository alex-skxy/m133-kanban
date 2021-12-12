import {State} from "./state.ts";

export class StatesService {
    db: State[] = [{id: "1", name: "To Do"},
        {id: "2", name: "In Progress"},
        {id: "3", name: "Done"}
    ];

    getStates(): State[] {
        return this.db;
    }

    createState(state: State): State {
        state["id"] = Date.now().toString();
        this.db.push(state);
        return state;
    }

    updateState(state: State): State | null {
        const index = this.db.findIndex(c => c.id === state.id);
        if (index < 0) {
            return null;
        } else {
            this.db[index] = {...state};
            return this.db[index];
        }
    }

    deleteState(id: string) {
        const index = this.db.findIndex(c => c.id === id);
        if (index > -1) {
            this.db.splice(index, 1);
        }
    }
}
