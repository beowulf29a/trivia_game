import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

const qTypes = {"Buzzer":0, "Submit":1, "MultiChoice":2, "None":-1};
const revQTypes = Object.keys(qTypes).reduce((ret, key) => {
    ret[qTypes[key]] = key;
    return ret;
  }, {});

class AdminAddQuestion extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            questionType: qTypes.None,
            showAdd: false,
            answers:[""],
            question: ""
        }
    }

    addQuestionHandler(){
        this.props.addQuestionHdlr({type:revQTypes[this.state.questionType],question:this.state.question.replaceAll("'","\\'"), answers:Object.values(this.state.answers).slice(1)})
        this.resetState();
    }

    resetState(){
        this.setState({
            questionType: qTypes.None,
            showAdd: false,
            answers:[""],
            question: ""
        });
    }

    updateSingleAnswer(evt){
        let curAnswers = this.state.answers;
        curAnswers[evt.target.id] = evt.target.value;
        this.setState({answers:curAnswers})
    }

    buildMCAnswers(){
        let i=-1;
        let resp= Object.keys(this.state.answers).map(
            (k)=>{
                ++i;
                return (
                    <Grid item>
                        <TextField
                        fullWidth
                        id={"answer"+i}
                        label={"Response #"+(i+1)}
                        placeholder="Placeholder"
                        multiline
                        variant="filled"
                        color="secondary"
                        onChange={this.updateSingleAnswer.bind(this)}/>
                    </Grid>
                )
        });

        return resp;
    }

    buildMultiChoice(){
        return (
            <div>
                <Grid
                container
                direction="column"
                justify="flex-start"
                >
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Question"
                            variant="outlined"
                            onChange={this.updateQuestion.bind(this)}/>
                    </Grid>
                    <Grid item>
                        <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        >
                            {this.buildMCAnswers()}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    inputElement(){
        let elm;

        switch(this.state.questionType){
            case qTypes.Submit:
            case qTypes.Buzzer:
                elm =  <TextField
                        fullWidth
                        label="Question"
                        variant="outlined"
                        onChange={this.updateQuestion.bind(this)}/>
                break;
            case qTypes.MultiChoice:
                elm =  this.buildMultiChoice();
                break
            case qTypes.None:
            default:
        }

        return elm;
    }

    updateQuestion(evt){
        this.setState({question: evt.target.value});
    }

    render(){
        return (
            <Grid>
            <Button onClick={()=>{this.setState({showAdd:true})}}>
                + Add
            </Button>
            <Dialog
                open={this.state.showAdd}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Adding a new Question</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is not reversable, do you wish to continue?
                    </DialogContentText>
                    <Grid>
                        <Button onClick={()=>{this.setState({questionType:qTypes.Submit})}}>Submit</Button>
                        <Button onClick={()=>{this.setState({questionType:qTypes.Buzzer})}}>Buzzer</Button>
                        <Button onClick={()=>{this.setState({questionType:qTypes.MultiChoice})}}>Multiple Choice</Button>
                    </Grid>
                    {this.inputElement()}
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{this.setState({answers:[""], showAdd:false})}} color="secondary">
                    Discard
                </Button>
                <Button onClick={this.addQuestionHandler.bind(this)} color="secondary" autoFocus>
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
            </Grid>
        );
    }
}
export default AdminAddQuestion