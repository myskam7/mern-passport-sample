import React, {Component} from 'react';
import axios from 'axios';

export default class SignUp extends Component {
  constructor() {
    super();

    this.state ={
      username: '',
      password: '',
      confirmPassword: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
      this.setState({
        [e.target.name]: e.target.value
      })
  }

  handleSubmit(e){
     console.log('sign-up(handleSubmit) username ', this.state.username);
     e.preventDefault();

     //request to server to add a new username/password
     axios.post('/user/', {
         username: this.state.username,
         password: this.state.password
     })
     .then(res => {
         console.log(res);
         if(!res.data.errmsg){
             console.log('sign-up success');

             //redirect to login page
             this.setState({
                 redirectTo: '/login'
             })
         } else { console.log('username already taken')}
     }).catch(error => {
         console.log('error signing up');
         console.log(error);
     })
  }

  render() {
      return(
        <div className="SignupForm">
        <h4>Sign up</h4>
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
                    type="submit"
                >Sign up</button>
            </div>
        </form>
    </div>
      )
  }

};

