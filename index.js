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

/*** Actions Methods ***/

//TODO: GET
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

//TODO: POST
server.post('/api/actions', (req, res) => {
    const action = {
        "project_id": req.body.project_id,
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

//TODO: DELETE

//TODO: PUT


/*** Projects Methods ***/

//TODO: GET
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

//TODO: POST
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

//TODO: DELETE

//TODO: PUT




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