import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import { LoginPage } from './loginpage';
import { SearchPage } from './searchpage';
import { OffencesPage } from './offencesdata';

export function NavigationBar() {
    return (
      <div className="Navbar">
                <Navbar sticky="top" variant >
                    <Col xs={{span: 1}}>
                    <Navbar.Brand>{<h1>CrimeAPI</h1>}</Navbar.Brand>
                    </Col>
                    <Col xs={{span: 1, offset: 1}}>
                        <Button variant="outline-secondary" size="lg" onClick={() => {
                            ReactDOM.render(<LoginPage />, document.getElementById("content"));
                    }}>Login</Button>
                    </Col>
                    <Col xs={{span: 1}}>
                    <Button variant="outline-secondary" size="lg" onClick={() => {
                            ReactDOM.render(<SearchPage />, document.getElementById("content"));
                        }}>Search</Button>
                </Col>
                <Col xs={{ span: 1 }}>
                    <Button variant="outline-secondary" size="lg" onClick={() => {
                        ReactDOM.render(<OffencesPage />, document.getElementById("content"));
                    }}>Offences</Button>
                </Col>
                    <Col xs={{offset: 6}}>
                    <Button variant="outline-info" size="lg" onClick={() => {
                        LogoutButton()
                    }}>Logout</Button>
                </Col>
                </Navbar>
      </div>
    );
  }

function LogoutButton() {
    localStorage.clear();
    console.log("Logged out!")
}

