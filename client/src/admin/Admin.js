import React from 'react';
import {socket} from '../components/Header'
import { Grid, Paper } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CurrentUsers from '../components/CurrentUsers';
import AdminGame from './AdminGame';
import AdminQuestions from './AdminQuestions';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AdminAddQuestion from './AdminAddQuestion';

const URL = "http://bentomanor.duckdns.org:3002"
const wrapperStyle = {
  padding:"5px"
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            curQuestion: {},
            questionNum:1,
            userInfo:[],
            value: 0,
            questions:[],
            submittedAnswers:[],
            questionElapseTime: 0
        };
        
        socket.connect(this.props.user);
    }
    
    componentDidMount() {
      socket.listen("get_question", this.getQuestion);
      socket.listen("submit_answer", this.getAnswer);
      socket.listen("getCurUsers", this.userInfo.bind(this));

      this.initializeQuestions(this.setQuestions.bind(this));
    }

    componentWillUnmount() {
      socket.close("get_question");
      socket.close("submit_answer");
      socket.close("getCurUsers");
		  this.resetTimer();
    }

    getQuestion = question => {
      console.log(question);
      this.setState({ curQuestion: question });
    };

    getAnswer = answer => {
      let curAnswers = this.state.submittedAnswers;
      curAnswers.push(answer);
      this.setState({submittedAnswers:curAnswers})
    }

    resetTimer(){
      this.setState({quuestionElapseTime:0});
      clearTimeout(this.timerId);
    }

    startTimer(){
      this.questionStartTime = new Date().getTime();
		  this.timerId = setInterval(this.questionTimer.bind(this),100);
    }

    questionTimer(){
      let curTick = new Date().getTime();
      let elapseTime = ((curTick - this.questionStartTime)/1000);
      this.setState({questionElapseTime: elapseTime});
    }

    initializeQuestions(callback){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Typical action to be performed when the document is ready:
                callback(JSON.parse(xhttp.response).questions);
            }
        };
        xhttp.open("GET", URL, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send();
    }

    deleteQuestion(id){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(state) {
          if (state.target.readyState === 4 && state.target.status === 200) {
            this.updateQuestions();
          }
      }.bind(this);
      xhttp.open("POST", URL+"/delete", true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(id));
    }

    addQuestion(question){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(state) {
          if (state.target.readyState === 4 && state.target.status === 200) {
            this.updateQuestions();
          }
      }.bind(this);
      xhttp.open("POST", URL+"/add", true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(question));
  }


    setQuestions(questions){
        this.setState({questions:questions});
    }

    setCurrentQuestion(question){
      this.setState({curQuestion:question, submittedAnswers:[]});
      socket.nextQuestion(question);
      this.startTimer();
    }


    handleChange(event, newValue) {
      this.setState({value:newValue});
    };

    userInfo(info){
        this.setState({userInfo:info});
    }


    getQuestion = question => {
      this.setState({ curQuestion: question });
    };

    updateQuestions(){
      this.setState({questions:[]});
      this.initializeQuestions(this.setQuestions.bind(this));
    }

    render() {
      return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={5}>
          <Grid item>
            <Paper style={wrapperStyle}>
              Welcome to the Game {this.props.user.userName}!
            </Paper>
          </Grid>
          <Grid item>
            <Paper style={wrapperStyle}>
              This is the Admin Page
            </Paper>
          </Grid>
          <Grid item>
            <Tabs
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                indicatorColor="secondary"
                textColor="secondary"
                centered
              >
                <Tab label="Question Editor" />
                <Tab label="Current Game" />
              </Tabs>
              <TabPanel value={this.state.value} index={0}>
                <AdminQuestions user={this.props.user} questions={this.state.questions} removeQuesiton={this.deleteQuestion.bind(this)} setQuestion={this.setCurrentQuestion.bind(this)}/>
                <AdminAddQuestion addQuestionHdlr={this.addQuestion.bind(this)}/>
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <AdminGame user={this.props.user} question={this.state.curQuestion} submittedAnswers={this.state.submittedAnswers} questionElapseTime={this.state.questionElapseTime}/>
              </TabPanel>
          </Grid>
          <Grid item>
            <CurrentUsers/>
          </Grid>
        </Grid>
      );
    }
}

export default Admin;