# m133-kanban

Kanban board group project for m133

## running

`deno run --allow-net --allow-read backend/server.ts`

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
