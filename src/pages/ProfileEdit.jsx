import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function ProfileEdit() {
    const [profilePic, setProfilePic] = useLocalStorage("profilePic", "");
    const [bio, setBio] = useLocalStorage("bio", "No bio yet.");
    const [preview, setPreview] = useState(profilePic);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        navigate("/profile");
    };

    return (
        <Container className="mt-3">
            <h2>Edit Profile</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <div>
                        <img src={preview || "https://via.placeholder.com/100"} alt="Profile Preview" width="100" height="100" className="rounded-circle mb-2" />
                        <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Form>
        </Container>
    );
}
