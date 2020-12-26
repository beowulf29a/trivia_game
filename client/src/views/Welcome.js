import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const wrapperStyle={
  padding:"10px"
}

class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.someVal = true;
    }
    acceptTerms(){
        this.props.welcomeHandler(true);
    }

  
    render() {
      return (
        <div style={wrapperStyle}>
        <Grid container spacing={3} direction="column" justify="flex-start" alignItems="stretch">
          <Grid item justify='center'>
          <Paper style={wrapperStyle}>
            Miceli Family Renunion Trivia Game
          </Paper>
          </Grid>
          <Grid item>
          <Paper style={wrapperStyle}>
            Hi! Miceli Family Reunion!
            <br/>
            Your trivia game will be starting momentarily, but first we will need some information from you.
            <br/>
            No limits on team size.  All are welcome to join individually or play as a group.
            <br/>
            On the next page you will be required to enter your team name.  Be creative and remember, this is a family game.
            <br/>
            Good luck!
          <br/>
          <Button onClick={this.acceptTerms.bind(this)} variant="contained" color="secondary">
              Continue
          </Button>
          </Paper>
          </Grid>
          </Grid>
          </div>
      );
    }
}

export default Welcome;