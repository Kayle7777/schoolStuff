const inq = require('inquirer');
const showStuff = require('./sqlShowStuff.js');
const makeOrder = require('./customerMakeOrder.js');

async function customerOrderFromFullStock(arg) {
    const currentDb = await showStuff();
    const orderPrompt = await inq.prompt({
        name:'order',
        type:'checkbox',
        message:'select items you wish to order >',
        choices: currentDb.reduce((accu,e)=>{
            accu.push(new inq.Separator(e.divider));
            for (x of e.content) {
                accu.push(x.dispString);
            };
            return accu;
        },[])
    });
    const sessionOrders = currentDb.reduce((accu,e)=>{
        for (x of e.content) {
            for (y of orderPrompt.order) {
                y==x.dispString?accu.push(x.info):null
            };
        };
        return accu;
    },[]);
    const qtyPrompt = await inq.prompt(sessionOrders.map(e=>{
        return {
            name:`${e.id}`,
            type:'input',
            filter: (qty) => {
                if (e.stock_quantity > qty) {
                    return qty;
                } else {
                    if (!parseInt(qty)) {
                        console.log('\nERROR:NaN -- this order has been cancelled (quantity = 0)');
                        return 0
                    } else {
                        console.log('\nYou have attempted to order more stock than is available right now. Ordering max possible.')
                        return e.stock_quantity;
                    };
                };
            },
            message:`input ${e.product_name.toLowerCase()} order quantity >`,
            default: 1
        };
    }));
    const promises = [];
    const returnInfo = [];
    for (let i = 0; i < sessionOrders.length; i++) {
        returnInfo.push(`${qtyPrompt[sessionOrders[i].id]} ${sessionOrders[i].product_name} ordered, price total: $${sessionOrders[i].price * qtyPrompt[sessionOrders[i].id]}`)
        promises.push(makeOrder(sessionOrders[i].id,qtyPrompt[sessionOrders[i].id]));
    };
    await Promise.all(promises).then(e=>{
        console.log('order placed\n', returnInfo.reduce((accu,e)=>{
            const price = e.replace(/^.*[^\d.]/, '');
            accu[0].push(e);
            accu[1]+=parseFloat(price);
            return accu;
        },[[],0]));
        return arg();
    });
};

module.exports = customerOrderFromFullStock;
