var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node_test');
var user = require('../model/user');

router.post('/saveuser', function (req, res) {
    var saveUser = new user({
        "name": req.body.name,
        "city": req.body.city,
        "pincode": req.body.pincode
    })

    saveUser.save(function (err, userCreated) {
        if (err) {
            console.log(err);
            return res.status(201).json({"message": "User not created"});
        }
        console.log("Usre Created");
        return  res.status(201).json({userCreated});
    });
});

router.get('/users', function (req, res) {
    user.find({}, function (err, users) {
        if (err) {
            console.log(err);
            return res.status(500).json({"message": "Server error"});
        }
        console.log("Users...");
        return res.status(200).json({users});
    })
});

router.get('/findone/:name', function (req, res) {
    user.find({name: req.param.name}, function (err, userObj) {
        if (err) {
            console.log(err);
            return res.status(500).json({"message": "Server error"});
        }
        console.log("User....");
        return res.status(200).json({userObj});
    });
});

router.get('/findbyid', function (req, res) {
    user.find(1, function (err, userObj) {
        if (err) {
            console.log(err);
            return res.status(500).json({"message": "Server error"});
        }
        console.log("User....");
        return res.status(200).json({userObj});
    });
});

router.post('/update', function (req, res) {
    user.find({name: req.body.name}, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(400).json({"message": "Server error"});
        } else {
            console.log(user);
            if (user.length > 0) {
                user[0].city = req.body.city;
                user[0].pincode = req.body.pincode;
                user[0].save(function (err, userUpdated) {
                    if (err) {
                        return res.status(400).json({"message": "Server error"});
                    }
                    return res.status(200).json({userUpdated});
                });
            } else {
                return res.status(404).json({"message": "User not found"});
            }
        }
    });
});

// find and remove
router.post('/finddelete', function (req, res) {
    user.findOneAndRemove({_id: req.body.id}, function (err) {
        if (err) {
            console.log(err);
            return res.status(400).json({"message": "Server error"});
        }
        console.log("User Deleted...");
        return res.status(200).json({"message": "User deleted..."});
    });
});

module.exports = router;
