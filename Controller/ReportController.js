const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const Customer = require(__dirname + "/../Model/cliente.js");
const Arching = require(__dirname + "/../Model/arqueo.js");

const app = express();

app.use(bodyParser.json());

const controller = {
    getDayReport:async function(req,res){
        const date = Date.parse(req.query.date);
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        
        var today1 = new Date(today);
        var today2 = new Date(today);
        today1.setDate(today1.getDate() + 1);
        today2.setDate(today2.getDate() + 2);


        const date1 = new Date(Date.parse(today1)).toISOString();
        const date2 = new Date(today2).toISOString();
        
        let open = await Arching.find({$and:[{fecha:{$gte: new Date(date1)}},{fecha:{$lte: new Date(date2)}}]});
        
        if(open.length > 0){
            res.send(open);
        }else{
            res.send([]);
        }
        
    }
}

module.exports = controller;
