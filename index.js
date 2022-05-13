import koa from 'koa'
import {extname,resolve} from 'path'
import {createReadStream} from 'fs'
const app = new koa()

app.use(({request,response},next) => {
    if(
        !request.url.startsWith('/api/video') ||
        !request.query.video ||
        !request.query.video.match(/[a-z0-9-_ ]+\.(mp4|mov)/i)
    ){
        console.log("not execute");
        return next();   
    }
    const range = request.header;
    if(!range){
        
    }
    console.log(range)
    const video = resolve('videos',request.query.video);
    response.type = extname(video);
    response.body = createReadStream(video)
    return next();
})

app.listen(3000,() =>{
    console.log("app execute on http://localhost:3000")
})