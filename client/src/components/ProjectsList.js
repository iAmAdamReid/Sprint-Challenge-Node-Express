import React from 'react';
import {fetchProjects} from '../actions/index';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Project from './Project';

class ProjectsList extends React.Component {

    componentDidMount(){
        this.props.fetchProjects();
    }

    render(){
        return (
            <div className = 'projects-list'>
            {console.log(this.props.projects)}
            {this.props.projects.map(project => {
                return <Project {...project} />
            })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchProjects
})(ProjectsList))