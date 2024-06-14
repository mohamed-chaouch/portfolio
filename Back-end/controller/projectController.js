const { default: mongoose } = require("mongoose");
const Project = require("../model/Project");

exports.createProject = async (req, res) =>{
    try{
        const data = req.body;

        if(!data.title){
            throw res.status(400).send('Title project is required');
        };

        if(!data.description){
            throw res.status(400).send('Description project is required');
        }
        const project = new Project(data);

        project.image = req.files["image"] ? req.files['image'][0].filename : null;

        const detailsArray = data.details ? JSON.parse(data.details) : [];
        const detailsImages = req.files["detailsImages"] || [];

        const updatedDetails = detailsArray.map((detail, index)=> {
            if(detailsImages[index]){
                return {
                    ...detail,
                    image: detailsImages[index].filename
                };
            }
            return detail;
        })

        project.details= updatedDetails;

        await project.save();
        res.status(200).send(project);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.updateProject = async (req, res) =>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).send('Id Invalid');
        }
        const newData = req.body;

        if(!newData.title){
            return res.status(400).send('Title project is required');
        }
        if(!newData.description){
            return res.status(400).send('Description project is required');
        }
        if(newData.title?.length < 2){
            return res.status(400).send('Title should be at least 2 characters');
        }
        if(newData.description?.length < 10){
            return res.status(400).send('Description should be at least 10 characters');
        }

        if (req.files["image"]) {
            newData.image = req.files["image"][0].filename;
        }

        const detailsArray = newData.details ? JSON.parse(newData.details) : [];
        const detailsImages = req.files["detailsImages"] || [];

        newData.details = detailsArray.map((detail, index) => {
            if (detailsImages[index]) {
                return {
                    ...detail,
                    image: detailsImages[index].filename
                };
            }
            return detail;
        });

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, newData, { new: true });
        if(!updatedProject){
            return res.status(404).send('Project not udpated');
        }
        res.status(200).send(updatedProject);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.deleteProject = async (req, res) =>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).send('Id Invalid');
        }
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if(!deletedProject){
            return res.status(404).send('Project not deleted');
        }
        res.status(200).send(deletedProject);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.getProject = async (req, res) =>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).send('Id Invalid');
        }
        const project = await Project.findById(req.params.id);
        if(!project){
            return res.status(404).send('Project not found');
        }
        res.status(200).send(project);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.getAllProjects = async (req, res) =>{
    try{
        const projects = await Project.find();
        if(!projects){
            return res.status(404).send('Projects not found');
        }
        res.status(200).send(projects);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}