const http = require('http');
const JePing = require('./lib/Java');
const BePing = require('mcpe-ping');

const server = new http.Server();

server.on('request',(req,res)=>{
    let url = new URL(req.url, `http://${req.headers.host}`);
    let now = new Date().getTime();
    switch(url.pathname){
        case '/je':
            res.setHeader('Content-type','application/json');
            if(url.searchParams.has('host')){
                let host = url.searchParams.get('host');
                let port = 25565;
                if(url.searchParams.has('port')){
                    if(isNaN(parseInt(url.searchParams.get('port')))){
                        res.write(JSON.stringify({
                            status: 406,
                            message : 'the param {port} is not number'
                        }));
                        res.end();
                    }else{
                        port = parseInt(url.searchParams.get('port'));
                    }
                }
                JePing(host,port,(ser,err)=>{
                    if(err){
                        res.write(JSON.stringify({code:502,message:err}));
                        res.end();
                    }else{
                        //ser.delay = 
                        res.write(JSON.stringify({
                            status : 200,
                            server : ser
                        }));
                        res.end();
                    }
                },30);
            }else{
                res.write(JSON.stringify({code:406,message:'miss the param {host}'}));
                res.end();
                return;
            }
            break;
        case '/be':
            res.setHeader('Content-type','application/json');
            if(url.searchParams.has('host')){
                let host = url.searchParams.get('host');
                let port = 19132;
                if(url.searchParams.has('port')){
                    if(isNaN(parseInt(url.searchParams.get('port')))){
                        res.write(JSON.stringify({
                            status: 406,
                            message : 'the param {port} is not number'
                        }));
                        res.end();
                    }else{
                        port = parseInt(url.searchParams.get('port'));
                    }
                }
                BePing(host,port,(err,ser)=>{
                    if(err){
                        res.write(JSON.stringify({code:502,message:err}));
                        res.end();
                    }else{
                        let server_info = ser.advertise.split(';');
                        // 'MCPE;感谢使用VIEW 空岛整合包;486;1.18.11;0;10;11677849386450973703;§lThe Plane Crash;Survival;1;19132;19349;'
                       res.write(JSON.stringify({
                            status : 200,
                            server : {
                                host,
                                port,
                                status:true,
                                protocol_version : server_info[2],
                                version : server_info[3],
                                motd : ser.cleanName,
                                current_players : ser.currentPlayers,
                                max_players : ser.maxPlayers,
                                latency : new Date().getTime() - now
                            }
                        }));
                        res.end();
                    }
                });
            }else{
                res.write(JSON.stringify({code:406,message:'miss the param {host}'}));
                res.end();
                return;
            }
            break;
    }
});

server.listen(3333);
