import {Card} from "./card.ts";

export class CardsService {
    db: Card[] = [];

    getCards(): Card[] {
        return this.db;
    }

    createCard(card: Card): Card {
        card["id"] = Date.now().toString();
        return this.db[this.db.push(card)];
    }

    updateCard(card: Card): Card | null {
        const index = this.db.findIndex(c => c.id === card.id);
        if (index < 0) {
            return null;
        } else {
            this.db[index] = {...card};
            return this.db[index];
        }
    }

    deleteCard(id: string) {
        const index = this.db.findIndex(c => c.id === id);
        console.log(index);
        if (index > -1) {
            console.log('A')
            this.db = this.db.splice(index, 1);
            console.log(this.db)
        }
    }
}
