const inq = require("inquirer");
const customerOrderFromFullStock = require("./bin/customerOrderFromFullStock.js");
const customerSearchForItems = require("./bin/customerSearchForItems.js");
const SQLTransaction = require("./bin/sqltrans.js");


async function fullPrompt() {
    let initialPrompt = await inq.prompt({
        name:'choice',
        type:'list',
        message:'hi, this is bamazon. below are your options for making a new order',
        choices:[
            'make order',
            'search for items',
            new inq.Separator(),
            'quit'
        ]
    });
    switch (initialPrompt.choice) {
        case 'make order':
        {
            return customerOrderFromFullStock(fullPrompt);
            break;
        }
        case 'search for items':
        {
            return customerSearchForItems();
            break;
        }
        case 'quit':
        return console.log("goodbye");
        break;
    };
};

fullPrompt();
