const BePing = require('mcpe-ping');

function PingMCServer(host,port,callback){
    BePing(host,port,(err,res)=>{
        if(err) {
            callback(err);
            return;
        }
        let info = res.advertise.split(";");
        let bk = {
            max: res.maxPlayers,
            online:res.currentPlayers,
            serverName:info[1],
            protocol_version : info[2],
            version : res.version,
            level_name : info[7],
            gamemode: info[8],
            ipv4_port : info[10],
            ipv6_port : info[11]
        }
        callback(null,bk);
    });
}

module.exports = PingMCServer;