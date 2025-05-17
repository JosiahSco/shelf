import { useNavigate } from "react-router-dom";

const LogoutButton = ({setAuth}: {setAuth: Function}) => { 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuth(false);
        navigate('/');
    }

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;