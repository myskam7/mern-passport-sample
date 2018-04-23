import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom'; 
import {Redirect, Route, Link} from 'react-router-dom';
import axios from 'axios';

import '../App.css'; 


export default class Nav extends Component {
    constructor(){
        super()


        this.logout = this.logout.bind(this)
    }
   
    logout(e) {
        e.preventDefault();
        console.log('logged out');
        axios.post('/user/logout').then(res => {
            console.log(res.data);
            if(res.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error =>{ console.log('logout error')
    });
    
    }

    render() {
        const loggedIn = this.props.loggedIn; 
        console.log('nav props: ');
        console.log(this.props);
        return(
            <div>

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="text-secondary">login</span>
				</Link>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary">sign up</span>
				</Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                    <div id="top-filler"></div>

                        <h1 className="App-title">MERN Passport</h1>
                    </div>
                </header>
            </div>

        );
    }
}
