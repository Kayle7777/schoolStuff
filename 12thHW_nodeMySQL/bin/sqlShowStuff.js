const SQLTransaction = require("./sqltrans.js");
const showStuff = async function() {
    let deptNames, promises = [];
    try {
        deptNames = await new SQLTransaction('bamazon', 'select department_name from products');
        deptNames = deptNames.query[0].reduce((accu,e)=>{
            !accu.includes(e.department_name)?accu.push(e.department_name):null;
            return accu;
        },[]);
        for (var i = 0; i < deptNames.length; i++) {
            promises.push(new SQLTransaction('bamazon', `select * from products where department_name='${deptNames[i]}'`));
        };
        promises = await Promise.all(promises);
    } catch (err) {
        throw new Error(err);
    };
    return promises.map(e=>{
        return {divider:`-----${e.query[0][0].department_name}-----`,content:e.query[0].reduce((accu,e)=>{
            e.stock_quantity>0?accu.push({info:e,dispString:`${e.product_name} -- $${e.price} -- ${e.stock_quantity} in stock`}):null;
            return accu;
        },[])}
    });
};

module.exports = showStuff;
