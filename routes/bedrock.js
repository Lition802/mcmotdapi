var express = require('express');
var Ping = require("../lib/Bedrock");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let port = req.query.port ?? 19132;
  let host = req.query.host;
  if(host){
    Ping(host,port,(err,re)=>{
      if(err != null){
        res.json({
          code:200,
          status: false
        })
      }else{
        let {serverName,version,gamemode,max,online,protocol_version,ipv4_port,ipv6_port,level_name} = re;
        res.json({
            code:200,
            status:true,
            gamemode,
            motd:serverName,
            current_players : Number(online),
            max_player : Number(max),
            version,
            protocol_version:Number(protocol_version),
            ipv4_port:Number(ipv4_port),
            ipv6_port:Number(ipv6_port),
            level_name
        });
      }
    })
  }else{
    res.json({
      code : 400,
      msg:"missing the param {host}"
    });
  }
});

module.exports = router;
