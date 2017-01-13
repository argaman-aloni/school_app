/**
 * Created by argam on 12/1/2016.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: String,
    description: String,
    creationDate: Date,
    lastSubmissionDate: Date
});

module.exports = mongoose.model('Task', taskSchema);