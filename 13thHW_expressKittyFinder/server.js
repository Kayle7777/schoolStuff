const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const friends = require("./app/data/friends.js")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./app/public',{index:"home.html"}));

app.get("/api/friends/:name", async (req, res)=> {
    console.log(req.params);
    let data = await friends();
    return res.json(data.filter(e=>e.name==req.params.name));
});

app.post("/api/friends", async (req,res)=> {
    let data = await friends();
    return res.json({selected: data.reduce((accu,e)=>{
        accu.scoreTotal-req.body.scoreTotal>e.scoreTotal-req.body.scoreTotal?accu=e:null;
        return accu;
    },data[0]), full: data});
});

app.get('*', async (req, res)=>{
    switch (req.path) {
        case "/":
        {
            return res.sendFile(path.join(__dirname, `/app/public/home.html`));
            break;
        }
        case "/survey":
        {
            return res.sendFile(path.join(__dirname, `/app/public/survey.html`));
            break;
        }
        case "/api/friends":
        {
            return res.json(await friends());// This will be imported from friends.js
            break;
        }
        default:
        {
            return res.sendFile(path.join(__dirname, `/app/public/home.html`));
            break;
        }
    };
});

app.listen(PORT);
