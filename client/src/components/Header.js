import React, { Component } from "react";
import socketIOClient from "socket.io-client";
// The Header creates links that can be used to navigate
// between routes.
var socket = {};
var wrapperStyle = {
  padding: "5px"
}
class Header extends Component {
/* Creating a Socket client and exporting it at the end to be used across the Place Order, Kitchen, etc components*/
  constructor() {
    super();
    let id = new Date().getTime();
    this.state = {
      endpoint: 'http://bentomanor.duckdns.org:3003/'
    };
    if(!socket.listen){
      let webSocket = socketIOClient(this.state.endpoint);
      socket.submitAnswer = function(answer, elapse){
        webSocket.emit("submit_answer", {user:id, answer:answer, elapse:elapse});
      }
      socket.connect = function(user){
        user.id = id;
        webSocket.emit("addUser", user);
      }
      socket.disconnect = function(user){
        user.id = id;
        webSocket.emit("disconnect", user);
      }
      socket.nextQuestion = function(question){
        webSocket.emit("get_question", question);
      }
      socket.listen = function(channel, func){
        webSocket.on(channel, func);
      }
      socket.close = function(channel, func){
        webSocket.off(channel, func);
      }
    }
    
    
  }
render() {
    return (
      <header style={wrapperStyle}>
        <h1>
            Welcome to the Bento Manor Trivia Game
          </h1>
      </header>
    );
  }
}
export { Header, socket };