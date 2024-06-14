const express = require("express");
const  router = express.Router();
const upload = require("../utils/multer");
const { createProject, updateProject, deleteProject, getAllProjects, getProject } = require("../controller/projectController");

router.post("/create-project", upload.fields([
    {name:"image", maxCount:1},
    {name:"detailsImages", maxCount: 30}    
]), createProject );
router.put("/update-project/:id", upload.fields([
    {name:"image", maxCount:1},
    {name:"detailsImages", maxCount: 30}    
]), updateProject);
router.delete("/delete-project/:id", deleteProject);
router.get("/get-project/:id", getProject);
router.get("/get-projects", getAllProjects);

module.exports = router;