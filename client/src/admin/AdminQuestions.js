import React from 'react';
import { Grid } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function ListItem(props) {
    if(props.list && props.list.length){
    // Correct! There is no need to specify the key here:
    return <ul key={props.list.toString()}>{props.list.map((l)=>{return <li>{l}</li>})}</ul>;
    }else{
        return null;
    }
}

class ConfirmDelete extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            close: false
        };

        console.log("show delete: "+this.props.showDelete+"\topen: "+this.state.open);
    }

    render(){
        
        return (
            <Dialog
            open={this.props.showDelete && !this.state.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"You are about to delete a question"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This action is not reversable, do you wish to continue?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.props.handleDeleteClose.bind(this, false, this.props.delId)} color="secondary">
                Disagree
            </Button>
            <Button onClick={this.props.handleDeleteClose.bind(this, true, this.props.delId)} color="secondary" autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
        );
    }
}

class AdminQuestions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
            showDelete: false,
            delId: 0
        };
    }

    confirmDelete(id, evt){
        this.setState({showDelete:true, delId: id});
    }

    sendQuestion(question){
        this.props.setQuestion(question);
    }


    handleDeleteClose(isDelete, id){
        console.log((isDelete?"Deleting":"Not deleting") +" id: "+id);
        this.setState({showDelete: false});
        if(isDelete)
            this.props.removeQuesiton({id:id});
    }


    render() {

        const questionsElm = this.props.questions.length && this.props.questions.map((question) =>
            // Correct! Key should be specified inside the array.
            
            <Accordion>
                <AccordionSummary
                //expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography >{question.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    <Grid item>Question Type: {question.question_type}</Grid>
                    <Grid item><ListItem list={question.answers} /></Grid>
                    </Grid>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Edit</Button>
                    <Button size="small" color="secondary" onClick={this.sendQuestion.bind(this, question)}>
                        Use
                    </Button>
                    <Button size="small" color="secondary" onClick={this.confirmDelete.bind(this, question.id)} >
                        Delete
                    </Button>
                </AccordionActions>
            </Accordion>
        );

        return(
            <Grid>
            {questionsElm}
            <ConfirmDelete showDelete={this.state.showDelete} handleDeleteClose={this.handleDeleteClose.bind(this)} delId={this.state.delId} />
            </Grid>
        );
    }
}

export default AdminQuestions;