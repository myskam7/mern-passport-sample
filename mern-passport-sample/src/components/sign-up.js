/**
 * Sign-Up page, on this page there will be a sign up form populated to fill out Username & Password (Both are required).
 * When the user presses on 'Sign Up' button, the client will request the server to add new information to the database 
   and generate unique id for the user.
 * If successful user will be redirected to the Login page, if there is an issue like Username already exists, form not 
   not completed and error message will be populated.
 */

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export default class SignUp extends Component {
  constructor() {
    super();

    this.state ={  
          //Setting current state
      username: '',
      password: '',
      passwordMatch: '',
      Errors: null,
      LoginPage: null,
      RegSuccess: null
    }


    // Its required to bind these below in order to have 'this' work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.passwordMatch = this.passwordMatch.bind(this);
    
  }
   
//responsible for handling changes made in the form and will update state
  handleChange(e){
      this.setState({
        [e.target.name]: e.target.value,
        
      })
  }
//reponsible for handling the click on 'Submit' button event 
  handleSubmit(e){
    e.preventDefault()

     console.log('sign-up(handleSubmit) username ', this.state.username);
     if(!(this.state.password === this.state.passwordMatch)){
          this.setState({
             Errors: 'Password Does Not Match'
         })
         return console.log('passwords do not match');

     } else {

     //request to server to add a new username/password to database
     axios.post('/user/', {
         
         username: this.state.username,
         password: this.state.password
     })
     .then(res => { //after username/password is requested to be added it returns response
         console.log(res)
         if(res.data._id){
              //update the state and redirect to login page
            this.setState({
                RegSuccess: 'Registration successful',
                LoginPage: '/login'
             })
             alert(this.state.RegSuccess)
                 
         } else { 

             console.log('username already taken')}
     }).catch(error => {
         console.log('error signing up');
         console.log(error);
     })
  }
}

  render() {
   
        
            if(this.state.LoginPage){
                return( <Redirect to={this.state.LoginPage}></Redirect>)
                
            } else {
            
            return( //here is what will be displayed to the user
        <div className="SignupForm">
        <h4>Sign up</h4>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="username">Username</label>
                </div>
                <div className="col-3 col-mr-auto">
                    <input className="form-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    
                </div>
            </div>
            <div className="form-group">
                <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="password">Password: </label>
                </div>
                <div className="col-3 col-mr-auto">
                    <input className="form-input"
                        placeholder="password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    
                </div>
                
            </div>
            
            <div className="form-group">
                <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="passwordMatch">Re-Enter Password: </label>
                </div>
                <div className="col-3 col-mr-auto">
                    <input className="form-input"
                        placeholder="Re-Enter Password"
                        type="password"
                        name="passwordMatch"
                        value={this.state.passwordMatch}
                        onChange={this.handleChange}
                    />
                    <span style={{ color: 'red' }}>{this.state.Errors}</span>
                </div>
            </div>
            <div className="form-group ">
                <div className="col-7"></div>
                <button
                    className="btn btn-primary col-1 col-mr-auto"
                    onClick={this.handleSubmit}
                    type="submit"
                >Submit</button>

            </div>
        </form>
    </div>
      )
  }

};
};

