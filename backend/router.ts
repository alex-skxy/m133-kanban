import {Router} from 'https://deno.land/x/oak/mod.ts';
import {CardsService} from "./cards.service.ts";
import {Card} from "./card.ts";
import {StatesService} from "./states.service.ts";
import {State} from "./state.ts";

async function getFile(path: string) {
    return await Deno.readFile(path);
}

const cardsService = new CardsService();
const statesService = new StatesService();

const router = new Router();

router.get('/', async (ctx) => {
    ctx.response.body = await getFile('./frontend/index.html');
});
router.get('/index.js', async (ctx) => {
    ctx.response.headers.set('Content-Type', 'application/javascript');
    ctx.response.body = await getFile('./frontend/index.js');
});
router.get('/style.css', async (ctx) => {
    ctx.response.body = await getFile('./frontend/style.css');
});

router.get('/cards', ctx => {
    ctx.response.headers.set('Content-Type', 'application/json');
    ctx.response.body = cardsService.getCards();
});
router.post('/cards', async ctx => {
    ctx.response.headers.set('Content-Type', 'application/json');
    const card: Card = JSON.parse(await ctx.request.body().value);
    ctx.response.body = JSON.stringify(cardsService.createCard(card));
});
router.put('/cards', async ctx => {
    ctx.response.headers.set('Content-Type', 'application/json');
    const card: Card = JSON.parse(await ctx.request.body().value);
    ctx.response.body = cardsService.updateCard(card);
});
router.delete('/cards/:id', ctx => {
    const id: string = ctx.params.id!;
    cardsService.deleteCard(id);
    ctx.response.body = "";
});

router.get('/states', ctx => {
    ctx.response.headers.set('Content-Type', 'application/json');
    ctx.response.body = statesService.getStates();
});
router.post('/states', async ctx => {
    ctx.response.headers.set('Content-Type', 'application/json');
    const state: State = JSON.parse(await ctx.request.body().value);
    ctx.response.body = JSON.stringify(statesService.createState(state));
});
router.put('/states', async ctx => {
    ctx.response.headers.set('Content-Type', 'application/json');
    const state: State = JSON.parse(await ctx.request.body().value);
    ctx.response.body = statesService.updateState(state);
});
router.delete('/states/:id', ctx => {
    const id: string = ctx.params.id!;
    statesService.deleteState(id);
    ctx.response.body = "";
});

export default router;

