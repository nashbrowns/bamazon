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
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log('\nWelcome to Bamazon!\n');
    askCustomer();
  });

  let dispProduct = function(callback){
    var query = connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        console.log('\n');
        let itemArr = [];
        res.forEach(function(element) {
            console.log('---------------------------------------------------------------------------------------');
            console.log('id: '+element.id+
                        ', product: '+element.product_name+
                        ', price: '+element.price+
                        ', stock: '+element.stock+
                        ', department: '+element.department_name);
          });
          console.log('\n');
          callback();
    })
}

let askCustomer = function(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Purchase Products", "Display Products", "Quit"],
            name: 'selection'
        }
    ]).then(function(res){
        switch (res.selection) {
            case "Purchase Products":
            console.log("purchase products");
            askCustomer();
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



