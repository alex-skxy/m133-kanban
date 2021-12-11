import {Application} from 'https://deno.land/x/oak/mod.ts';
import router from './router.ts';

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
console.log('Server is listening on 8080');
await app.listen({port: 8080});
