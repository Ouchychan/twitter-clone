import { Navbar, Container, Button, Card,Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";
import {getAuth} from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import { current } from "@reduxjs/toolkit";



export default function ProfilePage() {
    // const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    // const [profilePic, setProfilePic] = useLocalStorage("profilePic", "");
    // const [bio, setBio] = useLocalStorage("bio", "No bio yet.");
    // const navigate = useNavigate();

    const auth = getAuth();
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);

    if (!currentUser) {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signOut();
    };

    // useEffect(() => {
    //     if (!authToken) {
    //         navigate("/login");
    //     }
    // }, [authToken, navigate]);

    // const handleLogout = () => {
    //     setAuthToken("");
    // };

    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <i className="bi bi-twitter" style={{ fontSize: 30, color: "dodgerblue" }}></i>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="primary" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                {/* <h2>Your Profile</h2>
                <Card className="p-3">
                    <div className="d-flex align-items-center">
                        <img 
                            src={profilePic || "https://via.placeholder.com/100"} 
                            alt="Profile" 
                            className="rounded-circle me-3"
                            width="100"
                            height="100"
                        />
                        <div>
                            <p><strong>Bio:</strong> {bio}</p>
                            <Button variant="secondary" onClick={() => navigate("/edit-profile")}>Edit Profile</Button>
                        </div>
                    </div>
                </Card> */}

                <Row>
                    <ProfileSideBar handleLogout={handleLogout}/>
                    <ProfileMidBody/>
                </Row>
            </Container>
        </>
    );
}
