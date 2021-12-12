import {Card} from "./card.ts";
import {State} from "./state.ts";

export class StatesService {
    db: State[] = [];

    getStates(): State[] {
        return this.db;
    }

    createState(state: State): State {
        state["id"] = Date.now().toString();
        return this.db[this.db.push(state)];
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
            this.db = this.db.splice(index, 1);
        }
    }
}
