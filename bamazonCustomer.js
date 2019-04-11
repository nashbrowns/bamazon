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
    askCustomer();
  });

  let dispProduct = function(){
    var query = connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        // console.log(res);
        let itemArr = [];
        res.forEach(function(element) {
            console.log('---------------------------------------------------------------------------------------');
            console.log('id: '+element.id+
                        ', product: '+element.product_name+
                        ', price: '+element.price+
                        ', stock: '+element.stock+
                        ', department: '+element.department_name);
          });
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

            case "Display Products":
            console.log("display products");
            dispProduct();
            askCustomer();

            case "Quit":
            console.log('quit');
            connection.end();
        }
    })
}
  
//   function postProduct() {

//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Item Name:',
//             name: 'itemName'
//         },
//         {
//             type: 'input',
//             message: 'Category:',
//             name: 'itemCat'
//         },
//         {
//             type: 'input',
//             message: 'Starting Price:',
//             name: 'itemPrice'
//         }

//     ]).then(function(res){
//         console.log("\nAdding New Product...\n");
//         var query = connection.query(
//           "INSERT INTO auctions SET ?",
//           {
//             item_name: res.itemName,
//             category: res.itemCat,
//             starting_bid: res.itemPrice,
//             highest_bid: res.itemPrice
//           },
//           function(err, res) {
//             if (err) throw err
//             if (err) connection.end();

//             console.log(res.affectedRows + "Product added!\n");
//             // Call updateProduct AFTER the INSERT completes
//             startBay();
//           }
//         );
//     })
//   }

// let startBay = function(){
//     inquirer.prompt([
//         {
//             type: "list",
//             message: "What do you want to do?",
//             choices: ["POST", "BID", "EXIT"],
//             name: 'selection'
//         }
//     ]).then(function(res) {
//         console.log(res.selection);

//         if(res.selection === 'POST'){
//              postProduct();   
//         }
//         else if(res.selection === 'BID'){
//             bidProduct();
//         }
//         else if(res.selection == 'EXIT'){
//             connection.end();
//         }
//     })
// }


