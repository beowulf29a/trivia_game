//var express = require('express');
const path = require('path');
//const mysql = require('mysql');


module.exports = function(app, connection){
	app.get("/", function(req, res){
		connection.query('SELECT questions.question, questions.id, questions.question_type, answers.answer, answers.question_id FROM questions LEFT JOIN answers ON questions.id = answers.question_id;', function(err, data){

			let filteredResp = {};
			data.forEach(row => {
				if(filteredResp[row.id]){
					if(row.answer)
						filteredResp[row.id].answers.push(row.answer);
				}else{
					let rowAnsers = []
					if(row.answer) rowAnsers.push(row.answer);
					filteredResp[row.id] = {question:row.question, id:row.id, question_type:row.question_type, answers:rowAnsers}
				}
			});
			let formattedResp = []
			for(const prop in filteredResp){
				formattedResp.push(filteredResp[prop]);
			}

			(err)?res.send(err):res.json({questions:formattedResp});
		});
	});
	app.post("/add", function(req, res){
		console.log(req.body);
		let questReq = req.body;
		let type = questReq.type;
		let answers = questReq.answers;
		let question = questReq.question;
		
		let mysqlQuery = "INSERT INTO questions (question, question_type) VALUES ('" + question + "','" + type + "');";

		console.log(mysqlQuery);

		connection.query(mysqlQuery, function(err, data){
			if(!err && answers && answers.length){
				connection.query(getAnswerValues(answers, data.insertId), function(ierr, idata){
					(ierr)?res.send(ierr):res.json({questions:idata});
				});
				
			}else{
				(err)?res.send(err):res.json({questions:data});
			}
		});
	});
	app.post("/edit", function(req, res){
		console.log(req.body);

		let questReq = req.body;
		let type = questReq.question_type;
		let answers = questReq.answers;
		let question = questReq.question;
		let error;


		connection.query('UPDATE questions SET question = \''+ question +'\', question_type =\''+ type +'\' WHERE id='+ questReq.id +';', function(err, data){
			error = err;
			console.log(err);
		});

		if(type=='MultiChoice'){
			connection.query('DELETE FROM answers WHERE question_id='+questReq.id, function(err, data){
				if(!err){
					connection.query(getAnswerValues(answers, questReq.id), function(err, data){
						(err)?res.send(err):res.json({success:true});
					});
				}else{
					res.send(err);;
				}
			});
		}else{
			(error)?res.send(error):res.json({success:true});
		}
	});

	app.post("/delete", function(req, res){
		console.log(req.body);

		let questReq = req.body;
		console.log("deleting: "+JSON.stringify(questReq));

		connection.query('DELETE FROM questions WHERE id='+questReq.id, function(err, data){
			if(!err){
				connection.query('DELETE FROM answers WHERE question_id='+questReq.id, function(err, data){
					(err)?res.send(err):res.json({success:true});
				});
			}else{
				res.send(err);;
			}
		});
	});

	function getAnswerValues(answers, id){
		//INSERT INTO answers (answer, question_id) VALUES "+getAnswerValues(answers)+";
		return "INSERT INTO answers (answer, question_id) VALUES "
				+ answers.map((answer)=>{ return '(\'' + answer + '\', '+ id +')'}).toString();
	}
};
//var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

//module.exports = router;
