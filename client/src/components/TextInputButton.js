import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

const wrapperStyle={
  padding:"5px"
}

class TextInputButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      this.setState({ input: e.target.value });
    }
  
    handleClick() {
      console.log(this.state.input);
      this.props.clkHandler(this.state.input);
    }
  
    render() {
      return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
          <Grid item>
            <TextField
              style={wrapperStyle}
              fullWidth
              label={this.props.defaultInput}
              variant="outlined"
              value={this.state.input}
              color="secondary"
              onChange={this.handleChange}/>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={this.handleClick} color="secondary">
              {this.props.custBtnText}
            </Button>
          </Grid>
        </Grid>
      );
    }
}

export default TextInputButton;