const SQLTransaction = require('./sqltrans.js');
const makeOrder = async function(id,amt) {
    let oldAmt,updater,success;
    try {
        oldAmt = await new SQLTransaction('bamazon', `select stock_quantity from products where id=${id}`);
        oldAmt = oldAmt.query[0][0].stock_quantity;
        updater = await new SQLTransaction('bamazon', `update products set stock_quantity=${oldAmt-amt} where id=${id}`);
        updater?success=updater.success:null;
    } catch (err) {
        throw new Error(err);
    };
    return success, oldAmt+amt;
};

module.exports = makeOrder;
