/**
 * Created by argam on 12/1/2016.
 */

"use strict";

var fs = require('fs');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var gfs = require('gridfs-stream');

var Task = mongoose.model('Task');

//TODO: add the id of the user and then query according to the idetification.

router.get('/tasks', function (req, res, next) {
    console.log('Finding the tasks in the DB');
    Task.find(function (err, tasks) {
        if (err) {
            console.log(err);
            return next(err);
        }
        console.log(tasks);
        res.json(tasks);
    });
});

router.post('/tasks/files_upload', function (req, res, next) {
    console.log('Uploading a file to the DB');
    console.log(req);
    console.log('the content of the request');
    var writeStream = gfs.createWriteStream({
        filename: req.files.file.name,
        metadata: {
            version: 1
        }
    });

    writeStream.on('close', function (file) {
        console.log(file.filename);
        console.log(file.id);
    });

    fs.createReadStream(req.files.file.path).pipe(writeStream);
    console.log('Done uploading file');
    res.send('Success!');

    // fs.readFile(req.files.file.path, function (err, data) {
    //     if (err) console.log(err);
    //     console.log('Success reading data!');
    //     var newPath = __dirname + '/uploads/' + req.files.file.name;
    //     fs.writeFile(newPath, data, function(err) {
    //         res.redirect('back');
    //     });
    //     console.log('Done uploading file');
    // })

});

router.put('/tasks/:id', function (req, res, next) {
    console.log('Updating an existing task');
    Task.findByIdAndUpdate(req.params.id, req.body, function (err, task) {
        if (err) {
            console.log(err);
            return next(err);
        }

        res.json(task);
    })
});

router.post('/tasks', function (req, res, next) {
    console.log('Saving a new task to the DB.');
    var task = new Task(req.body);
    console.log(task);

    task.save(function (err, task) {
        if (err) {
            console.log(err);
            return next(err);
        }

        res.json(task);
    });
});

router.delete('/tasks/:id', function (req, res, next) {
    console.log('Deleting an existing task');
    Task.findByIdAndRemove(req.params.id, req.body, function (err, task) {
        if (err) {
            console.log(err);
            return next(err);
        }

        res.json(task);
    })
});

module.exports = router;


