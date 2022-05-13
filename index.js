import koa from 'koa'
import {extname,resolve} from 'path'
import {createReadStream} from 'fs'
import range from 'koa-range'
const app = new koa()

app.use(range);
app.use(({request,response},next) => {
    if(
        !request.url.startsWith('/api/video') ||
        !request.query.video ||
        !request.query.video.match(/[a-z0-9-_ ]+\.(mp4|mov)/i)
    ){
        console.log("not execute");
        return next();   
    }
    const video = resolve('videos',request.query.video);
    let range = request.header.range;
    if(!range){
        range = 'bytes=0-'
        response.type = extname(video);
        response.body = createReadStream(video)
        return next();
    }
    
    
})

app.listen(3000,() =>{
    console.log("app execute on http://localhost:3000")
})