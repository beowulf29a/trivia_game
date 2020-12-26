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
			questionElpaseTime: 0
        };
		this.timerId = -1;
    }

    componentDidMount() {
		this.timerId = setInterval(this.questionTimer.bind(this),100);
    }

    componentWillUnmount() {
		resetTimer();
    }
	
	questionTimer = function(){
		let curTick = new Date().getTime();
		this.setState({questionElpaseTime: this.state.questionElpaseTime + (curTick - this.lastTick)});
		this.lastTick = curTick;
	}
	
	resetTimer = function(){
		this.setState({quuestionElapseTime:0});
		clearTimeout(this.timerId);
	}

    showSubmittedAnswers = function(){
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

    render() {
      return (
        <Grid
        ><p>
          Welcome to the Game {this.props.user.userName}!</p>
          <Grid>
            <Grid>
              <p>Question #{this.state.questionNum}</p>
			  <p>Elapse time{this.state.questionElpaseTime}</p>
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