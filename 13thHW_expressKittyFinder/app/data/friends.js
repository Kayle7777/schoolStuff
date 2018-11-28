const fetch = require("node-fetch");

class Friend {
    constructor(name,photo,scores) {
        return (async()=>{
            this.name=name;
            scores?this.scores=scores:this.scores=new Array(10).fill().map(e=>e=Math.ceil(Math.random() * 5));
            this.scoreTotal = this.scores.reduce((accu,e)=>accu+=e,0);
            if (photo) {
                this.photo = photo;
            } else {
                photo = await fetch('https://api.thecatapi.com/v1/images/search?format=src&mime_types=image/jpg');
                this.photo = photo.url;
            }
            return this;
        })()
    }
}
const randomNames = ["Bill","Ted","Joe","Adam","Lilly", "Susie", "Sanjeep", "Ivan", "Linda", "Shazam", "Ricardo", "Jesse", "Juan"]
const friends = async ()=> {
    const data = [
        {
            "name":"Ahmed",
            "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
            "scores":[5,1,4,4,5,1,2,5,4,1],
            "scoreTotal":32
        }
    ]
    for (var i = 0; i < 9; i++) {
        data.push(new Friend(randomNames[Math.floor(Math.random() * randomNames.length)]));
    };
    return await Promise.all(data);
}

module.exports = friends;
