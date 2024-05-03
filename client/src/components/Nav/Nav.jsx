import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <div id='nav'>
                <span>LIBRARY MANAGEMENT SYSTEM</span>
                <ul>
                    <li style={window.location.pathname === '/' ? { display: 'none' } : { display: 'inline-block' }}>
                        <Link to='/' onClick={this.props.update}>Home</Link>
                    </li>
                    <li style={window.location.pathname === '/check-out' ? { display: 'none' } : { display: 'inline-block' }}>
                        <Link to='/check-out' onClick={this.props.update}>Issue Book</Link>
                    </li>
                    <li style={window.location.pathname === '/return' ? { display: 'none' } : { display: 'inline-block' }}>
                        <Link to='/return' onClick={this.props.update}>Return Book</Link>
                    </li>
                    <li style={window.location.pathname === '/search' ? { display: 'none' } : { display: 'inline-block' }}>
                        <Link to='/search' onClick={this.props.update}>Search</Link>
                    </li>
                  
                    <li style={window.location.pathname === '/myprofile' ? { display: 'none' } : { display: 'inline-block' }}>
                        <Link to='/myprofile' onClick={this.props.update}>My Profile</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Nav;
