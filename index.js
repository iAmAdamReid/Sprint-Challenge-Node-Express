const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// import db helpers
const actionDb = require('./data/helpers/actionModel.js');
const projectDb = require('./data/helpers/projectModel.js');

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

//TODO: POST

//TODO: DELETE

//TODO: PUT


/*** Projects Methods ***/

//TODO: GET

//TODO: POST

//TODO: DELETE

//TODO: PUT



const port = 8000;
server.listen(port, () => {
    console.log(`\n*** API Running on Port ${port}\n`)
})