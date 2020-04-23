const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

//mysql connection
var connection = mysql.createConnection({
  host: 'backend-db',
  port: '3306',
  user: 'manager',
  password: 'Password',
  database: 'db'
});

//set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err){
    console.log(err);
  }
  logger.info("Connected to the DB!");
});

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});


//POST /reset
app.post('/reset', (req, res) => {
  connection.query('drop table if exists test_table', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table test_table");
  });
  res.status(200).send('created the table');
});

//POST /multplynumber
app.post('/multplynumber', (req, res) => {
  console.log(req.body.product);

  connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
    if (err){
      logger.error("Problem inserting into test table");
    }
    else {
      res.status(200).send(`added ${req.body.product} to the table!`);
    }
  });
});

//GET /checkdb
app.get('/values', (req, res) => {
  connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    }
    else{
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});


//API ROUTES


app.get('/users/:uid', function (req, res) {
   var uid = req.param('uid')
	connection.query("SELECT * FROM users WHERE uid = ?", uid, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
		res.send(result)
	});
});


  
app.post('/createUser', (req, res) => {
  connection.query('DROP table if exists users', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
    });
  connection.query('CREATE table users (id varchar(4), email varchar(50), password varchar(50))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table child_user");
  });
  res.status(200).send('User table has been created!!');
});


app.post("/addUser/:id/:email/:password", function (req, res) {
  connection.query('insert into users values(?, ?, ?)', [req.params['id'], req.params['email'],req.params['password']], function(err, rows, fields) {
    if(err)
      logger.error('adding row to table failed');
  });
  res.status(200).send("User has been added!");
});

app.get("/users", function (req, res) {
  let query = "select * from users;";
  connection.query(query, function(err,rows, fields) {
    if(err){
        logger.error("No user");
        res.status(400).send(err);
        res.status(400).json({
          "data": [],
          "error": "MySQL error"
        });
      }
      else{
        res.status(200).json({
          "Data": rows
        });
      }  
  })
});

app.get("/login", function (req, res) {
    let email = req.query.email;
    let password = req.query.password;
    let query = "select * from users where email = '" + email + "' and password = '" + password + "' limit 1;";
    connection.query(query, function(err, rows, field) {
      console.log("req", req.query);
      if(rows == null  ||rows.length == 0 || err){
        logger.error("INVALID");
        res.status(400);
      }
      else{
        console.log('LOGGED IN');
        res.status(200).json({
          "data": rows[0]
        })
      }
    })
});

// POST
// /perscription post
router.post('/addperscription/:id/:uid/:drugId/:directions/:cost/:pharmacy', async (req, res) => {
	var id = req.param('id');
	var uid = req.param('uid');
	var drugId = req.param('drugId');
	var directions = req.param('directions');
	var cost = req.param('cost');
	var pharmacy = req.param('pharmacy');
	
	  con.query("INSERT INTO perscriptions VALUES (?, ?, ?, ?, ?, ?)", [id, uid, drugId, directions, cost, pharmacy],function (err, result, fields) {
		  if (err) throw err;
		  res.end(JSON.stringify(result)); // Result in JSON format
	  });
  });


//DELETE perscription for user
router.delete('/deleteperscription/:uid/:drugId', async (req, res) => {
	var uid = req.param('uid');
	var drugid = req.param('drugid');
	
	  con.query("DELETE FROM perscriptions WHERE uid = ? AND drugid = ?", [uid, drugid] ,function (err, result, fields) {
		  if (err) 
			  return console.error(error.message);
		  res.end(JSON.stringify(result)); 
		});
  });

//DELET ACCOUNT
router.delete('/deleteaccount/:uid', async (req, res) => {
	var uid = req.param('uid');

	  con.query("DELETE FROM perscriptions WHERE uid = ?", uid,function (err, result, fields) {
		  if (err) 
			  return console.error(error.message);
		  res.end(JSON.stringify(result)); 
		});

	con.query("DELETE FROM users WHERE uid = ?", uid,function (err, result, fields) {
		if (err) 
			return console.error(error.message);
		res.end(JSON.stringify(result)); 
	  });
  });

//DELETE Pharmacy
router.delete('/removepharmacy/:pharmacy', async (req, res) => {
	var pharmacy = req.param('pharmacy');

	  con.query("DELETE FROM perscriptions WHERE pharmacy = ?", pharmacy,function (err, result, fields) {
		  if (err) 
			  return console.error(error.message);
		  res.end(JSON.stringify(result)); 
		});

	
  });


// GET persciptions
router.get('allperscriptions', function (req, res) {
	con.query("SELECT * FROM perscriptions GROUP BY uid", function (err, result, fields) {
    if(err){
      logger.error("No perscription");
      res.status(400).send(err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      });
    }
    else{
      res.status(200).json({
        "Data": rows
      });
    }  
	});
}); 

// GET persciptions for pharmacy
router.get('perscriptionsforpharmacy/:pharmacy', function (req, res) {
	var pharmacy = req.param('pharmacy');
	
	con.query("SELECT * FROM perscriptions where pharmacy = ? GROUP BY uid", pharmacy, function (err, result, fields) {
		if(err){
      logger.error("No perscription");
      res.status(400).send(err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      });
    }
    else{
      res.status(200).json({
        "Data": rows
      });
    }  
	});
}); 

// GET persciptions for user
router.get('/usersperscriptions/:uid', function (req, res) {
	var uid = req.param('uid');
	con.query("SELECT * FROM perscriptions WHERE uid = ?", uid, function (err, result, fields) {
		if(err){
      logger.error("No perscription");
      res.status(400).send(err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      });
    }
    else{
      res.status(200).json({
        "Data": rows
      });
    }  
	});
}); 

// GET by Price for drugs
router.get('/drugprices', function (req, res) {
	con.query("SELECT name, price FROM drugs ORDER BY price", function (err, result, fields) {
		if(err){
      logger.error("No drugs");
      res.status(400).send(err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      });
    }
    else{
      res.status(200).json({
        "Data": rows
      });
    }  
	});
});

//PUT change price of drug
router.put('changedrugcost/:drugId/:price', function (req, res) {
	var drugId = req.param('drugId');
	var price = req.param('price');
	con.query("UPDATE perscriptions SET price = ? WHERE drugId = ? ", [price, drugId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT change cost of perscription
router.put('/changeperscriptioncost/:uid/:drugId/:cost', function (req, res) {
	var uid = req.param('uid');
	var drugId = req.param('drugId')
	var cost = req.param('cost');
	con.query("UPDATE perscriptions SET cost = ? WHERE uid = ? AND drugId = ?", [uid, cost, drugId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
}); 

// PUT changes side effect
router.put('/changeSideEffect/:drugId/:sideEffectId', function (req, res) {
	var drugId = req.param('drugId')
	var sideEffectId = req.param('sideEffectId');

	con.query("UPDATE perscriptions SET sideEffectId = ? WHERE drugId = ?", [sideEffectId, drugId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
}); 

// GET specific drug
router.get('/get/drugbyname/:name', function (req, res) {
  var name = rew.param('name');
	con.query("SELECT * FROM drugs WHERE name = ?", name, function (err, result, fields) {
		if(err){
      logger.error("No drugs");
      res.status(400).send(err);
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      });
    }
    else{
      res.status(200).json({
        "Data": rows
      });
    }  
	});
});