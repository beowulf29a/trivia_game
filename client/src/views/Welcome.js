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
          <Grid item>
          <Paper style={wrapperStyle}>
            Welcome to our Trivia Game!
          </Paper>
          </Grid>
          <Grid item>
          <Paper style={wrapperStyle}>
            The game will consist of several rounds of various types of questions.  You will be asked to enter your name and then the game can begin!
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