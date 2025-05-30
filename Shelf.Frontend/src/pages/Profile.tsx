import { useEffect } from "react";
import LogoutButton from "../components/LogoutButton"
import { useNavigate } from "react-router-dom";

const Profile = ({setAuth, auth}: {setAuth: Function, auth: boolean}) => {
    const navigate = useNavigate();
    // If I end up using this pattern a bunch, make a ProtectedRoute component to wrap my routes
    useEffect(() => {
        if (!auth) {
            navigate('/login-register');
        }
    }, [auth]);

    return (
        <>
            <div>
                <h1>Profile</h1>
                <LogoutButton setAuth={setAuth}/>
            </div>
        </>
    )
}

export default Profile;