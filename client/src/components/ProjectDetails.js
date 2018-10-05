import React from 'react';
import {fetchSingleProject} from '../actions/index';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class ProjectDetails extends React.Component {
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.fetchSingleProject(id);
    }

    constructor(props){
        super(props);

        this.state = {
            search:'',
            currentProject: {}
        }
    }

    render() {

        return (
            <div className = 'project-details'>
            <h1>{this.props.currentProject.name}</h1>
            <h2>{this.props.currentProject.description}</h2>
            <div className = 'project-actions'>
            <h3>ACTIONS:</h3>
            <p>Coming Soon...</p>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentProject: state.currentProject
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchSingleProject,
})(ProjectDetails));