import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';


class AdminGame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            curQuestion: props.question,
            questionNum:1,
            submittedAnswers: props.submittedAnswers
        };
    }

    showSubmittedAnswers(){
      return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell align="right">Elapse Time</TableCell>
                <TableCell align="right">Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.submittedAnswers.map((row) => (
                <TableRow key={row.userName}>
                  <TableCell component="th" scope="row">
                    {row.userName}
                  </TableCell>
                  <TableCell align="right">{row.elapse}</TableCell>
                  <TableCell align="right">{row.answer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    formatTime(){
      let seconds = this.props.questionElapseTime;
      let minutes = seconds / 60;
      if(minutes > 1){
        minutes = Number.parseInt(minutes);
        seconds -= minutes * 60;
        return minutes + "min.  " + seconds.toFixed(1) +"sec.";
      }else{
        return seconds.toFixed(1) + "sec.";
      }
    }

    render() {
      return (
        <Grid
        ><p>
          Welcome to the Game {this.props.user.userName}!</p>
          <Grid>
            <Grid>
              <p>Question #{this.state.questionNum}</p>
			        <p>Question elapse time {this.formatTime()}</p>
            </Grid>
            <Grid>
              {this.state.curQuestion.question}
            </Grid>
            <Grid container>
              {this.showSubmittedAnswers()}
            </Grid>
          </Grid>
        </Grid>
      );
    }
}

export default AdminGame;