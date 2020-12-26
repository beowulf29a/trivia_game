import React from 'react';
import TextInputButton from '../components/TextInputButton'
import { Grid } from '@material-ui/core';

class User extends React.Component{
    handleUserClick(user) {
        if(!user) return;
        console.log(user);
        this.props.newUserHandler(user);
    }
  
    render() {
      return (
        <Grid container spacing={3} direction="column" justify="flex-start" alignItems="stretch">
          <Grid item>
            <h2>
              Step right up! Step right up!
              <br/>
              Enter your name below to join in all the fun!
            </h2>
          </Grid>
          <Grid item>
            <TextInputButton clkHandler={this.handleUserClick.bind(this)} custBtnText='Play' defaultInput='Enter your name' />
          </Grid>
        </Grid>
      );
    }
}

export default User;