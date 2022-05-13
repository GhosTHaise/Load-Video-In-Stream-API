import koa from 'koa'

const app = new koa()

app.use(({request},next) => {
    if(
        !request.url.startsWith('/api/video') ||
        !request.query.video ||
        !request.query.video.match(/[a-z0-9-_ ]+\.(mp4|mov)/i)
    ){
        console.log("not execute");
        return next();   
    }
    console.log(request.query.video)
})

app.listen(3000,() =>{
    console.log("app execute on http://localhost:3000")
})