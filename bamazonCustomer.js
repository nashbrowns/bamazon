let mysql = require('mysql');
let inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log('\nWelcome to Bamazon!\n');
    askCustomer();
});

let dispProduct = function (callback) {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log('\n');
        let itemArr = [];
        res.forEach(function (element) {
            console.log('id: ' + element.id +
                ', product: ' + element.product_name +
                ', price: $' + element.price +
                ', stock: ' + element.stock +
                ', department: ' + element.department_name +
                ', stock: ' + element.stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------');

        });
        console.log('\n');
        callback();
    })
}

let purchaseProduct = function (callback) {

    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'input',
                message: 'Enter Product ID:',
                name: 'ID'
            },
            {
                type: 'input',
                message: 'Enter purchase quantity:',
                name: 'quantity'
            }
        ]).then(function (inqRes) {
            
            let ID = inqRes.ID-1;
            let quantity = inqRes.quantity;

            if(res[ID] === undefined){
                console.log('\nNot a valid ID\nReturning to main console...\n');
            }
            else{

                console.log(res[ID].id, res[ID].stock_quantity);

                if(quantity > res[ID].stock_quantity){
                    console.log('\ninsufficient quantity\nReturning to main console...\n');
                }
                else{
                    let newQuantity = res[ID].stock_quantity - quantity;
                    let purchaseCost = res[ID].price*quantity;
                    let product = res[ID].product_name;


                    connection.query('UPDATE products SET ? WHERE ?',
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            id: res[ID].id
                        }
                    ]);

                    console.log('\nPurchased '+quantity+' '+product);
                    console.log('Cost = $'+purchaseCost+'\n');
                }
            }
            
            callback();
        })
    });

}

let askCustomer = function () {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Display Products","Purchase Products", "Quit"],
            name: 'selection'
        }
    ]).then(function (res) {
        switch (res.selection) {
            case "Purchase Products":
                purchaseProduct(askCustomer);
                break;

            case "Display Products":
                console.log("display products");
                dispProduct(askCustomer);
                break;

            case "Quit":
                console.log('\nCome again!\n');
                connection.end();
                break;
        }
    })
}



