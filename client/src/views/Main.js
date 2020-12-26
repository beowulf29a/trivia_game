import React from 'react';
import User from './User'
import Welcome from './Welcome'
import Game from './Game'
import Paper from '@material-ui/core/Paper';
//import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Header} from '../components/Header';
import Admin from '../admin/Admin';
import {socket} from '../components/Header'


const Views = Object.freeze({
  USER: 0,
  WELCOME: 1,
  GAME: 2,
  ADMIN: 3
});


class Main extends React.Component {
  constructor(props){
    super(props);

    let defaultView = Views.WELCOME;

    let params = (new URL(document.location)).searchParams;
    let name = params.get('admin');
    if(name && name === 'true'){
      this.curUser = {userName:'Bento',isAdmin:true};
      defaultView = Views.ADMIN;
    }

    this.state = {
      curView: defaultView
    };

  }


  setUser(userName, isAdmin){
    if(userName){
      this.curUser = {userName:userName, isAdmin:false};
      socket.connect(this.curUser);

      this.setState({curView: Views.GAME});
    }
  }

  acceptTerms(val){
    if(val){
      this.setState({curView:Views.USER});
    }
  }


  render() {
    //const { classes } = this.props;
    const classes = {paper:"a", roo:"b"};
    console.log("current view: "+this.state.curView + " user: "+this.curUser);
    let veiwElm;
    switch(this.state.curView){
      case Views.USER:
        veiwElm = <User newUserHandler={this.setUser.bind(this)}/>
        break;
      case Views.GAME:
        veiwElm = <Game user={this.curUser}/>
        break;
      case Views.ADMIN:
        veiwElm = <Admin user={this.curUser}/>
        break;
      default:
      case Views.WELCOME:
        veiwElm = <Welcome welcomeHandler={this.acceptTerms.bind(this)}/>
          break;
      }


    return (
      <div className={classes.root}>
      <Grid container direction="column" justify="flex-start" alignItems="stretch">
        <Grid item xs>
          <Header/>
        </Grid>
        <Grid item xs>
          {veiwElm}
        </Grid>
      </Grid>
      </div>
    );
  }
}

// ========================================

/*App.propTypes = {
  classes: PropTypes.object.isRequired,
};*/
/*
ReactDOM.render(<div>
  <App />
  </div>, document.getElementById("root"));

export default withStyles(styles)(App);
*/
export default Main