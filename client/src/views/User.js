import React from 'react';
import TextInputButton from '../components/TextInputButton'

class User extends React.Component{
    handleUserClick(user) {
        if(!user) return;
        console.log(user);
        this.props.newUserHandler(user);
    }
  
    render() {
      return (
        <div>
            <TextInputButton clkHandler={this.handleUserClick.bind(this)} custBtnText='Play' defaultInput='Enter your name' />
        </div>
      );
    }
}

export default User;