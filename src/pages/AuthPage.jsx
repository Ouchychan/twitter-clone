import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import {Button, Col, Image, Row, Modal, Form, FormControl} from "react-bootstrap";
import {useContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

// import axios from "axios";
// import useLocalStorage from "use-local-storage";
// import { current } from "@reduxjs/toolkit";

export default function AuthPage() {
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp")
    const handleShowLogin = () => setModalShow("Login")
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const loginImage = "https://sig1.co/img-twitter-1";
    // const url = "https://04158105-ba5b-456c-b2b8-8b44449fbfd7-00-3aws21y02db6k.sisko.replit.dev";
    const auth = getAuth();
    const {currentUser} = useContext(AuthContext);
   
    useEffect(() => {
        if(currentUser) navigate("/profile"); 
    }, [currentUser, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth,username,password);
            // if (res.data && res.data.auth === true && res.data.token) {
            //     setAuthToken(res.data.token);
            //     console.log("Login was successful, token saved");
            // }
        } catch (error) {
            setError('Invalid username and password!');
            console.error(error);
        }
    };
    
    const handleClose = () => setModalShow(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await createUserWithEmailAndPassword(auth,username,password);
            console.log(res.user);
            // const res = await axios.post(`${url}/signup`, {username, password});
            // console.log(res.data);
            // setModalShow(null)
        } catch (error) {
            setError('Username taken already');
            console.error(error);
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async(e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth,provider);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className="p-4">
                <i className="bi bi-twitter" style={{fontSize:50, color: "dodgerblue"}}></i>

                <p className="mt-5" style={{fontSize: 64}}> Happening Now </p>
                <h2 className="my-5" style={{fontSize: 31}}> Join Twitter Today.  </h2>
            
                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-facebook"></i> Sign up with Facebook
                    </Button>
                <p style={{textAlign:"center"}}>or</p>

                <Button className="rounded-pill" onClick={handleShowSignUp}>
                    Create an account
                </Button>

                <p style={{fontSize: "12px"}}>
                    By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use
                </p>
            
                <p className="mt-5" style={{fontWeight:"bold"}}>
                    Already have an account?
                </p>
                <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>
                    Sign In
                </Button>
                </Col>
                
                <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{fontWeight:"bold"}}>
                            {modalShow === "SignUp" 
                            ? "Create your account" : 
                            "Log in to your account"}
                        </h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                            <Form.Group className='mb-3' controlId="formBasicEmail">
                                <FormControl 
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="email" 
                                    placeholder="Enter username"
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="formBasicPassword">
                                <FormControl 
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" 
                                    placeholder="Password"
                                />
                                {error && <div className="text-danger">{error}</div>}
                            </Form.Group>
                            
                            <p style={{fontSize:"12px"}}>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                        </p>

                        <Button className="rounded-pill" type='submit'>
                            {modalShow === "SignUp" ? "Sign up" : "Log in"}
                        </Button>
                    </Form>
                        
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    )
}