const express = require('express');
const app = express();
app.use(express.json());

var mysql = require('mysql');
/*const connection= mysql.createConnection({
  host: 'mysql',
  user: 'exampleuser',
  password: 'password' 
});*/
 

app.get('/', (req, res) => {
res.send('HELLO WORLD!');
});
  
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


/*const express = require('express');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
res.send('HELLO WORLD!');
});
  

//Connect to MySQL
var mysql = require('mysql');*/


var con = mysql.createConnection({
  host: "csdatabases_mysql_1",
  port: "3306",
  user: "exampleuser",
  password: "password",
  database: "drugdatabases"
});


//Open Connection
con.connect(function(err) {
	if(!err)
		console.log("connection made")
	if (err) throw err;
});


// ROUTES FOR  API

// create router
var router = express.Router();


// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// REGISTER  ROUTES -------------------------------
app.use('/api', router);


/*//GET
// /api/getit
router.get('/getit', function (req, res) {
	con.query("SELECT * FROM t1", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST
// /api/postit
router.post('/postit', async (req, res) => {
  var id = req.param('id');
  
	con.query("INSERT INTO t1 (f1) VALUES (?)", id,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT
// /api/putit
router.put('/putit', async (req, res) => {
  var id = req.param('id');
  
	con.query("UPDATE t1 SET f1 = 3 WHERE f1 = ? ", id,function (err, result, fields) {
		if (err) throw err;
		//console.log(result);
		res.end(JSON.stringify(result)); 
	});
});

// DELETE
// /api/deleteit
router.delete('/deleteit', async (req, res) => {
  var id = req.param('id');
  
	con.query("DELETE FROM t1 WHERE f1 = ? ", id,function (err, result, fields) {
		if (err) 
			return console.error(error.message);
		res.end(JSON.stringify(result)); 
	  });
});*/

// POST
// /perscription post
router.post('/post/perscription', async (req, res) => {
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

// POST
// /account post
router.post('/post/account', async (req, res) => {
	var uid = req.param('uid');
	var username = req.param('username');
	var password = req.param('password');
	var securityQ = req.param('securityQ');
	var securityA = req.param('securityA');
	
	  con.query("INSERT INTO perscriptions VALUES (?, ?, ?, ?, ?)", [uid, username, password, securityQ, securityA],function (err, result, fields) {
		  if (err) throw err;
		  res.end(JSON.stringify(result)); // Result in JSON format
	  });
  });

//DELETE perscription for user
router.delete('/delete/perscription', async (req, res) => {
	var uid = req.param('uid');
	var drugid = req.param('drugid');
	
	  con.query("DELETE FROM perscriptions WHERE uid = ? AND drugid = ?", [uid, drugid] ,function (err, result, fields) {
		  if (err) 
			  return console.error(error.message);
		  res.end(JSON.stringify(result)); 
		});
  });

//DELET ACCOUNT
router.delete('/delete/account', async (req, res) => {
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
router.delete('/delete/pharmacy', async (req, res) => {
	var pharmacy = req.param('pharmacy');

	  con.query("DELETE FROM perscriptions WHERE pharmacy = ?", pharmacy,function (err, result, fields) {
		  if (err) 
			  return console.error(error.message);
		  res.end(JSON.stringify(result)); 
		});

	
  });


// GET users
router.get('/get/users', function (req, res) {
	con.query("SELECT uid, username FROM perscriptions", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
}); 

// GET persciptions
router.get('/get/perscription', function (req, res) {
	con.query("SELECT * FROM perscriptions", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
}); 

// GET persciptions for pharmacy
router.get('/get/perscriptionforpharmacy/:pharmacy', function (req, res) {
	var pharmacy = req.param('pharmacy');
	
	con.query("SELECT * FROM perscriptions where pharmacy = ?", pharmacy, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
}); 

// GET persciptions for user
router.get('/get/perscription/:uid', function (req, res) {
	var uid = req.param('uid');
	con.query("SELECT * FROM perscriptions WHERE uid = ?", uid, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
}); 

// GET by Price for drugs
router.get('/get/drugs/price', function (req, res) {
	con.query("SELECT name, price FROM drugs ORDER BY price", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT change cost of perscription
router.put('/get/perscription/cost', function (req, res) {
	var uid = req.param('uid');
	var pharmacy = req.param('pharmacy')
	var cost = req.param('cost');
	con.query("UPDATE perscriptions SET cost = ? WHERE uid = ? AND pharmacy = ?", [uid, cost, pharmacy], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
}); 

