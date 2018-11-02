import http from './config';


export let getJson = ()=>{
    return http.get('/json').then((res)=>{
        if(res.status === 200){
            return res.data
        }else{
            console.log(res.message)
        }
    }).catch((err) =>{
        console.log(err)
    })
}