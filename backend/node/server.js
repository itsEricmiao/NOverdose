prescriptionconst express = require('express');
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


//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});


//API ROUTES


app.get('/users/:id', function (req, res) {
	connection.query("SELECT * FROM users WHERE id = ?", [req.params['id']], function (err, result, fields) {
    if (err)
      console.log(err);
    else
    {
      return res.status(200).json({
        "user": result
      })// Result in JSON format
    }
	});
});

//Get drug info from name
app.get('/drugs/:name', function (req, res) {
   var name = req.param('name')
	connection.query("SELECT * FROM drugs d JOIN sideEffects se ON d.sideEffectId = se.sideEffectId WHERE d.name = ?", name, function (err, result, fields) {
    if (err)
      throw err;
    else
		  res.end(JSON.stringify(result)); // Result in JSON format
		//res.send(result)
	});
});

app.post('/addDrug/:name/:desc/:effId', function (req, res) { //add new drug

	var name = req.param("name");
	var desc = req.param("desc");
	var effId = req.param("effId");

	connection.query("INSERT INTO drugs VALUES(null,?,?,?)",
	[name,desc,effId],
	function(err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
		res.send(result)
	});
});

//TABLE CREATION ROUTES

app.post('/createUser', (req, res) => {
  let query = "DROP TABLE if exists users";
  connection.query(query, (err, result) =>
  {
    if(err) {
      console.log(err);
    }
    else{
      }
  });
  query = "CREATE TABLE `users` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(100),  `email` VARCHAR(50), `password` VARCHAR(500), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), specialist tinyint, dob DATE); ";
  connection.query(query, (err, result) => {
    if(err) {
      console.log("Errpr creaing parent user", err);
      res.redirect('/'); }
  })
  query = "ALTER TABLE users AUTO_INCREMENT = 1000;";
  connection.query(query, (err, result) => {
    if(err) {
      console.log(err);
      res.status(400);}
  })
  res.status(200).send('User table has been created!!');
});


app.post("/createPrescriptions", function (req, res) {
  let query = "DROP TABLE if exists prescriptions";
  connection.query(query, (err, result) =>
  {
    if(err) {
      console.log(err);
    }
    else{
      }
  });

  connection.query("create table db.prescriptions(`prescriptionId` INT NOT NULL AUTO_INCREMENT, userId int default NULL, drugId int default null, oldPrescription tinyint, primary key (prescriptionId), key fk_prescriptions_1_idx (drugId), key fk_prescriptions_2_idx (userId), constraint fk_prescription_1 foreign key (drugId) references db.drugs (drugId), constraint fk_prescription_2 foreign key (userId) references db.users (id))",
    function(err, result, fields) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.end(JSON.stringify(result));
    });

    query = "ALTER TABLE prescriptions AUTO_INCREMENT = 2000;"
    connection.query(query, function(err, result) {
      if (err) {
        console.log(err);
      }
    });
})



app.post("/createDrugs", function(req,res) {
  let query = "DROP TABLE if exists drugs";
  connection.query(query, (err, result) =>
  {
    if(err) {
      console.log(err);
    }
    else{
      }
  });

	query = "CREATE TABLE drugs (drugId int NOT NULL AUTO_INCREMENT,name varchar(45) DEFAULT NULL,description varchar(45) DEFAULT NULL,price INT DEFAULT NULL,sideEffectId int DEFAULT NULL,diseaseId int DEFAULT NULL,symptomId int DEFAULT NULL,PRIMARY KEY (drugId),KEY fk_drugs_1_idx (sideEffectId),KEY fk_drugs_2_idx (diseaseId),KEY fk_drugs_3_idx (symptomId),CONSTRAINT fk_drugs_1 FOREIGN KEY (sideEffectId) REFERENCES sideEffects (sideEffectId),CONSTRAINT fk_drugs_2 FOREIGN KEY (diseaseId) REFERENCES diseases (diseaseId),CONSTRAINT fk_drugs_3 FOREIGN KEY (symptomId) REFERENCES symptoms (symptomId))";


	connection.query(query, function(err, result) {
		if (err) {
			console.log(err);
		}
		else {res.status(200).send("Drugs table created succesfully")}
	});

	query = "ALTER TABLE drugs AUTO_INCREMENT = 3000;"
	connection.query(query, function(err, result) {
		if (err) {
			console.log(err);
		}
	});
});






