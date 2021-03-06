import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchProjects, createProject } from '../../actions/projects';
import ProjectCreator from './ProjectCreator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { FlatButton } from 'material-ui';
import { signout } from '../../auth';
import { withRouter } from 'react-router';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }

  onCreate(name) {
    this.props.dispatch(createProject(name));
  }

  signOut() {
    signout();
    this.props.router.replace('/signin');
  }

  render () {
    return (
      <MuiThemeProvider>
        <div className="projects">
          <FlatButton className="auth-button" label="Logout" secondary={true} onClick={this.signOut.bind(this)} />
          <List className="project-list">
            {this.props.projects.map((project) => {
              return (<div><ListItem className="project"><Link to={ '/project/' + project._id }>{ project.name }</Link></ListItem><Divider /></div>);
            })}
          </List>
          <ProjectCreator onCreate={this.onCreate.bind(this)} />
        </div>
      </MuiThemeProvider>
    );
  }
}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object
};

const mapStateToProps = state => state.dashboard;

export default connect(mapStateToProps)(withRouter(Dashboard));
