# m133-kanban

Kanban board group project for m133

gemacht von Silvan (Sili-Dev, SharEduc) und Alex (alex-skxy)

## running

`deno run --allow-net --allow-read backend/server.ts`

## api

### Card
    {
        id: string;
        text: string;
        state: string;
    }

| GET    | /cards     | returns a list of all cards |
|--------|------------|-----------------------------|
| POST   | /cards     | creates a card              |
| PUT    | /cards/:id | updates a card              |
| DELETE | /cards/:id | deletes a card              |

### State
    {
        id: string;
        name: string;
    }

| GET    | /states     | returns a list of all states |
|--------|-------------|------------------------------|
| POST   | /states     | creates a state              |
| PUT    | /states/:id | updates a state              |
| DELETE | /states/:id | deletes a state              |
