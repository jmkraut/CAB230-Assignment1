import './App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ReactDOM from 'react-dom';
import {
    UsernameErrorAlert,
    PasswordErrorAlert, 
    SuccessfulLogin, 
    SuccessfulRegister,
    FailedRegisterUserExists,
    FailedNetwork,
    FailedLoginUserDoesntExist
} from './alerts'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const hostUrl = 'http://localhost:3000'
const hackhouseUrl = 'https://cab230.hackhouse.sh'

export function LoginPage() {
    const [usernameLogin, setUsernameLogin] = useState("")
    const [password, setPassword] = useState("")
    var emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    
    return (
        
        <div className="LoginPage">

            <>
            <style type="text/css">
            {`
            .btn-flat{
                background-color: #1D2731;
                color: white;
            }
            `}
            </style>
            </>

            <Container>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        placeholder="name@example.com"
                                        required
                                        value={usernameLogin}
                                        onChange={(event) => {
                                                setUsernameLogin(event.target.value)
                                        }}
                                    />
                                </Form.Group>
                                            
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="password"
                                    required
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                    }}
                                />
                            </Form.Group>
                        </Form>
                            
                        <Button active variant="flat" block
                            onClick={() => {
                            if (!emailRegex.test(usernameLogin)) {
                                ReactDOM.render(
                                    <UsernameErrorAlert />,
                                    document.getElementById("notification")
                                )
                            }
                            if (emailRegex.test(usernameLogin) && password === "") {
                                ReactDOM.render(
                                    <PasswordErrorAlert />,
                                    document.getElementById("notification")
                                )
                            }
                            if (emailRegex.test(usernameLogin) && password !== "") {
                                LoginButton(usernameLogin, password)
                                ReactDOM.render(<SuccessfulLogin />, document.getElementById("notification"))
                            }
                            }}>Login</Button>
                        </Col>
                </Row> 
                <br/>
                <Row>
                    <Col md={{span: 6, offset: 3}}>    
                        <Button active variant="flat" block 
                            onClick={() => {
                                if (!emailRegex.test(usernameLogin)) {
                                    ReactDOM.render(
                                        <UsernameErrorAlert />,
                                        document.getElementById("notification")
                                    )
                                }
                                if (emailRegex.test(usernameLogin) && password === "") {
                                    ReactDOM.render(
                                        <PasswordErrorAlert />,
                                        document.getElementById("notification")
                                    )
                                }
                                if (emailRegex.test(usernameLogin) && password !== "") {
                                    RegisterButton(usernameLogin, password)
                                }
                            }}>Register</Button>
                        <p>*Note: You only need to login to use the search function.</p>
                    </Col>    
                </Row>    
            </Container>
        </div>
    )
}

function RegisterButton(username, password) {
    fetch(hackhouseUrl + "/register", {
        method: "POST",
        body: 'email=' + username + '&password=' + password,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(function (response) {
            if (response.ok) {
                ReactDOM.render(<SuccessfulRegister />, document.getElementById("notification"))
                return response.json();
            }
            if (response.status === 400) {
                ReactDOM.render(<FailedRegisterUserExists />, document.getElementById("notification"))
                throw new Error("User already exists!")
            }
            ReactDOM.render(<FailedNetwork />, document.getElementById("notification"))
            throw new Error("Network response was not ok.")
        })
        .then(function (result) {
            console.log(JSON.stringify(result));
        })
        .catch(function (error) {
            console.log("There has been a problem with your fetch operation: ", error.message);
        });
}

function LoginButton(username, password) {
    fetch(hackhouseUrl + "/login", {
        method: "POST",
        body: 'email=' + username + '&password=' + password,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(function (response) {
            if (response.ok) {
                ReactDOM.render(<SuccessfulLogin />, document.getElementById("notification"))
                return response.json();
            }
            if (response.status === 401) {
                ReactDOM.render(<FailedLoginUserDoesntExist />, document.getElementById("notification"))
                throw new Error("Your username or password are incorrect!\n Have you registered an account?")
            }
            ReactDOM.render(<FailedNetwork />, document.getElementById("notification"))
            throw new Error("Network response was not ok.");
        })
        .then(function (result) {
            localStorage.setItem('accesspass', result.token);
            console.log(JSON.stringify(result))
            console.log("Great success!")
        })
        .catch(function (error) {
            console.log(error.message);
        });
}