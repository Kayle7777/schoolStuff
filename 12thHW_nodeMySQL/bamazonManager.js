const inq = require("inquirer");
const SQLTransaction = require("./bin/sqltrans.js");
const sqlShowStuff = require("./bin/sqlShowStuff.js");


async function fullPrompt() {
    let initialPrompt = await inq.prompt({
        name:'choice',
        type:'list',
        message:'hi, this is bamazon. below are your options for making a new order',
        choices:[
            'view products for sale',
            'view low inventory',
            'add to inventory',
            'add new product',
            new inq.Separator(),
            'quit'
        ]
    });
    switch (initialPrompt.choice) {
        case 'view products for sale':
        {
            const data = await new SQLTransaction('bamazon', 'select * from products')
            return console.log(JSON.stringify(data.query[0],null,2));
            break;
        }
        case 'view low inventory':
        {
            const data = await new SQLTransaction('bamazon', 'select * from products where stock_quantity<5');
            return console.log(JSON.stringify(data.query[0],null,2));
            break;
        }
        case 'quit':
        return console.log("goodbye");

    }
}

fullPrompt();
