import React from 'react';
import {socket} from './Header'


function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li>{props.user.userName}</li>;
}

class CurrentUsers extends React.Component{
    constructor(props){
        super(props);
        this.state = {users:[]};

    }

    componentDidMount() {
        socket.listen("getCurUsers", this.setCurUsers.bind(this));
    }

    componentWillUnmount() {
        socket.close("getCurUsers");
    }

    setCurUsers = curUsers => {
        console.log(curUsers);
        this.setState({ users: curUsers });
    };

    render(){
        const listItems = this.state.users.map((user) =>
            // Correct! Key should be specified inside the array.
            <ListItem key={user.userName.toString()} user={user} />
        );

        return(
            <ul>{listItems}</ul>
        );
    }
}

export default CurrentUsers;