import React from 'react';
import TextInputButton from '../components/TextInputButton'
import {socket} from '../components/Header'
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


class ClientQUestion extends React.Component{

  getQuesetElm(){
    if(this.props.curQuestion && !this.props.curQuestion.question_type) return null;

    return (
      <Paper style={wrapperStyle}>
        <div style={questionStyle}>
          {this.props.curQuestion.question}
        </div>
      </Paper>
    )
  }

  submitAnswer(response){
    this.props.submitAnswer(response);
  }

  getSubmitElm(){
    let retElm = null;
    if(!this.props.nextQuestion){
      if(this.props.curQuestion && this.props.curQuestion.question_type){
        retElm = <Paper style={wrapperStyle}>Answer Submitted, please wait for next question</Paper>
      }else{
        retElm = <Paper style={wrapperStyle}>Please wait for game to begin!</Paper>
      }
    }else{
      switch(this.props.curQuestion.question_type){
        case "MultiChoice":
          retElm = (
            <Grid container direction="column" justify="flex-start" spacing={2}>
              {this.props.curQuestion.answers.map((a,idx)=>{
                  return (
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={this.submitAnswer.bind(this,a)}>
                        {a}
                      </Button>
                    </Grid>
                  );
              })}
            </Grid>
            );
          break;
        case "Buzzer":
          retElm = (
            <Button size="large" variant="contained" onClick={this.submitAnswer.bind(this, true)} color="primary">
                Complete
            </Button>
            )
          break;
        case "Submit":
          retElm = <TextInputButton clkHandler={this.submitAnswer.bind(this)} custBtnText='Submit Answer' defaultInput='Answer'/>
          break;
        default:
      }
    }
  
    return retElm
  }


  render(){
    let questionElm = this.getQuesetElm();
    let submitElm = this.getSubmitElm();
    return (
      <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={5}>
        <Grid item>
          {questionElm}
        </Grid>
        <Grid item>
          {submitElm}
        </Grid>
      </Grid>        
    );
  }
}

const wrapperStyle={
  padding:"10px"
}

const questionStyle={
  padding:"5px",
  background: "rgba(249,249,180,0.7)",
  "border-radius": "5px",
  color:"#141716",
  "font-weight":"bold"
}


class Game extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
            curQuestion: {},
            questionNum:0,
            questions: this.props.questions,
            nextQuestion: false
        };
    }
    componentDidMount() {
      socket.listen("get_question", this.getQuestion);
    }

    componentWillUnmount() {
      socket.close("get_question");
    }


    submitAnswer(ans){
      socket.submitAnswer(ans, (new Date().getTime() - this.questionTime)/1000);
      this.setState({nextQuestion:false});
    }


    getQuestion = question => {
      this.questionTime = new Date().getTime();
      console.log(question);
      this.setState({ curQuestion: question, questionNum: this.state.questionNum+1, nextQuestion:true });
    };

    questionNum(){
      if(!this.state.questionNum) return null;

      return (
        <Paper style={wrapperStyle}>
          Question #{this.state.questionNum}
        </Paper>
      );
    }

    render() {
      let questNumElm = this.questionNum();
      return (
        <div style={wrapperStyle}>
          <Grid container spacing={3} direction="column" justify="flex-start" alignItems="stretch">
            <Paper style={wrapperStyle}>Welcome to the Game {this.props.user.userName}!</Paper>
            <Grid item>
               {questNumElm}
            </Grid>
            <Grid item>
              <ClientQUestion curQuestion={this.state.curQuestion} submitAnswer={this.submitAnswer.bind(this)} nextQuestion={this.state.nextQuestion}/>
            </Grid>
          </Grid>
        </div>
      );
    }
}

export default Game;