app.post("/createSideEffects", function(req,res) {
  let query = "DROP TABLE if exists sideEffects";
  connection.query(query, (err, result) =>
  {
    if(err) {
      console.log(err);
    }
    else{
      }
  });
	query = "CREATE TABLE sideEffects (sideEffectId int NOT NULL AUTO_INCREMENT,name varchar(45) DEFAULT NULL,PRIMARY KEY (sideEffectId))";
  connection.query(query, function(err, result) {
		if (err) {
			console.log(err);
		}
		else {res.status(200).send("SideEffect table created succesfully")}
	});

  query = "ALTER TABLE sideEffects AUTO_INCREMENT = 4000;"
  connection.query(query, function(err, result) {
    if (err) {
      console.log(err);
    }
  });
});

app.get("/getSymptoms", function (req, res) {
  let query = "Select * from symptoms";
  connection.query(query, (err, rows, feild) => {
    if(err) {
      console.log(err);
      logger.error("failed getting a symptom");
      res.status(400);
    }
    else{
      res.status(200).json({
        "data": rows
      })
    }
  })
});









app.post("/createSymptoms", function(req,res) {
  let query = "DROP TABLE if exists symptoms";
  connection.query(query, (err, result) =>
  {
    if(err) {
      console.log(err);
    }
    else{
      }
  });
	query = "CREATE TABLE symptoms (symptomId int NOT NULL AUTO_INCREMENT,name varchar(45) DEFAULT NULL,PRIMARY KEY (symptomId))";
  connection.query(query, function(err, result) {
		if (err) {
			console.log(err);
		}
		else {res.status(200).send("Symptom table created succesfully")}
	});

  query = "ALTER TABLE symptoms AUTO_INCREMENT = 5000;"
  connection.query(query, function(err, result) {
    if (err) {
      console.log(err);
    }
  });
});







app.post("/createDiseases", function(req,res) {
  let query = "DROP TABLE if exists diseases";
  connection.query(query, (err, result) =>
  {
    if(err) {
      console.log(err);
    }
    else{
      }
  });
	query = "CREATE TABLE diseases (diseaseId int NOT NULL AUTO_INCREMENT,name varchar(45) DEFAULT NULL,PRIMARY KEY (diseaseId))";
  connection.query(query, function(err, result) {
		if (err) {
			console.log(err);
		}
		else {res.status(200).send("Disease table created succesfully")}
	});

  query = "ALTER TABLE diseases AUTO_INCREMENT = 6000;"
  connection.query(query, function(err, result) {
    if (err) {
      console.log(err);
    }
  });
});

//SEARCH ROUTE

app.get("/getDrugs", function(req, res) {

  let whereClause = req.query.where;
  console.log(whereClause);

  let query = "SELECT d.drugId, d.name, d.description AS drugDesc, se.name AS sideEffectDesc, dis.name AS diseaseDesc, s.name AS symptomDesc, d.price from drugs d INNER JOIN sideEffects se on d.sideEffectID = se.sideEffectId INNER JOIN diseases dis on d.diseaseId = dis.diseaseId INNER JOIN symptoms s on d.symptomId = s.symptomId " + whereClause;
  connection.query(query, function (err, result, fields) {
    if (err){
      throw err;
      console.log(err);
    }
    else
		  res.end(JSON.stringify(result)); // Result in JSON format
		//res.send(result)
	});

});

