import {Router} from 'https://deno.land/x/oak/mod.ts';
import {CardsService} from "./cards.service.ts";
import {Card} from "./card.ts";

async function getFile(path: string) {
    return await Deno.readFile(path);
}

const cardsService = new CardsService();

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
    const card: Card = await ctx.request.body({type: 'json'}).value;
    ctx.response.body = JSON.stringify(cardsService.createCard(card));
});
router.put('/cards', async ctx => {
    ctx.response.headers.set('Content-Type', 'application/json');
    const card: Card = await ctx.request.body({type: 'json'}).value;
    ctx.response.body = cardsService.updateCard(card);
});
router.delete('/cards/:id', ctx => {
    const id: string = ctx.params.id!;
    console.log("AAAAAAAAAAAAAAAAAaa");
    cardsService.deleteCard(id);
    ctx.response.body = "";
});

export default router;

