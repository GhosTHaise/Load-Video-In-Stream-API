import koa from 'koa'
import {extname,resolve} from 'path'
import {createReadStream,stat} from 'fs'
import { promisify } from 'util'
const app = new koa()

app.use(async({request,response},next) => {
    response.set(`Range`,`bytes=0- `)
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
       /*  response.type = extname(video);
        response.body = createReadStream(video)
        console.log('nande')
        return next(); */
    }
    const parts = range.replace('bytes=','').split('-')
    const start = parseInt(parts[0],10);
    const videoStat = await promisify(stat)(video);
    const end = (parts[1]) ? parseInt(parts[1],10) : videoStat.size -1;
    response.set(`Content-Range`,`bytes ${start}-${end}/${videoStat.size}`);
    response.set('Accept-Ranges',`bytes`);
    response.set(`Content-Length`, end - start +1);
    response.status = 206;
    response.body = createReadStream(video,{start,end})
    return next()
    
})

app.on('error',(error,ctx)=>{

})

app.listen(3000,() =>{
    console.log("app execute on http://localhost:3000")
})