app.post("/addUser", function (req, res) {
  let query = "insert into users (id, name, email, password) values(" + ` NULL, '${req.body.name}', '${req.body.email}', '${req.body.password}'`+ ")";
  connection.query(query, (err, result) => {
    if(err) {
      console.log(err);
      logger.error("failed adding a user");
      res.status(400);
    }
  })
  var returnId;
  query = "SELECT * FROM users WHERE NAME = '" + req.body.name + "' limit 1;"
  connection.query(query, (err,rows,fields) => {
    if(err){
      res.status(400);
    }
    else{
      returnId = rows[0].id;
    }
  res.status(200).json({
    "id": returnId
  })
});
});

app.post("/addPrescription", function (req, res) {
  let query = "insert into prescriptions (prescriptionId, userId, drugId, oldPrescription) values(" + ` NULL, '${req.body.userId}', '${req.body.drugId}'`+ ", 0)";
  connection.query(query, (err, result) => {
    if(err) {
      console.log(err);
      logger.error("failed adding a prescription");
      res.status(400);
    }
    var i = 5;
    res.status(200).json({
      "data" : i
    })
  })
});

app.get("/searchPrescription", function (req, res) {
  let query = "SELECT p.prescriptionID, p.oldPrescription, d.name, d.description AS DrugDescription,"
  query += " di.description AS DiseaseDescription, s.description AS SymptomDescription, se.description AS SideEffectDescription"
  query += " from prescriptions p INNER JOIN drugs d ON p.drugId = d.drugId INNER JOIN diseases di ON d.diseaseId = di.diseaseId";
  query += " INNER JOIN symptoms s ON d.symptomId = s.symptomId INNER JOIN sideEffects se ON"
  query += " d.sideEffectId = se.sideEffectId where userId = " + req.query.userId +  " AND  drugId = " + req.query.drugId;
  console.log(query);
  connection.query(query, (err,rows, result) => {
    if(err) {
      console.log(err);
      logger.error("failed adding a prescription");
      res.status(400);
    }
    var i = 0;
    if(rows[0] == undefined)
    {
      res.status(200).json({
        "data" : i
      })
    }
    else
    {
      i = i + 1;
      res.status(200).json({
        "data" : i
      })
    }

  })
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
  var returnId;
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
        returnId = rows[0].id;
      }
      res.status(200).json({
        "id": returnId
      })
    })
});

app.put("/updateUser", function (req, res) {

  console.log(req.body.id);
  connection.query("UPDATE users SET name = ?, email = ?, password = ?, specialist = ?, dob = ? WHERE id = ?",
  [req.body.name, req.body.email, req.body.password, req.body.specialist, req.body.dob, req.body.id],
  function (err, result, fields) {

    if (err) {
      console.log(err);
      throw err;
    }
    else
    console.log(result);
      res.end(JSON.stringify(result));

  });


});

// POST
// /prescription post
app.post('/addprescription/:id/:uid/:drugId/:directions/:cost/:pharmacy', async (req, res) => {
	var id = req.param('id');
	var uid = req.param('uid');
	var drugId = req.param('drugId');
	var directions = req.param('directions');
	var cost = req.param('cost');
	var pharmacy = req.param('pharmacy');

	  connection.query("INSERT INTO prescriptions VALUES (?, ?, ?, ?, ?, ?)", [id, uid, drugId, directions, cost, pharmacy],function (err, result, fields) {
		  if (err) throw err;
		  res.end(JSON.stringify(result)); // Result in JSON format
	  });
  });


//DELETE prescription for user
app.delete('/deleteprescription/:userId/:drugId', async (req, res) => {
	var userId = req.param('userId');
	var drugid = req.param('drugid');

	  connection.query("DELETE FROM prescriptions WHERE userId = ? AND drugid = ?", [userId, drugid] ,function (err, result, fields) {
		  if (err)
			  return console.error(error.message);
		  res.end(JSON.stringify(result));
		});
  });

//DELET ACCOUNT
app.delete('/deleteaccount/:userId', async (req, res) => {
	var uid = req.param('userId');

	  connection.query("DELETE FROM prescriptions WHERE userId = ?", userId,function (err, result, fields) {
		  if (err)
			  return console.error(error.message);
		  res.end(JSON.stringify(result));
		});

	connection.query("DELETE FROM users WHERE userId = ?", userId,function (err, result, fields) {
		if (err)
			return console.error(error.message);
		res.end(JSON.stringify(result));
	  });
  });

