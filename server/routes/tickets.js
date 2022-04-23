const express = require("express");

const ticketRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;


ticketRoutes.route("/tickets").get(function (req, res) {
  let db_connect = dbo.getDb("db_bugtracker");
  db_connect
    .collection("tickets")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/*
ticketRoutes.route("/tickets/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("tickets")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});
*/

ticketRoutes.route("/tickets/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.title,
    status: req.status,
    description: req.description,
    priority: req.priority,
    assigned_to: req.assigned_to,
  };
  db_connect.collection("tickets").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

/*
ticketRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();  
  let myquery = { _id: ObjectId( req.params.id )};  
  let newvalues = {    
    $set: {      
      title: req.title,     
      stat: req.status,      
      description: req.description,    
      priority: req.priority,    
      assigned_to: req.assigned_to,
  },  
};

ticketRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("tickets").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
*/

module.exports = ticketRoutes;
