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
    }).catch(error => {
        console.log('login error: ', error);
    });

    }


    render(){
         if(this.state.redirectTo){
             return <Redirect to={{pathname: this.state.redirectTo}} />
         } else {
             return (
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