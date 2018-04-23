/**
 * Login page, after user has Signed Up they will redirected to Login page, or also 
   there is a link in navigation to take user to Login page.
* Form will be populated to fillout users Username/Password followed by 
  'Login' submit button that takes user to their homepage.
* On users homepage there is an option to logout
 */

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


export default class Login extends Component{
    constructor(){
        super(); 

        this.state ={   //Setting current state
            username: '',
            password:'',
            redirectTo: null

        };

        // Its required to bind these below in order to have 'this' work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // validateForm() {
    //     return this.state.email.length > 0 && this.state.password.length > 0;

    // }

    
    handleChange(event){   //responsible for handling changes made in the form regarding if strings are added
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){    //reponsible for handling the click on 'Submit' button event 

        event.preventDefault(); 
        console.log('handleSubmit');
    



    axios.post('/user/login', {    //when user submits, client will request server to see if credentials match
        username: this.state.username,
        password: this.state.password
    })
    .then(response => { //if status is OK the state will be updated and user will be redirected to homepage
        console.log('login response', response);
        if(response.status === 200){
            // update App.js state
            this.props.updateUser({
                loggedIn: true, 
                username: response.data.username
            })
            // update the state to redirect to home as a logged in user 
            this.setState({
                redirectTo: '/'
            })
            
        }
    }).catch(error => { //catch any errors 
        console.log('login error: ', error);
    });

    }


    render(){    
         if(this.state.redirectTo){
             return <Redirect to={{pathname: this.state.redirectTo}} />
         } else {
             return (//here is what will be displayed to the user
                <div>
                    <h4>Login</h4>
                    <form className="form-horizontal">
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
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                               
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                        </div>
                    </form>
                </div>
             )
         }
       
    }
}