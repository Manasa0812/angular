var express = require('express');
var monk=require('monk');
var db=monk('localhost:27017/user');
var collection=db.get("users");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/postdata',function(req,res){
	console.log(req.body);
collection.insert(req.body,function(err,docs){
	console.log(docs);
})
})
router.get('/getdata',function(req,res){
	collection.find({},function(err,docs){
		res.send(docs);
	});
});
router.post('/edit',function(req,res){
	collection.update({"_id":req.body._id},{$set:req.body},function(err,docs){
		res.send(docs);
	})
})
router.post('/remove',function(req,res){
	collection.remove({"_id":req.body._id},function(err,docs){
         res.send(docs);
	})
	})
module.exports = router;