//DELETE Pharmacy
/*app.delete('/removepharmacy/:pharmacy', async (req, res) => {
	var pharmacy = req.param('pharmacy');

	  connection.query("DELETE FROM prescriptions WHERE pharmacy = ?", pharmacy,function (err, result, fields) {
		  if (err)
			  return console.error(error.message);
		  res.end(JSON.stringify(result));
		});


  });*/


// GET persciptions
app.get('allprescriptions', function (req, res) {
	connection.query("SELECT * FROM prescriptions GROUP BY userId", function (err, result, fields) {
    if(err){
      logger.error("No prescription");
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
/*app.get('prescriptionsforpharmacy/:pharmacy', function (req, res) {
	var pharmacy = req.param('pharmacy');

	connection.query("SELECT * FROM prescriptions where pharmacy = ? GROUP BY uid", pharmacy, function (err, result, fields) {
		if(err){
      logger.error("No prescription");
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
});*/

// GET persciptions for user
app.get('/usersprescriptions', function (req, res) {
	let query = "SELECT p.prescriptionID, p.oldPrescription, d.name, d.description AS DrugDescription,"
  query += " di.description AS DiseaseDescription, s.description AS SymptomDescription, se.description AS SideEffectDescription"
  query += " from prescriptions p INNER JOIN drugs d ON p.drugId = d.drugId INNER JOIN diseases di ON d.diseaseId = di.diseaseId";
  query += " INNER JOIN symptoms s ON d.symptomId = s.symptomId INNER JOIN sideEffects se ON"
  query += " d.sideEffectId = se.sideEffectId where userId = " + req.query.userId;
	console.log(query);
  connection.query(query, (err,rows, result) => {
    if(err) {
      console.log(err);
      logger.error("failed getting a prescription");
      res.status(400);
    }
    var i = 0;
    if(rows[0] == undefined)
    {
      res.status(200).json({
        "data" : i
      })
    }
    else
    {
      i = i + 1;
      res.status(200).json({
        "data" : i
      })
    }

  })
});

// GET by Price for drugs
app.get('/drugprices', function (req, res) {
	connection.query("SELECT name, price FROM drugs ORDER BY price", function (err, result, fields) {
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
app.put('/changedrugcost/:drugId/:price', function (req, res) {
	var drugId = req.param('drugId');
	var price = req.param('price');
	connection.query("UPDATE prescriptions SET price = ? WHERE drugId = ? ", [price, drugId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT change cost of prescription
/*app.put('/changeprescriptioncost/:uid/:drugId/:cost', function (req, res) {
	var uid = req.param('uid');
	var drugId = req.param('drugId')
	var cost = req.param('cost');
	connection.query("UPDATE prescriptions SET cost = ? WHERE uid = ? AND drugId = ?", [uid, cost, drugId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});*/

// PUT changes side effect
app.put('/changeSideEffect/:drugId/:sideEffectId', function (req, res) {
	var drugId = req.param('drugId')
	var sideEffectId = req.param('sideEffectId');

	connection.query("UPDATE prescriptions SET sideEffectId = ? WHERE drugId = ?", [sideEffectId, drugId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT changes symptom
app.put('/changeSymptom/:drugId/:symptomId', function (req, res) {
	var drugId = req.param('drugId')
	var symptomId = req.param('symptomId');

	connection.query("UPDATE prescriptions SET symptomId = ? WHERE drugId = ?", [symptomId, drugId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT changes disease
app.put('/changeDisease/:drugId/:diseaseId', function (req, res) {
	var drugId = req.param('drugId')
	var diseaseId = req.param('diseaseId');

	connection.query("UPDATE prescriptions SET diseaseId = ? WHERE drugId = ?", [diseaseId, drugId], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});
