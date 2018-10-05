import React from 'react';
import {Link} from 'react-router-dom';


const Project = (props) => {
    return (
        <Link to = {`/projects/${props.id}`} className = 'project'>
        <div>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
        </div>
        </Link>
    )
}

export default Project;