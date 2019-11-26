const Koa = require('koa');

const app = new Koa();

const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.url}...`);
    await next();//调用下一个middleware
})
app.use(bodyParser());
router.get('/kk',async(ctx, next) => {
    console.log('---------------------------------')
    var name = '小乔';
    ctx.response.body = `<h1>Hello, ${name}</h1>`
})

router.get('/views', async(ctx, next) => {
    console.log('==================================')
    ctx.response.body = '<h1>Index</h1>';
})

app.use(router.routes());
// app.use(async (ctx, next) => {
//     const start = new Date().getTime();
//     await next();
//     const ms = new Date().getTime() - start;
//     console.log(`Time: ${ms}ms`)
// })
// app.use(async (ctx, next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello, koa!</h1>'
// })

app.listen(8080);
console.log('服务器已开启......')