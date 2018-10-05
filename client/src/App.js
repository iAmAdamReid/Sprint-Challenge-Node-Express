import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Switch, withRouter, Route, Link} from 'react-router-dom';
import ProjectsList from './components/ProjectsList';
import ProjectDetails from './components/ProjectDetails';
import {fetchProjects} from './actions/index';

class App extends Component {

  render() {
    return (
      <div className="App">
      <div className = 'navigation'>
      <Link to ='/' className = 'nav-link'>Home</Link>
      <Link to = '/forms/projects' className = 'nav-link'>Add New Project</Link>
      </div>

       <div className = 'application'>

      <Switch>
        <Route exact path = '/' render={(props) => {
          return (
            
              <ProjectsList {...props}></ProjectsList>
            
          )
        }} />

        <Route exact path = '/projects/:id' render={(props) => {
          return (
            <ProjectDetails {...props} />
          )
        }} />

        <Route exact path = '/forms/projects' render ={(props) => {
          return (
            <div>
              Form Coming Soon...
            </div>
          )
        }} />
        

      </Switch>

       </div> 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    projects: state.projects
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchProjects
})(App));
