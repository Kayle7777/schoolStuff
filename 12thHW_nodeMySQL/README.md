# Node-and-MySQL

A node command line app to demonstrate getting, showing, and manipulating data on a live MySQL server in a dynamic, user friendly way.

****

**Installation Instructions**

1. Get neccessary files / dependencies

Git clone this repository.
Navigate to this code's location in terminal, and type npm install.

****

**Usage**

`First, you will need to create an SSH tunnel to your server, directed to localhost. Unless of course this server is hosted on localhost already.`

![ServerSSH](https://i.imgur.com/EzTBMdr.png)

`Next, you are going to need to make a file called sqlobj.js, put that file in ./bin`

# sqlobj.js
```
 function sqlobj(arg) {
    return {
        host: "localhost",
        port: yourPort (example: 3306),
        user: "yourUsername",
        password: "yourPassword",
        database: arg
    }
};
 module.exports = sqlobj;
```

`Example of MySQL Database`

![MySQLDB](https://i.imgur.com/LFta85Y.png)

`App usage`

![Example](https://i.imgur.com/82VdCFW.gif)

* `node bamazonCustomer`

****

## Authors

* **Jesse Webb** - *All JavaScript* - [Kayle7777](https://github.com/kayle7777)

****

## Notable Concepts / Technologies Used

* *MySQL Database*
* *Inquirer.js*
* *Efficient Async/Await*

****

## Links

* **Code repository** - hosted on [Github][github Repo]

[github Repo]: https://github.com/Kayle7777/Node-and-MySQL
