var express = require('express');
var Ping = require("../lib/Java");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let port = req.query.port ?? 25565;
  let host = req.query.host;
  if(host){
    Ping(host,port,(re,err)=>{
      if(err != null){
        res.json({
          code:200,
          status: false
        })
      }else{
        let {version,max_players,current_players,latency,status,motd} = re;
        res.json({
          code:200,
          motd,
          version,
          status,
          max_players:Number(max_players),
          current_players:Number(current_players),
          latency
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
