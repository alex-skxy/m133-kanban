# m133-kanban

Kanban board group project for m133

## running

`(todo)`

## api

    {
        id: string;
        text: string;
        state: 'TODO' | 'INPROGRESS' | 'DONE';
    }

| GET    | /cards     | returns a list of all cards |
|--------|------------|-----------------------------|
| POST   | /cards     | creates a card              |
| PUT    | /cards/:id | updates a card              |
| DELETE | /cards/:id | deletes a card              |
