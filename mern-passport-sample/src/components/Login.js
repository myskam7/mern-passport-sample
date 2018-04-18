import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


export default class Login extends Component{
    constructor(){
        super(); 

        this.state ={
            email: "",
            password:"",
            redirectTo: null

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // validateForm() {
    //     return this.state.email.length > 0 && this.state.password.length > 0;

    // }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault(); 
        console.log('handleSubmit');
    

    axios.post('/user/login', {
        username: this.state.username,
        password: this.state.password
    })
    .then(res => {
        console.log('login response', res);
        if(res.status === 200){
            // update App.js state
            this.props.updateUser({
                loggedIn: true, 
                username: res.data.username
            })
            // update the state to redirect to home
            this.setState({
                redirectTo: '/'
            })
            
        }
   