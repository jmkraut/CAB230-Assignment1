import React, { useState } from 'react';
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

export function UsernameErrorAlert() {
    const [showUsernameError, setShowUsernameError] = useState(true)

    return (
        <div>
            <Col xs={{span: 4, offset: 8}}>
                <Alert dismissible variant="danger" show={showUsernameError}
                    onClick={() => {
                        setShowUsernameError(false)
                    }}
                    onClose={() => {
                        setShowUsernameError(true)
                }}>
                    <Alert.Heading>Username Error!</Alert.Heading>
                    <p>
                        Your email must match the format: <br />
                        something@something.com <br />
                        Please try again!
                    </p>
                </Alert>
            </Col>
        </div>
    )
}

export function PasswordErrorAlert() {
    const [showPasswordError, setShowPasswordError] = useState(true)

    return (
        <div>
            <Alert dismissible variant="danger" show={showPasswordError}
                onClose={() => {
                setShowPasswordError(true)
                }}
                onClick={() => {
                setShowPasswordError(false)
                }}
            >
                <Alert.Heading>Password Error!</Alert.Heading>
                <p></p>
                <p>
                    A password is required to login! <br />
                    It cannot be left blank!
                </p>
            </Alert>
        </div>
    )
}

export function SuccessfulLogin() {
    const [show, setShow] = useState(true)

    return (
        <div>
            <Alert dismissible variant="success" show={show} onClick={() => {
                setShow(false)
            }}>
            <p>Successfully logged in!</p>
            </Alert>
        </div>
    )
}

export function SuccessfulRegister() {
    const [show, setShow] = useState(true)

    return (
        <div>
            <Alert dismissible variant="success" show={show} onClick={() => {
                setShow(false)
            }}>
                <p>Successfully  registered!</p>
            </Alert>
        </div>
    )
}

export function FailedRegisterUserExists() {
    const [show, setShow] = useState(true)

    return (
        <div>
            <Alert dismissible variant="danger" show={show} onClick={() => {
                setShow(false)
            }}>
                <p>User already exists!</p>
            </Alert>
        </div>
    )
}

export function FailedLoginUserDoesntExist() {
    const [show, setShow] = useState(true)

    return (
        <div>
            <Alert dismissible variant="danger" show={show} onClick={() => {
                setShow(false)
            }}>
                <p>Login failed! User wasn't found... Are you sure you've registered?</p>
            </Alert>
        </div>
    )
}

export function FailedNetwork() {
    const [show, setShow] = useState(true)

    return (
        <div>
            <Alert dismissible variant="danger" show={show} onClick={() => {
                setShow(false)
            }}>
                <p>There's an issue with the network... Sorry!</p>
            </Alert>
        </div>
    )
}
  