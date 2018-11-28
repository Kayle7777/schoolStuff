const SQLTransaction = require("./sqltrans.js");
const inq = require("inquirer");


const customerSearchForItems = async function(type, query) {
    let data;
    query = query.replace(/^./, firstLetter=>firstLetter.toUpperCase()?firstLetter.toUpperCase():firstLetter);
    try {
        switch (type) {
            case "product name":
            {
                data = await new SQLTransaction('bamazon', `select * from products where product_name='${query}'`);
                break;
            }
            case "department":
            {
                data = await new SQLTransaction('bamazon', `select * from products where department_name='${query}'`);
                break;
            }
            case "price range":
            {
                data = await new SQLTransaction('bamazon', `select * from products where price between ${query}`);
                break;
            }
            case "id":
            {
                data = await new SQLTransaction('bamazon', `select * from products where id='${query}'`);
                break;
            }
        }
    } catch (err) {
        throw new Error(err);
    }
    return data.query[0];
}

const custSearchFinal = async function() {
    let initialPrompt = await inq.prompt({
        name: 'searchType',
        message: 'select which type of search you want to perform',
        type: 'list',
        choices: ['product name','department','price range','id']
    });
    let searchPrompt;
    if (initialPrompt.searchType != 'price range') {
        searchPrompt = await inq.prompt({
            name: 'searchQuery',
            message: `input ${initialPrompt.searchType} query`,
            type: 'input'
        })
    } else {
        searchPrompt = await inq.prompt([{
            name: 'between1',
            message: 'input starting number>',
            type: 'input',
            default: 0,
            filter: (ans=>{
                if (parseInt(ans) && ans>=0) {
                    return parseInt(ans);
                } else {
                    console.log("Error: NaN input. Must be number.")
                    return 0;
                };
            })
        }, {
            name: 'between2',
            message: 'input ending number>',
            type: 'input',
            default: 1,
            filter: (ans=>{
                if (parseInt(ans) && ans>=0) {
                    return parseInt(ans);
                } else {
                    console.log("Error: NaN input. Must be number.")
                    return 0;
                };
            })
        }]);
    };

    let data;
    searchPrompt.searchQuery?data = await customerSearchForItems(initialPrompt.searchType, searchPrompt.searchQuery): data = await customerSearchForItems(initialPrompt.searchType, `${searchPrompt.between1} AND ${searchPrompt.between2}`);
    let endPrompt = await inq.prompt({
        name: 'search',
        type: 'list',
        choices: data.map(e=> {
            return `${e.id}: ${e.product_name}(${e.stock_quantity} in stock) -- ${e.price}`
        })
    });
    return await new SQLTransaction('bamazon', `select * from products where id='${endPrompt.search.split(':')[0]}'`).then(e=>console.log(e.query[0]));
}
module.exports = custSearchFinal;
