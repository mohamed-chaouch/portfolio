const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    image: {
        type: String,
    },
});

const schemaProject = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    details: [detailsSchema]
}, { timestamps: true });

const Project = mongoose.model('Project', schemaProject, 'projects', {strict: false});
module.exports = Project;
