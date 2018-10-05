const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// import db helpers
const actionsDb = require('./data/helpers/actionModel.js');
const projectsDb = require('./data/helpers/projectModel.js');

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan());
server.use(express.json());

function logger (req, res, next){
    console.log(`${req.method} to ${req.url}`);

    next();
}

server.use(logger);

/****************************************************************************************************/
/*** Actions Methods ***/
/****************************************************************************************************/

// Get all actions
server.get('/api/actions', (req, res) => {
    actionsDb.get()
    .then(actions => {
        return res.status(200).json(actions);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(({error: "Error retrieving actions."}))
    })
})

// Add new action to project
server.post('/api/actions', (req, res) => {
    const action = {
        "project_id": parseInt(req.body.project_id),
        "description": req.body.description,
        "notes": req.body.notes
    }

    if(action.description.length > 128){
        return res.status(413).json({error: "Description contains too many characters."})
    }

    if(!action.project_id || !action.description || !action.notes){
        return res.status(400).json({error: "New actions must contain a project ID, a description, and notes."})
    }

    // check to see if project exists
    projectsDb.get(action.project_id)
    .then(reply => {
        console.log(reply);
        if(!reply){
            return res.status(404).json({error: "No project with that ID was found."})
        } else {
            actionsDb.insert(action)
            .then(reply => {
                console.log(reply);
                return res.status(201).json("Action successfully added.");
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: "Error adding action."})
            })
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `Error finding project with ID ${action.project_id}`})
    })
    
})

// Delete action by ID

server.delete('/api/actions/:id', (req, res) => {
    const id = parseInt(req.params.id);

    actionsDb.remove(id)
    .then(reply => {
        console.log(reply);
        return res.status(200).json({message: "Action successfully deleted."})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `An error occured while attempting to delete Action ${id}`})
    })
})

// Update Action by ID

server.put('/api/actions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newAction = {
        "description": req.body.description,
        "notes": req.body.notes
    }

    actionsDb.update(id, newAction)
    .then(action => {
        if(!action){
            return res.status(404).json({error: "The specified action does not exist."})
        } else if(!newAction.description || !newAction.notes){
            return res.status(400).json({error: "Please include a description and notes."})
        } else {
            return res.status(200).json({action})
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `An error occured while updating Action ${id}`})
    })
})




/****************************************************************************************************/
/*** Projects Methods ***/
/****************************************************************************************************/

// Get all projects
server.get('/api/projects', (req, res) => {
    projectsDb.get()
    .then(projects => {
        return res.status(200).json(projects);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: "Error retrieving projects."})
    })
})

// Get project by ID
server.get('/api/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    projectsDb.get(id)
    .then(project => {
        if(!project){
            return res.status(404).json({error: `Project with ID ${id} does not exist.`})
        } else {
        return res.status(200).json({project})
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `Error retrieving project ${id}`})
    })
})

// Add new project
server.post('/api/projects', (req, res) => {
    const project = {
        "name": req.body.name,
        "description": req.body.description
    }

    if(project.name.length > 128){
        return res.status(413).json({error: "Name contains too many characters."})
    }

    if(project.name.length === 0 || project.description.length === 0){
        return res.status(400).json({error: "Project must have a name and description."})
    }

    projectsDb.insert(project)
    .then(reply => {
        console.log(reply);
        return res.status(201).json({message: "Project successfully added."});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: "Error adding project."})
    })
})

// Delete project by ID

server.delete('/api/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);

    projectsDb.remove(id)
    .then(reply => {
        console.log(reply);
        return res.status(200).json({message: "Project successfully deleted."})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `An error occured while attempting to delete Project ${id}`})
    })
})

// Update project by ID

server.put('/api/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const newProject = {
        "name": req.body.name,
        "description": req.body.description
    }

    projectsDb.update(id, newProject)
    .then(project => {
        if(!project){
            return res.status(404).json({error: "The specified project does not exist."})
        } else if (!newProject.name || !newProject.description){
            return res.status(400).json({error: "Please include a name and description."})
        } else {
        console.log(project);
        return res.status(200).json({message: "Project successfully updated."})
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `An error occured while attempting to update Project ${id}`})
    })
})

// Get actions for project by ID

server.get('/api/projects/:id/actions', (req, res) => {
    const project_id = parseInt(req.params.id);
    let actions_array = [];

    actionsDb.get()
    .then(actions => {
        actions.map(action => {
            if(action.project_id === project_id){
                actions_array.push(action);
            }
        })
        if(actions_array.length === 0){
            return res.status(200).json({message: `No actions found for Project ${project_id}`})
        } else {
        return res.status(200).json({actions_array});
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `An error occured while getting actions for project ${project_id}`})
    })
})



// Design and build the necessary endpoints to:

// perform CRUD operations on projects and actions.
// retrieve the list of actions for a project.


// Projects
// id: number, no need to provide it when creating projects, the database will generate it.
// name: string, up to 128 characters long, required.
// description: string, no size limit, required.
// completed: boolean to indicate if the project has been completed, not required
// Actions
// id: number, no need to provide it when creating posts, the database will automatically generate it.
// project_id: number, required, must be the id of an existing project.
// description: string, up to 128 characters long, required.
// notes: string, no size limit, required. Used to record additional notes or requirements to complete the action.
// completed: boolean to indicate if the action has been completed, not required



const port = 8000;
server.listen(port, () => {
    console.log(`\n*** API Running on Port ${port}\n`)
})